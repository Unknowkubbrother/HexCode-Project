import { Elysia,t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { createProblem, ProblemModel } from "@/models/problems";

export const ProblemRoute = new Elysia({'prefix':'/problem'})
.use(clerkPlugin())
.post('/add', async ({ body,clerk, auth, error }) =>{

    try{
        // if (!auth?.userId){
        //    return error(401, 'Unauthorized')
        // } 

        //const user = await clerk.users.getUser(auth.userId)
        
        const value = createProblem({
            title:body.title,
            description:body.description,
            difficulty:body.difficulty,
            clerkId:"user.id",
            point:body.point,
            filedocs:body.filedocs,
            hint:body.hint})
        return { msg:"success" }

    }catch(e){
        return error(500, 'Internal Server Error')
    }


},{body: t.Object({
    title: t.String(),
    description: t.String(),
    difficulty: t.Number(),
    point : t.Number(),
    filedocs: t.Optional(t.String()),
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

