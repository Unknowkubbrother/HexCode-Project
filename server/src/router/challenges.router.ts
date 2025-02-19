import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";

export const ChallengeRoute = new Elysia({ prefix: "/challenge" })
  .use(clerkPlugin())

  .post("/create",async ({ body, auth , error }) => {
      try {
        if (!auth?.userId) {
          return error(401, "Unauthorized");
        }

        const { title,description,problem,reward,starttime,endtime } = body;
        const timenow = Date.now();
        if(starttime<timenow||starttime>endtime){
            return error(404, "time error");
        }

        return {
          status: 200,
          message: "create success",
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
        problem: t.Optional(t.String()),
        reward: t.Optional(t.String()),
        viewer: t.String(),
        starttime: t.Number(),
        endtime: t.Number(),
      }),
    }
  );