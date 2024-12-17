import { type Context } from 'elysia';

const login = async ({set,error} : Context) =>{
    try{
        set.status = 200;
        return 'login';

    }catch(e){
        console.log(e);
        return error(500, 'Internal Server Error');
    }
}

const register = async ({set , error} : Context) =>{
    try{
        
        set.status = 200;
        return 'register';

    }catch(e){
        console.log(e);
        return error(500, 'Internal Server Error');
    }
}

export {
    login,
    register
}
