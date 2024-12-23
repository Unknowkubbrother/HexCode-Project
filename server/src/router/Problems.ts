import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { createProblem,updateProblem,getProblemById,ProblemModel} from "@/models/problems";
import { SubmissionModel } from "@/models/submissions";
import { createProblemTestcase , getProblemByIdCaseAndProblemId , getSumPointByProblemId} from "@/models/problems_testcase";
import { toArray } from "lodash";

/**
 * @author ExamUser clerkId
 */
const TestuserId = "user_2qRd8EVDei0OGYmRQ6DAI37Vf4L";

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

        const { title, description, difficulty, type, filedocs, hint } = body;

        const problemCreated = await createProblem({
          clerkId: auth.userId,
          title: title,
          description: description,
          difficulty: Number(difficulty),
          type: toArray(JSON.parse(type)),
          hint: toArray(JSON.parse(hint)),
        });

        if (!problemCreated) {
          return error(404, "create problem error");
        }

        const id = problemCreated._id.toString();

        const pathName = `./uploads/problems/${id}/${filedocs.name}`;

        const FileCreated = await Bun.write(pathName, filedocs);

        if (!FileCreated) {
          return error(404, "upload file error");
        }

        const problemUpeateFileDocs = await updateProblem(id, {
          filedocs: pathName,
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
        filedocs: t.File(),
        hint: t.String(),
      }),
    }
  )

  /**
   * @description add test case to problem
   */
  .post("/add-test-case",async ({ body, auth , error }) => {
      try {
        if (!auth?.userId) {
          return error(401, "Unauthorized");
        }

        const { problemId, id, input, output, point } = body;

        const problem = await getProblemById(problemId);

        if (!problem) {
          return error(404, "problem not found");
        }

        if (problem.clerkId !== auth.userId) {
          return error(401, "Unauthorized");
        }

        const existCaseId = await getProblemByIdCaseAndProblemId(Number(id), problemId);

        if (existCaseId) {
          return error(409, "problem testcase id exist");
        }

        const result = await createProblemTestcase({
          problemId: problemId,
          id: Number(id),
          input: await input.text(),
          output: await output.text(),
          point: Number(point),
        });

        if (!result) {
          return error(404, "create problem testcase error");
        }

        return {
          result: result,
          status: 200,
          message: "create problem testcase success",
        };
      } catch (e) {
        console.log(e);
        return error(500, "Internal Server Error");
      }
    },
    {
      body: t.Object({
        problemId: t.String(),
        id: t.String(),
        input: t.File(),
        output: t.File(),
        point: t.String(),
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

        const submissions = await SubmissionModel.find({ clerkId: auth.userId });

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
              point: point[0]?.total || 0,
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
