'use server';
import axios from 'axios';
import getSession from "@/hooks/use-session";

export const getVerifies = async () => {
    try{
        const token = await getSession();

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}/verify/gets`, {
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