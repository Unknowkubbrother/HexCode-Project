import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { createSubmission } from "@lib/judge0";
import { getProblemById } from "@/models/problems.model";
import { getTestCasesByProblemId } from "@/models/testcases.model";
import {min} from "mathjs"
import { IJudge0Submission } from "@/interface/judge0.interface";
import {createSubmissionDB} from "@/models/submissions.model"

export const SubmissionRoute = new Elysia({ prefix: "/submission" })
  .use(clerkPlugin())
  .post(
    "/submit",
    async ({ body, clerk, auth, error }) => {
      try {
        if (!auth?.userId) {
          return error(401, "Unauthorized");
        }

        const { problemId, language_id, source_code } = body;
        const problem = await getProblemById(problemId);

        if (!problem) {
          return error(404, "Problem not found");
        }

        const { status } = problem;

        if (status !== "active") {
          return error(400, "Problem is not active");
        }

        const { cpu_time_limit, memory_limit, stack_limit, max_file_size } = problem;

        const testcases = await getTestCasesByProblemId(problemId);

        const submission : IJudge0Submission[] = await Promise.all(testcases.map(async (testcase,idx) => {
          const { input, output } = testcase;

          const { token } = await createSubmission({
            source_code: source_code,
            language_id: language_id,
            stdin: input,
            ...(cpu_time_limit && { cpu_time_limit: min(cpu_time_limit as number, 60) }),
            ...(memory_limit && { memory_limit }),
            ...(stack_limit && { stack_limit }),
            ...(max_file_size && { max_file_size }),
            expected_output: output,
          });

          return await new Promise((resolve, reject) => {
            const worker = new Worker(`${import.meta.dir}/worker.ts`);
            worker.postMessage({ token, delay: min(cpu_time_limit as number,60) });

            worker.onmessage = (event) => {
                resolve({
                ...event.data,
                testcaseId: idx,
                });
              worker.terminate();
            };

            worker.onerror = (err) => {
              reject(error(500, "Worker Error: " + err.message));
            };
          });
        }));

        const calculatePoints = (submission: IJudge0Submission[]) => {
          let points = 0;
          submission.forEach((sub : IJudge0Submission) => {
            if (sub.status.description === "Accepted") {
              points += testcases[sub.testcaseId].points;
            }
          });
          return points;
        }
        const submissionData = {
          clerkId: auth.userId,
          problemId: problemId,
          testcases: submission,
          points: calculatePoints(submission),
          source_code: source_code,
          success: submission.every((sub : IJudge0Submission) => sub.status.description === "Accepted"),
        }

        const submissioned = await createSubmissionDB(submissionData);

        if (!submissioned) {
          return error(500, "Failed to submit");
        }

        return {
          _id: submissioned._id,
          clerkId: submissioned.clerkId,
          problemId: submissioned.problemId,
          testcases: submissioned.testcases,
          points: submissioned.points,
          success: submissioned.success,
        };

      } catch (e) {
        return error(500, "Internal Server Error");
      }
    },
    {
      body: t.Object({
        problemId: t.String(),
        language_id: t.Number(),
        source_code: t.String(),
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

        const { language_id, source_code, stdin } = body;

        const delay = 15;

        const { token } = await createSubmission({
          source_code,
          language_id,
          ...(stdin && { stdin }),
          cpu_time_limit: delay,
        });

        return await new Promise((resolve, reject) => {
          const worker = new Worker(`${import.meta.dir}/worker.ts`);
          worker.postMessage({ token, delay });

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
      stdin: t.Optional(t.String()),
    }),
  }
  );