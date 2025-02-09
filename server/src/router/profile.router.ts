import { getProblemByClerkIdAndStatus } from "@/models/problems.model";
import { getAccountbyUsername } from "@/models/accounts.model";
import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { getSumPointByProblemId } from "@/models/testcases.model";

export const ProfileRoute = new Elysia({ 'prefix': '/profile' })
  .use(clerkPlugin())

  .get("get/:username", async ({ params, auth, error }) => {
    try {

      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { username } = params;

      const account = await getAccountbyUsername(username);

      if (!account) {
        return error(404, "Account Not Found");
      }

      const filterAccount = {
        clerkId: account.clerkId,
        username: account.username,
        email: account.email,
        role: account.role,
        avatar: account.avatar,
        detail: account.detail,
        status: account.status,
        followers: account.followers?.length,
        following: account.following?.length,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
      }

      const problem = await getProblemByClerkIdAndStatus(account.clerkId, "active");

      const filterProblem = await Promise.all(
        problem.map(async (problem) => {
          const point = await getSumPointByProblemId(problem._id.toString());

          return {
            id: problem._id.toString(),
            title: problem.title,
            difficulty: problem.difficulty,
            submissions: problem.submissions,
            accepted: problem.accepted,
            successRate: (problem.accepted / problem.submissions) * 100 || 0,
            viewer: problem.viewer,
            points: point[0]?.total || 0,
          };
        })
      );


      return {
        status: 200,
        account: filterAccount,
        problem: filterProblem,
        itself: account.clerkId == auth.userId,
      };

    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
  }, {
    params: t.Object({
      username: t.String(),
    }),
  })

