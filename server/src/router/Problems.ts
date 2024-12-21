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
        
        const value = await createProblem({
            title:body.title,
            description:body.description,
            difficulty:body.difficulty,
            type:body.type,
            clerkId: user.id,
            point:body.point,
            testcase : body.testcase,
            filedocs:body.filedocs,
            hint:body.hint})

        if(!value){
            return error(404, 'Error')
        }
        return { msg:value }

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

        let query:any = {};
        if(body.difficulty){
            query.difficulty = { $in: body.difficulty };
        }
        if(body.type){
            query.type = { $in: body.type };
        }
        const problems = await ProblemModel.find(query)
        const numberpage = round(problems.length/sizepage)
        const problem = problems.map((v,_)=>{
            return({
                id:v.id,
                title:v.title,
                clerkId:v.clerkId,
                difficulty:v.difficulty,
                submissions:v.submissions,
                accpet:v.accpet,
                successrate:v.accpet/v.submissions*100||0,
                point:v.point
            })
        }).slice(body.page?sizepage*(body.page-1):0,body.page?sizepage*body.page:sizepage)
        return { problems:problem,numberpage:{
            page:body.page?body.page:1,
            all:numberpage
        } }

    }catch(e){
        return error(500, 'Internal Server Error')
    }


},{body: t.Object({
    page:t.Optional(t.Number()),
    slove:t.Optional(t.Boolean()),
    unslove:t.Optional(t.Boolean()),
    type:t.Optional(t.Array(t.String())),
    difficulty:t.Optional(t.Array(t.Number()))
})})

