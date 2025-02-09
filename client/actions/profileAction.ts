'use server';
import axios from 'axios';
import getSession from "@/hooks/use-session";

export const getProblemByUsername = async (username: string) => {
    try{
        const token = await getSession();

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}/profile/get/${username}`, {
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