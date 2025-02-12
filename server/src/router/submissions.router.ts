import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { createSubmission, getSubmission, convertStatusToType } from "@lib/judge0";

export const SubmissionRoute = new Elysia({ prefix: "/submission" })
  .use(clerkPlugin())
  .post(
    "/submit",
    async ({ body, clerk, auth, error }) => {
      try {
        if (!auth?.userId) {
          return error(401, "Unauthorized");
        }


        return {
          msg: "success",
        }

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

  .post(
    "/runcodeTest",
    async ({ body, clerk, auth, error }) => {
      try {
        if (!auth?.userId) {
          return error(401, "Unauthorized");
        }

        const { language_id, source_code } = body;
        
        const { token } = await createSubmission({
          source_code,
          language_id,
          cpu_time_limit: 10,
        });
        return await new Promise((resolve, reject) => {
          const worker = new Worker(`${import.meta.dir}/worker.ts`);
          worker.postMessage({ token });
    
          worker.onmessage = (event) => {
            resolve(event.data);
            worker.terminate();
          };
    
          worker.onerror = (err) => {
            reject(error(500, "Worker Error: " + err.message));
          };
        });

      } catch (e) {
        return error(500, "Internal Server Error");
      }
    }, {
    body: t.Object({
      language_id: t.Number(),
      source_code: t.String(),
    }),
  }
  );