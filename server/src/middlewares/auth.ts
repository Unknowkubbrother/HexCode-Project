import { Context } from 'elysia';
import Roles from '../enum/roles';
import { getUserById, getUserBySessionToken } from '../models/accounts';
import {get , merge } from 'lodash';


const isAdmin = async ({request , error} : Context) =>{
    try{
        const currentUserId = get(request, 'identity._id');

        if (!currentUserId){
            return error(401, 'Unauthorized');
        }

        const user = await getUserById(currentUserId);
        if (!user){
            return error(401, 'Unauthorized');
        }

        if (user.role !== Roles.ADMIN){
            return error(403, 'Forbidden');
        }

        return true;


    }catch(e){
        console.log(e);
        return error(500, 'Internal Server Error');
    }
}

const isAuthenicated = async ({body, cookie , request , error} : Context & { body : { username : string }}) =>{
    try{
        const sessionToken = cookie['HEXCODE_AUTH'];

        if (!sessionToken){
            return error(401, 'Unauthorized');
        }

        // @ts-ignore
        const user = await getUserBySessionToken(sessionToken);

        if (!user){
            return error(401, 'Unauthorized');
        }

        //body.username = user.username;
        merge(request, { identity: user});

        return true;

    }catch(e){
        console.log(e);
        return error(500, 'Internal Server Error');
    }
}

export {
    isAdmin,
    isAuthenicated
}