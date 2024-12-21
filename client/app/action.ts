'use server';
import axios from 'axios';
import {cookies} from "next/headers";

export const getProblem = async () => {
    try{
        const cookieStore = await cookies()
        const token = cookieStore.get('__session')

        if (!token) {
            throw new Error('Unauthorized');
        }

        const response = await axios.get('http://localhost:4000/problem/get', {
            headers: { Authorization: `Bearer ${token?.value}` },
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.error(error)
    }
};
