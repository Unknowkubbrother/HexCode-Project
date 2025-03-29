import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import "@/database/db.setup";
import { logger } from "@chneau/elysia-logger";
import { ProblemRoute } from "@/router/problems.router";
import { SubmissionRoute } from "@/router/submissions.router";
import { TestCaseRoute } from "@/router/testcases.router";
import { fileRoute } from "@/router/file.router";
import { AccountRoute } from "@/router/accounts.router";
import { ProfileRoute } from "@/router/profile.router";
import { ChallengeRoute } from "./router/challenges.router";
import { VerifyRoute } from "./router/verifications.router";

/**
* @author clerkId Test go
*/
declare global {
  var testuserId: string;
}
globalThis.testuserId = "user_2sSBAIPFb76Nu4JujDkYIvy1Mt5";

/**
* @comment Create a new Elysia app
*/
const app = new Elysia()
  .use(logger())
  .use(cors())
  .use(ProblemRoute)
  .use(TestCaseRoute)
  .use(SubmissionRoute)
  .use(fileRoute)
  .use(AccountRoute)
  .use(ProfileRoute)
  .use(ChallengeRoute)
  .use(VerifyRoute)
  .get("/", () =>{
    return {message: "Hello, Elysia! by HEX CODE"};
  })
  .listen(process.env.SERVER_PORT || 3001);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);