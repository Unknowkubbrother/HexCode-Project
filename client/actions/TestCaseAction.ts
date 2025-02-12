'use server';
import axios from 'axios';
import getSession from "@/hooks/use-session";

export const addTestCase = async (data: FormData) => {
    try{
        const token = await getSession();

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/testcase/add`, data, {
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