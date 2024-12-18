import { Elysia , Context } from "elysia";
import { isAuthenicated } from "@/middlewares/auth";

export const TemplateRoute = new Elysia({'prefix':'/template'})
.use(isAuthenicated)
.post('/post', async ({isAuth , error}) =>{
    try{
        if (!isAuth){
            return error(401, 'Unauthorized')
        }
        return { message: 'Hello Post Elysia!'}

    }catch(e){
        return error(500, 'Internal Server Error')
    }
})

.get('/get', async ({isAuth , error}) =>{
    try{
        if (!isAuth){
            return error(401, 'Unauthorized')
        }
        return { message: 'Hello Get Elysia!'}

    }catch(e){
        return error(500, 'Internal Server Error')
    }
})

