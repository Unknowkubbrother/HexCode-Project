'use server';
import axios from 'axios';
import getSession from "@/hooks/use-session";
import { redirect } from 'next/navigation'

export const runCodeTest = async (data: {
    source_code : string,
    stdin?: string,
    language_id : number,
}) => {
    try{
        const token = await getSession();

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/submission/runcodeTest`, data, {
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

export const submitCode = async (data: {
    problemId: string,
    source_code : string,
    language_id : number,
}) => {
    try{
        const token = await getSession();

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/submission/submit`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        if (axios.isAxiosError(error) && error.response?.status !== 200) {
            redirect(`/`);
        }
        console.error(error);
    }
}


export const getSubmissionByProblemId = async (problemId: string) => {
    try{
        const token = await getSession();

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}/submission/get/${problemId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response) {
            throw new Error('Error');
        }
        
        return response.data;
    }catch(error){
        console.error(error);
    }
}