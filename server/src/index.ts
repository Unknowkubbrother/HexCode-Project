import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import "@/database/db.setup";
import { logger } from "@chneau/elysia-logger";
import { TemplateRoute } from "@/router/template";
import { ProblemRoute } from "./router/problems";
import { SubmissionRoute } from "./router/submissions";

const app = new Elysia()
  .use(logger())
  .use(cors())
  .use(TemplateRoute)
  .use(ProblemRoute)
  .use(SubmissionRoute)
  .get("/", "Hello, Elysia!")
  .listen(process.env.SERVER_PORT || 3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);