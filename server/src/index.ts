import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import "@/database/db.setup";
import { logger } from "@chneau/elysia-logger";
import { ProblemRoute } from "./router/problems.router";
import { SubmissionRoute } from "./router/submissions.router";
import { TestCaseRoute } from "./router/testcases.router";

/**
* @author clerkId Test go
*/
declare global {
  var testuserId: string;
}
globalThis.testuserId = "user_2qRd8EVDei0OGYmRQ6DAI37Vf4L";

/**
* @comment Create a new Elysia app
*/
const app = new Elysia()
  .use(logger())
  .use(cors())
  .use(ProblemRoute)
  .use(TestCaseRoute)
  .use(SubmissionRoute)
  .get("/", "Hello, Elysia!")
  .listen(process.env.SERVER_PORT || 3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);