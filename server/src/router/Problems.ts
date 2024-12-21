import { Elysia,t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { createProblem, ProblemModel,getProblems } from "@/models/problems";
import { round } from "mathjs";

export const ProblemRoute = new Elysia({'prefix':'/problem'})
.use(clerkPlugin())

.post('/add', async ({ body,clerk, auth, error }) =>{

    try{
        if (!auth?.userId){
           return error(401, 'Unauthorized')
        } 

        const user = await clerk.users.getUser(auth.userId)
        
        const value = createProblem({
            title:body.title,
            description:body.description,
            difficulty:body.difficulty,
            type:body.type,
            clerkId: user.id,
            point:body.point,
            testcase : body.testcase,
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
    type:t.Array(t.Number()),
    point : t.Number(),
    testcase : t.Array(t.Object({
        input:t.String(),
        output:t.String()
    })),
    filedocs: t.Optional(t.String()),
    hint: t.Optional(t.Array(t.String()))
})})

.post('/get', async ({ body,clerk, auth, error }) =>{

    try{
        // if (!auth?.userId){
        //    return error(401, 'Unauthorized')
        // } 

        // const user = await clerk.users.getUser(auth.userId)
        const sizepage = 10
        const problems = await getProblems()
        const numberpage = round(problems.length/sizepage)
        const problem = problems.map((v,i)=>{
            return({
                id:v.id,
                title:v.title,
                difficulty:v.difficulty,
                submissions:v.submissions,
                accpet:v.accpet,
                point:v.point
            })
        }).slice(body.page?2*(body.page-1):0,body.page?2*body.page:2)
        return { problems:problem,numberpage:{
            page:body.page?body.page:1,
            all:numberpage
        } }

    }catch(e){
        return error(500, 'Internal Server Error')
    }


},{body: t.Object({
    page:t.Optional(t.Number())
})})

