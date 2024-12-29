'use server';
import axios from 'axios';
import getSession from "@/hooks/use-session";

export const getProblem = async (searchParams?: {[key: string]: string | string[] | undefined })  => {
    try{
        const token = await getSession();

        const search = `?page=${searchParams?.page ?? 1}&pagesize=${searchParams?.pageSize ?? 10}${searchParams?.solve !== undefined ? `&solve=${searchParams?.solve}` : ''}${searchParams?.unsolve !== undefined ? `&unsolve=${searchParams?.unsolve}` : ''}${searchParams?.difficulty ? `&difficulty=[${searchParams?.difficulty}]` : ''}${searchParams?.type ? `&type=[${searchParams?.type}]` : ''}
        `;

        const response = await axios.get(`https://hexcode.unknowkubbrother.net/api/problem/get${search}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.error(error);
    }
};
