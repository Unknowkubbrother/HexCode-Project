'use server';
import axios from 'axios';
import getSession from "@/hooks/use-session";

export const getProblems = async (searchParams?: {[key: string]: string | string[] | undefined })  => {
    try{
        const token = await getSession();

        const search = `?page=${searchParams?.page ?? 1}&pagesize=${searchParams?.pageSize ?? 10}${searchParams?.solve !== undefined ? `&solve=${searchParams?.solve}` : ''}${searchParams?.unsolve !== undefined ? `&unsolve=${searchParams?.unsolve}` : ''}${searchParams?.difficulty ? `&difficulty=[${searchParams?.difficulty}]` : ''}${searchParams?.type ? `&type=[${searchParams?.type}]` : ''}
        `;

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}/problem/gets${search}`, {
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

export const getProblemById = async (id: string) => {
    try{
        const token = await getSession();

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}/problem/get/${id}`, {
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