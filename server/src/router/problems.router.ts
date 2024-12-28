import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { createProblem,updateProblem,getProblemById,ProblemModel} from "@/models/problems.model";
import { getSubmitbyClerkId } from "@/models/submissions.model";
import { getSumPointByProblemId} from "@/models/testcases.model";
import { toArray } from "lodash";

/**
 * @description ProblemRoute
 */
export const ProblemRoute = new Elysia({ prefix: "/problem" })
  .use(clerkPlugin())

  /**
   * @description create problem
   */
  .post("/create", async ({ body, auth, error }) => {
      try {

        if (!auth?.userId) {
          return error(401, "Unauthorized");
        }

        const { title, description, difficulty, type, docs, hint } = body;


        if (docs.type !== "application/pdf") {
          return error(400, "docs must be a pdf file");
        }

        const problemCreated = await createProblem({
          clerkId: auth?.userId,
          title: title,
          description: description,
          difficulty: Number(difficulty),
          type: toArray(JSON.parse(type)),
          hint: toArray(JSON.parse(hint))
        });

        if (!problemCreated) {
          return error(404, "create problem error");
        }

        const id = problemCreated._id.toString();

        const pathName = `./uploads/problems/${id}.pdf`;

        const FileCreated = await Bun.write(pathName, docs);

        if (!FileCreated) {
          return error(404, "upload file error");
        }

        const problemUpeateFileDocs = await updateProblem(id, {
          docs: pathName,
        });

        if (!problemUpeateFileDocs) {
          return error(404, "update file error");
        }

        const resultProblem = await getProblemById(id);

        if (!resultProblem) {
          return error(404, "get problem error");
        }

        return {
          result: resultProblem,
          status: 200,
          message: "create problem success",
        };
      } catch (e) {
        console.log(e);
        return error(500, "Internal Server Error");
      }
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
        difficulty: t.String(),
        type: t.String(),
        docs: t.File(),
        hint: t.String(),
      }),
    }
  )

  /**
   * @description get problems and filter problems
   */
  .get("/get", async ({ query, clerk, auth, error }) => {
      try {
        if (!auth?.userId) {
          return error(401, "Unauthorized");
        }

        const sizepage = query?.pagesize || 10;
        const page = query?.page || 1;
        const difficulty = query.difficulty ? JSON.parse(query.difficulty) : [];
        const type = query.type ? JSON.parse(query.type) : [];

        const filter = {
          ...(difficulty.length && { difficulty: { $in: difficulty } }),
          ...(type.length && { type: { $in: type } }),
        };

        const submissions = await getSubmitbyClerkId(auth.userId);

        if (query.solve && query.unsolve) {
          const solvedProblemIds = submissions
            .filter(sub => sub.success)
            .map(sub => sub.problemId);
          const unsolvedProblemIds = submissions
            .filter(sub => !sub.success)
            .map(sub => sub.problemId);
          filter['_id'] = { $in: [...solvedProblemIds, ...unsolvedProblemIds] };
        } else {
          if (query.solve) {
            const solvedProblemIds = submissions
              .filter(sub => sub.success)
              .map(sub => sub.problemId);
            filter['_id'] = { $in: solvedProblemIds };
          }

          if (query.unsolve) {
            const unsolvedProblemIds = submissions
              .filter(sub => !sub.success)
              .map(sub => sub.problemId);
            filter['_id'] = { $in: unsolvedProblemIds };
          }
        }

        const problems = await ProblemModel.find(filter)
          .skip((page - 1) * sizepage)
          .limit(sizepage);

        const totalCounts = await ProblemModel.countDocuments(filter);

        const resultProblem = await Promise.all(
          problems.map(async (problem) => {
            const userbyid = await clerk.users.getUser(problem.clerkId);
            const point = await getSumPointByProblemId(problem._id.toString());

            return {
              id: problem._id.toString(),
              title: problem.title,
              difficulty: problem.difficulty,
              submissions: problem.submissions,
              accepted: problem.accepted,
              successRate: (problem.accepted / problem.submissions) * 100 || 0,
              type: problem.type,
              author: {
                name: userbyid.username,
                avatar: userbyid.imageUrl,
              },
              points: point[0]?.total || 0,
            };
          })
        );

        return {
          result: resultProblem,
          totalCounts,
        };
      } catch (e) {
        console.log(e);
        return error(500, "Internal Server Error");
      }
    },
    {
      query: t.Optional(
        t.Object({
          page: t.Optional(t.Number()),
          pagesize: t.Optional(t.Number()),
          solve: t.Optional(t.Boolean()),
          unsolve: t.Optional(t.Boolean()),
          type: t.Optional(t.String()),
          difficulty: t.Optional(t.String()),
        })
      ),
    }
  );
