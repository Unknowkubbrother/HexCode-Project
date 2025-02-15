'use server';
import axios from 'axios';
import getSession from "@/hooks/use-session";
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'

export const getProfileByUsername = async (username: string) => {
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
        const user = await currentUser();
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            redirect(`/profile/${user?.username}`);
        }
        console.error(error);
    }
};

export const followAccount = async (targetClerkId : string) => {
    try{

        const token = await getSession();

        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_END_POINT}/profile/follow`, {
            targetClerkId,
        }, {
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

export const updateAccountDetail = async (detail : string) => {
    try{

        const token = await getSession();

        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_END_POINT}/profile/accountDetail`, {
            detail,
        }, {
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
