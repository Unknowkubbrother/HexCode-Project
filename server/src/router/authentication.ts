import { createUser,getUserByUsername,getUserBySessionToken,getUserByEmail,AccountModel } from '@/models/accounts';
import { random, authentication,getUserResponse } from '@/utils/auth';
import { Elysia , t } from "elysia";

export const AuthRoute = new Elysia({'prefix':'/auth'})

/**
 * 
 * @playload 
 * {
 *  username : string,
 *  password : string
 * } 
 * @returns json
 */


.post('/login', async ({body,set,error, cookie : { HEXCODE_AUTH , HEXCODE_DATA , logged_in}}) =>{
    try{
            // @ts-ignore
            const { username , password } = body;

            const user = await getUserByUsername(username).select('+authentication.salt +authentication.password');
    
            if (!user){
                return error(404, 'User not found');
            }
    
            if (!user.authentication || !user.authentication.salt) {
                return error(500, 'User authentication data is missing');
            }
    
            const expectedHash = authentication(user.authentication.salt, password);
            if (expectedHash !== user.authentication.password){
                return error(401, 'Invalid password');
            }
    
            const salt = random();
            user.authentication.sessionToken = authentication(salt, user._id.toString());
            await user.save();
    
            if (!user.authentication.sessionToken){
                return error(500, 'Failed to generate session token');
            }

            HEXCODE_AUTH.set({
                value : user.authentication.sessionToken,
                sameSite: 'none',
                secure: true,
                domain: process.env.DOMAIN,
                maxAge: 1000 * 60 * 30 // 30 minutes
            })

            HEXCODE_DATA.set({
                value : JSON.stringify({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                }),
                sameSite: 'none',
                secure: true,
                domain: process.env.DOMAIN,
                maxAge: 1000 * 60 * 30 // 30 minutes
            })

            logged_in.set({
                value : 'true',
                sameSite: 'none',
                secure: true,
                domain: process.env.DOMAIN,
                maxAge: 1000 * 60 * 30 // 30 minutes
            })

            set.status = 200;
            return getUserResponse(user);
    
    
        }catch(e){
            console.log(e);
            return error(500, 'Internal Server Error');
        }
}, {
    body: t.Object({
        username: t.String(),
        password: t.String()
    }),
})


/**
 * 
 * @playload 
 * {
 *  username : string,
 *  email : string,
 *  password : string,
 *  confirmPassword : string
 * }
 * @returns json
 */
.post('/register', async ({ body , set , error})  =>{
    try{
        // @ts-ignore
        const { username , email, password, confirmPassword } = body;

        if (password !== confirmPassword){
            return error(400, 'Passwords do not match');
        }

        const existingUser  = await getUserByUsername(username);
        if(existingUser){
            return error(409, 'Username already exists');
        }

        const existingEmail = await getUserByEmail(email);
        if(existingEmail){
            return error(409, 'Email already exists');
        }

        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication: {
                password: authentication(salt, password),
                salt,
            }
        })

        const responseUser = getUserResponse(user);

        set.status = 201;
        return responseUser;
        

    }catch(e){
        console.log(e);
        return error(500, 'Internal Server Error');
    }
}, {
    body: t.Object({
        username: t.String(),
        email: t.String(),
        password: t.String(),
        confirmPassword: t.String()
    }),
})


/**
 * @comment login check by session token 
 **/

.post('/session', async ({ set , error, cookie : { HEXCODE_AUTH } }) =>{
    try{
        const sessionToken = HEXCODE_AUTH.value;

        if (!sessionToken){
            return error(401, 'Unauthorized');
        }
        //@ts-ignore
        const user = await getUserBySessionToken(sessionToken);

        if (!user){
            return error(401, 'Unauthorized');
        }

        set.status = 200;
        return getUserResponse(user);

    }catch(e){
        console.log(e);
        return error(500, 'Internal Server Error');
    }
})

/**
 * @comment logout clearAll cookie
 */

.post('/logout', async ({ set , error, cookie : { HEXCODE_AUTH , HEXCODE_DATA , logged_in}}) =>{
    try{
        const sessionToken = HEXCODE_AUTH.value;

        if (!sessionToken){
            return error(401, 'Unauthorized');
        }

        //@ts-ignore
        const user = await getUserBySessionToken(sessionToken);
        if (!user){
            return error(401, 'Unauthorized');
        }

        //@ts-ignore
        user.authentication.sessionToken = "";

        await user.save();

        HEXCODE_AUTH.remove();
        HEXCODE_DATA.remove();
        logged_in.remove();

        set.status = 200;
        return { message : 'Logout success'};

    }catch(e){
        console.log(e);
        return error(500, 'Internal Server Error');
    }
})