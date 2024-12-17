import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
import router from "./router";
import './database/db.setup'

const app = new Elysia();
export type ElysiaType = typeof app;

app.use(cors({
    origin: true,
    credentials: true,
}));

app.listen(process.env.SERVER_PORT || 3000 ,()=>{
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
})


app.get("/", "Hello, Elysia!");
app.use(router(app));
