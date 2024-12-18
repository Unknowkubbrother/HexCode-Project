import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import "@/database/db.setup";
import { AuthRoute } from "@/router/authentication";

const app = new Elysia()
  .use(AuthRoute)
  .get("/", "Hello, Elysia!")
  .use(cors())
  .listen(process.env.SERVER_PORT || 3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);