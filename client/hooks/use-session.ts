"use server"
import {cookies} from "next/headers";

export default async function getSession() : Promise<string> {
    const cookieStore = await cookies()
    const token = cookieStore.get('__session')

    if (!token) {
        throw new Error('Unauthorized');
    }

    return token.value;
}