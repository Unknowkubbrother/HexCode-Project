import {Elysia } from 'elysia';
import Roles from '@/enum/roles';
import { getUserById, getUserBySessionToken } from '@/models/accounts';
import {get , merge } from 'lodash';

const isAdmin = new Elysia().derive( {as: 'scoped'}, async (context): Promise<{
    isAdmin: boolean | null;
}> =>{

    const currentUserId = get(context.request, 'identity._id');
    if (!currentUserId){
        return {
            isAdmin: false
        }
    }

    const user = await getUserById(currentUserId);
    if (!user){
        return {
            isAdmin: false
        }
    }

    if (user.role !== Roles.ADMIN){
        return {
            isAdmin: false
        }
    }

    return {
        isAdmin: true
    }
})

const isAuthenicated = new Elysia().derive( {as: 'scoped'}, async (context): Promise<{
    isAuth: boolean | null;
}> =>{

    const sessionToken = context.cookie['HEXCODE_AUTH'].value;

    if (!sessionToken){
        return {
            isAuth: false
        }
    }

    const user = await getUserBySessionToken(sessionToken);

    if (!user){
        return {
            isAuth: false
        }

    }

    merge(context.request, { identity: user});

    return {
        isAuth: true
    }
})

export {
    isAdmin,
    isAuthenicated
}