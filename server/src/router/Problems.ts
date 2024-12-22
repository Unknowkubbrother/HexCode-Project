import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { createProblem, ProblemModel } from "@/models/problems";
import { ceil, round } from "mathjs";

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
        
        // if (!auth?.userId){
        //    return error(401, 'Unauthorized')
        // }

        // const user = await clerk.users.getUser(auth.userId)

        const sizepage = Number(query.pagesize)||10;
        const page = Number(query.page)||1;

        const problems = await ProblemModel.find().skip(sizepage*(page-1)).limit(sizepage);

        const countpage = await ProblemModel.countDocuments({})
        const numberpage: number = ceil(countpage / sizepage);

        const resultProblem = await Promise.all(problems.map(async (value, idx) => {
          const userbyid = await clerk.users.getUser(value.clerkId)
          return {
            id: value._id.toString(),
            title: value.title,
            difficulty: value.difficulty,
            submissions: value.submissions,
            accepted: value.accepted,
            successRate: (value.accepted / value.submissions) * 100 || 0,
            clid: value.clerkId,
            author: {
              name: `${userbyid.username}`,
              avatar: userbyid.imageUrl
            },
            point: value.point,
          };
        }))
        return {
          result: resultProblem,
          numberpage: {
            page: page,
            all: numberpage,
          },
        };
      } catch (e) {
        return error(500, "Internal Server Error");
      }
    }
  )

  .post(
    "/get",
    async ({ body, clerk, auth, error }) => {
      try {
        
        // if (!auth?.userId){
        //    return error(401, 'Unauthorized')
        // }

        // const user = await clerk.users.getUser(auth.userId)

        const sizepage = body?.pagesize?body.pagesize:10;
        const page = body?.page?body.page:1;

        const problems = await ProblemModel.find(
          body?.difficulty?{difficulty:{$in:body.difficulty}}:{},
          body?.type?{type:{$in:body.difficulty}}:{}
        ).skip(sizepage*(page-1)).limit(sizepage);

        const countpage = await ProblemModel.countDocuments(
          body?.difficulty?{difficulty:{$in:body.difficulty}}:{},
          body?.type?{type:{$in:body.difficulty}}:{})
        const numberpage: number = ceil(countpage / sizepage);

        const resultProblem = await Promise.all(problems.map(async (value, idx) => {
          const userbyid = await clerk.users.getUser(value.clerkId)
          return {
            id: value._id.toString(),
            title: value.title,
            difficulty: value.difficulty,
            submissions: value.submissions,
            accepted: value.accepted,
            successRate: (value.accepted / value.submissions) * 100 || 0,
            clid: value.clerkId,
            author: {
              name: `${userbyid.username}`,
              avatar: userbyid.imageUrl
            },
            point: value.point,
          };
        }))
        return {
          result: resultProblem,
          numberpage: {
            page: page,
            all: numberpage,
          },
        };
      } catch (e) {
        return error(500, "Internal Server Error");
      }
    },
    {
      body: t.Optional(
        t.Object({
          page: t.Optional(t.Number()),
          pagesize: t.Optional(t.Number()),
          slove: t.Optional(t.Boolean()),
          unslove: t.Optional(t.Boolean()),
          type: t.Optional(t.Array(t.String())),
          difficulty: t.Optional(t.Array(t.Number())),
        })
      ),
    }
  );
