"use server";
import axios from 'axios';
import getSession from "@/hooks/use-session";

export const getChallengesProblemById = async (id: string) => {
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
        console.log(error);
    }
};

export const getAllChallenges = async () : Promise<any> => {
    try{
        const token = await getSession();

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}/challenge/gets`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.log(error);
    }
};