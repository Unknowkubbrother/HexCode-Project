import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import "@/database/db.setup";
import { logger } from "@chneau/elysia-logger";
// import { clerkPlugin } from "elysia-clerk";
import { TemplateRoute } from "@/router/Template";
import { ProblemRoute } from "./router/Problems";
import { SolutionRoute } from "./router/Solution";

const app = new Elysia()
  .use(logger())
  .use(cors())
  .use(TemplateRoute)
  .use(ProblemRoute)
<<<<<<< HEAD
  .use(SolutionRoute)
  .get("/", "Hello, Elysia!")
=======
  .get("/", "Hello, Elysia!!")
>>>>>>> e95ed5499bf9557d2cf08ba18b43a05f542337f6
  .listen(process.env.SERVER_PORT || 3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);