import { type Context } from 'elysia';
import { RegisterBody , LoginBody} from '../interfaces/authentication';
import { createUser,getUserByUsername,getUserBySessionToken,getUserByEmail,AccountModel } from '../models/accounts';
import { random, authentication,getUserResponse } from '../utils/auth';

/**
 * 
 * @playload 
 * {
 *  username : string,
 *  password : string
 * } 
 * @returns json
 */

const login = async ({body,set,error} : Context & { body : LoginBody}) =>{
    try{
        const { username , password } = body;

        if (!username || !password){
            return error(400, 'Missing required fields');
        }

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

        set.cookie = {
            'HEXCODE_AUTH': {
                value: user.authentication.sessionToken,
                sameSite: 'none',
                secure: true,
                domain: process.env.DOMAIN,
            },
            'HEXCODE_DATA': {
                value: JSON.stringify({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                }),
                sameSite: 'none',
                secure: true,
                domain: process.env.DOMAIN,
            },
            'logged_in': {
                value: 'true',
                sameSite: 'none',
                secure: true,
                domain: process.env.DOMAIN,
            }
        }

        set.status = 200;
        return getUserResponse(user);


    }catch(e){
        console.log(e);
        return error(500, 'Internal Server Error');
    }
}


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
const register = async ({ body , set , error} : Context & { body : RegisterBody}) =>{
    try{
        const { username , email, password, confirmPassword } = body;

        if (!username || !email || !password || !confirmPassword){
            return error(400, 'Missing required fields');
        }

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
}

export {
    login,
    register
}
