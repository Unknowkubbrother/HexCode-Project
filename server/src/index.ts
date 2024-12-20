import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import "@/database/db.setup";
import { logger } from "@chneau/elysia-logger";
// import { clerkPlugin } from "elysia-clerk";
import { TemplateRoute } from "@/router/Template";
import { ProblemRoute } from "./router/Problems";

const app = new Elysia()
  .use(logger())
  .use(TemplateRoute)
  .use(ProblemRoute)
  .get("/", "Hello, Elysia!")
  .use(cors())
  .listen(process.env.SERVER_PORT || 3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);