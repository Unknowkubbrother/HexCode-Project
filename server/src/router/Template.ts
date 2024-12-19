import { Elysia , Context } from "elysia";
import { clerkPlugin } from "elysia-clerk";

export const TemplateRoute = new Elysia({'prefix':'/template'})
.use(clerkPlugin())
.post('/post', async ({error}) =>{
    try{
       
        return { message: 'Hello Post Elysia!'}

    }catch(e){
        return error(500, 'Internal Server Error')
    }
})

//@ts-ignore
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

