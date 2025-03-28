import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { getProblemById } from "@/models/problems.model";
import { createProblemTestcase, getProblemByIdCaseAndProblemId, updateProblemTestcase, deleteProblemTestcase, getProblemByIdAndProblemId } from "@/models/testcases.model";

/**
 * @description TestCaseRoute
 */
export const TestCaseRoute = new Elysia({ prefix: "/testcase" })
  .use(clerkPlugin())

  /**
   * @description add test case to problem
   */
  .post("/add", async ({ body, auth, error }) => {
    try {
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { problemId, id, input, output, points } = body;

      const problem = await getProblemById(problemId);

      if (!problem) {
        return error(404, "problem not found");
      }

      if (problem.clerkId !== auth?.userId) {
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
        points: Number(points),
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
        points: t.String(),
      }),
    }
  )

  .post("/delete", async ({ body, auth, error }) => {
    try {
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }
      const { problemId, _id } = body;
      const problem = await getProblemById(problemId);
      if (!problem) {
        return error(404, "problem not found");
      }
      if (problem.clerkId !== auth?.userId) {
        return error(401, "Unauthorized");
      }
      const deleted = await deleteProblemTestcase(_id, problemId);

      if (!deleted) {
        return error(404, "problem testcase not found");
      }

      return {
        status: 200,
        message: "delete problem testcase success",
      };
    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
  }
    ,
    {
      body: t.Object({
        _id: t.String(),
        problemId: t.String(),
      }),
    }
  )

  .post("/update", async ({ body, auth, error }) => {
    try {
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { _id, problemId, id, input, output, points } = body;

      const problem = await getProblemById(problemId);

      if (!problem) {
        return error(404, "problem not found");
      }

      if (problem.clerkId !== auth?.userId) {
        return error(401, "Unauthorized");
      }

      if (!_id) {
        const result = await createProblemTestcase({
          problemId: problemId,
          id: Number(id),
          input: String(input),
          output: String(output),
          points: Number(points),
        });

        if (!result) {
          return error(404, "create problem testcase error");
        }
      } else {
        const existCaseId = await getProblemByIdAndProblemId(_id, problemId);

        if (!existCaseId) {
          return error(404, "problem testcase not found");
        }

        const result = await updateProblemTestcase(
          _id,
          problemId,
          {
            id: Number(id),
            problemId: problemId,
            input: String(input),
            output: String(output),
            points: Number(points),
          }
        );

        if (!result) {
          return error(404, "update problem testcase error");
        }
      }

      return {
        status: 200,
        message: "update problem testcase success",
      };
    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
  },
    {
      body: t.Object({
        _id: t.Optional(t.String()),
        problemId: t.String(),
        id: t.String(),
        input: t.String(),
        output: t.String(),
        points: t.String(),
      }),
    }
  );