import { getProblemByClerkIdAndStatus } from "@/models/problems.model";
import { getAccountbyUsername, updateFolllowByClerkIdAndTargetClerkId,updateAccountDetail } from "@/models/accounts.model";
import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { getSumPointByProblemId } from "@/models/testcases.model";
import {getChallengeByClerkId} from "@/models/challenges.model";

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

      const myfollowed = account.followers?.includes(auth.userId);

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

      const challenges = await getChallengeByClerkId(account.clerkId);
      const filterChallengeEndTime = challenges.filter((challenge) => challenge.endTime > Date.now());
      const filterChallenge = filterChallengeEndTime.map((challenge) => {
        return {
          _id: challenge._id.toString(),
          avatar: account.avatar,
          username: account.username,
          title: challenge.title,
          thumbnail: challenge.thumbnail,
          countPlayer: challenge.player?.length || 0,
          createdAt: challenge.createdAt,
          updatedAt: challenge.updatedAt,
        };
      })


      return {
        status: 200,
        account: filterAccount,
        problem: filterProblem,
        challenge: filterChallenge,
        myfollowed: myfollowed,
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

  .put("/follow", async ({ body, auth, error }) => {
    try {

      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { targetClerkId } = body;

      if (auth.userId == targetClerkId) {
        return error(400, "Can't follow yourself");
      }

      const account = await updateFolllowByClerkIdAndTargetClerkId(auth.userId, targetClerkId);

      if (!account) {
        return error(404, "Account Not Found");
      }

      return {
        status: 200,
        message: "Follow Success",
      };



    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }

  },
    {
      body: t.Object({
        targetClerkId: t.String()
      }),
    }
  )

  .put("/accountDetail", async ({ body, auth, error }) => {
    try {

      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { detail } = body;

      const account = await updateAccountDetail(auth.userId, detail);

      if (!account) {
        return error(404, "Account Not Found");
      }

      return {
        status: 200,
        message: "Update Detail Success",
      };



    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }

  },
    {
      body: t.Object({
        detail: t.String()
      }),
    }
  )




