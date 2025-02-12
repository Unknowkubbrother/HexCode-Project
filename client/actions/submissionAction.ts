'use server';
import axios from 'axios';
import getSession from "@/hooks/use-session";

export const runCodeTest = async (data: {
    source_code : string,
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

        console.log(response.data);

        return response.data;
    }catch(error){
        console.error(error);
    }
};