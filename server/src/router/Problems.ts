import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { createProblem, ProblemModel } from "@/models/problems";
import { SubmissionModel } from "@/models/Solution";

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

        const sizepage = query?.pagesize ? query.pagesize : 10;
        const page = query?.page ? query.page : 1;
        const difficulty = query.difficulty ? JSON.parse(query.difficulty) : "";
        const type = query.type ? JSON.parse(query.type) : "";

        const problems = await ProblemModel.find({
          $and: [
            difficulty ? { difficulty: { $in: difficulty } } : {},
            type != "" ? { type: { $in: type } } : {},
          ],
        })
          .skip(sizepage * (page - 1))
          .limit(sizepage);
        const totalCounts = (await ProblemModel.find()).length;

        const submissions = await SubmissionModel.find({clerkId:user.id});

        const resultProblem = await Promise.all(
          problems.map(async (value, idx) => {
            const userbyid = await clerk.users.getUser(value.clerkId);
            const result = submissions.find(submission => submission.problemId === value._id.toString());
            const bodyresult = {
              id: value._id.toString(),
              title: value.title,
              difficulty: value.difficulty,
              submissions: value.submissions,
              accepted: value.accepted,
              successRate: (value.accepted / value.submissions) * 100 || 0,
              clid: value.clerkId,
              type: value.type,
              author: {
                name: `${userbyid.username}`,
                avatar: userbyid.imageUrl,
              },
              point: value.point,
            };
            if(query.slove==true&&(query.unslove==false||!query.unslove)){
              if(result?.success==true){
                return bodyresult
              }
            }else if((query.slove==false||!query.slove)&&query.unslove==true){
              if(!(result?.success==true)){
                return bodyresult
              }
            }else{
              return bodyresult
            }
          })
        );
        return {
          result: resultProblem.filter(item => item !== null && item !== undefined),
          totalCounts: totalCounts,
        };
      } catch (e) {
        return error(500, "Internal Server Error");
      }
    },
    {
      query: t.Optional(
        t.Object({
          page: t.Optional(t.Number()),
          pagesize: t.Optional(t.Number()),
          slove: t.Optional(t.Boolean()),
          unslove: t.Optional(t.Boolean()),
          type: t.Optional(t.String()),
          difficulty: t.Optional(t.String()),
        })
      ),
    }
  );
