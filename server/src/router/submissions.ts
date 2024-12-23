import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { getSubmitById,SubmissionModel } from "@/models/submissions";
import { ProblemModel,getProblemById } from "@/models/problems";
import { isNumber } from "lodash";

export const SubmissionRoute = new Elysia({ prefix: "/solution" })
  .use(clerkPlugin())
  .post(
    "/submit",
    async ({ body, clerk, auth, error }) => {
      try {
        if (!auth?.userId) {
          return error(401, "Unauthorized");
        }

        const user = await clerk.users.getUser(auth.userId);
        const submitdata = await getSubmitById(body.problemId,user.id);

        //submitcode to check

        if(submitdata.length>0){
          const result = await getProblemById(body.problemId);
          if(isNumber(result?.submissions)){
            result.submissions+=1;
            result.accepted+=1;
            await ProblemModel.findByIdAndUpdate(result._id.toString(),result)
          }
          return { msg: submitdata };
        }

        const problem = await getProblemById(body.problemId);
          if(isNumber(problem?.submissions)){
            problem.submissions+=1;
            problem.accepted+=1;
            await ProblemModel.findByIdAndUpdate(problem._id.toString(),problem)
          }

        const values = await SubmissionModel.create({
          problemId:body.problemId,
          clerkId:user.id,
          success: false,
          score:100
        })

        const result = await values.save()

        return { msg: result };
      } catch (e) {
        return error(500, "Internal Server Error");
      }
    },
    {
      body: t.Object({
        problemId: t.String(),
        
      }),
    }
  )