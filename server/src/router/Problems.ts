import { Elysia,t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { ProblemModel } from "@/models/problems";

export const TemplateRoute = new Elysia({'prefix':'/template'})
.use(clerkPlugin())
.post('/addpromblem', async ({ body,clerk, auth, error }) =>{

    try{
        const {title,description,difficulty,point,file,hint} = body;
        if (!auth?.userId){
           return error(401, 'Unauthorized')
        } 

        const user = await clerk.users.getUser(auth.userId)
        ProblemModel.create({title:body.title})

        return { user }

    }catch(e){
        return error(500, 'Internal Server Error')
    }


},{body: t.Object({
    title: t.String(),
    description: t.String(),
    difficulty: t.Number(),
    point : t.Number(),
    file: t.Optional(t.File()),
    hint: t.Optional(t.Array(t.String()))
})})

.get('/get', async ({clerk , auth, error}) =>{
    try{
        // console.log(auth)
        if (!auth?.userId){
           return error(401, 'Unauthorized')
        } 

        const user = await clerk.users.getUser(auth.userId)


        return { user }

    }catch(e){
        return error(500, 'Internal Server Error')
    }
})

