import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { createProblem, ProblemModel } from "@/models/problems";
import { round } from "mathjs";

export const ProblemRoute = new Elysia({ prefix: "/problem" })
  .use(clerkPlugin())
  .post(
    "/add",
    async ({ body, clerk, auth, error }) => {
      try {
        if (!auth?.userId) {
          return error(401, "Unauthorized");
        }

        const user = await clerk.users.getUser(auth.userId);

        const value = await createProblem({
          title: body.title,
          description: body.description,
          difficulty: body.difficulty,
          type: body.type,
          clerkId: user.id,
          point: body.point,
          testcase: body.testcase,
          filedocs: body.filedocs,
          hint: body.hint,
        });

        if (!value) {
          return error(404, "Error");
        }
        return { msg: value };
      } catch (e) {
        return error(500, "Internal Server Error");
      }
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
        difficulty: t.Number(),
        type: t.Array(t.Number()),
        point: t.Number(),
        testcase: t.Array(
          t.Object({
            input: t.String(),
            output: t.String(),
          })
        ),
        filedocs: t.Optional(t.String()),
        hint: t.Optional(t.Array(t.String())),
      }),
    }
  )

  .get(
    "/get",
    async ({ query, clerk, auth, error }) => {
      try {
        
        if (!auth?.userId){
           return error(401, 'Unauthorized')
        }

        const user = await clerk.users.getUser(auth.userId)
        const sizepage = 10;

        // let query: any = {};
        // if (query.difficulty) {
        //   query.difficulty = { $in: query.difficulty };
        // }
        // if (query.type) {
        //   query.type = { $in: query.type };
        // }
        const problems = await ProblemModel.find(query);
        const numberpage: number = round(problems.length / sizepage);
        const resultProblem = problems.map((value,idx) => {
            return {
              id: value._id.toString(),
              title: value.title,
              difficulty: value.difficulty,
              submissions: value.submissions,
              accepted: value.accepted,
              successRate: (value.accepted / value.submissions) * 100 || 0,
              author: {
                name: `test${idx}`,
                avatar: "https://github.com/shadcn.png"
              },
              point: value.point,
            };
          })
        //   .slice(
        //     query.page ? sizepage * (query.page - 1) : 0,
        //     query.page ? sizepage * query.page : sizepage
        //   );
        return {
          result: resultProblem,
          numberpage: {
            // page: query.page ? query.page : 1,
            all: numberpage,
          },
        };
      } catch (e) {
        return error(500, "Internal Server Error");
      }
    },
    {
      query: t.Optional(
        t.Object({
          page: t.Number(),
          slove: t.Boolean(),
          unslove: t.Boolean(),
          type: t.Array(t.String()),
          difficulty: t.Array(t.Number()),
        })
      ),
    }
  );
