"use server";
import axios from 'axios';
import getSession from "@/hooks/use-session";
import { redirect } from 'next/navigation'
import { ICreateChallenge } from '@/interface/challenges';

export const createChallenge = async (data : ICreateChallenge ) => {
    try{
        const token = await getSession();

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/challenge/create`, {
            ...data,
        }, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.log(error);
    }
}


export const updateChallenge = async (data : ICreateChallenge) => {
    try{
        const token = await getSession();

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/challenge/update`, {
            ...data,
        }, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.log(error);
    }
}

export const getChallenges = async (searchParams : string) : Promise<any> => {
    try{
        const token = await getSession();

        const search = `?search=${searchParams}`;

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}/challenge/gets${search}`, {
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

export const getChallengeEditById = async (id: string) => {
    try{
        const token = await getSession();

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}/challenge/getedit/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        // console.log(error.response?.status);
        if (axios.isAxiosError(error) && error.response?.status !== 200) {
            redirect('/challenges');
        }
        console.log(error);
    }
};

export const getChallengesById = async (id: string) => {
    try{
        const token = await getSession();

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}/challenge/get/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        if (axios.isAxiosError(error) && error.response?.status != 200) {
            redirect('/challenges');
        }
        console.log(error);
    }
};

export const JoinChallenge = async (id: string, secret_code?: string) => {
    try{
        const token = await getSession();

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/challenge/join/${id}`, {
            ...(secret_code && {
                secret_code: secret_code,
            }),
        }, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.log(error);
    }
}

export const LeaveChallenge = async (id: string) => {
    try{
        const token = await getSession();

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/challenge/leave/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.log(error);
    }
}

export const getLeaderboardById = async (id: string) => {
    try{
        const token = await getSession();

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}/challenge/leaderboard/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.log(error);
    }
}

export const getIsJoinedChallenge = async (id: string) => {
    try{
        const token = await getSession();

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}/challenge/isJoined/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.log(error);
    }
}

export const deleteChallenge = async (id: string) => {
    try{
        const token = await getSession();

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/challenge/delete`, {
            _id: id
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