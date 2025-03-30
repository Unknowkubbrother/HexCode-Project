'use server';
import axios from 'axios';
import getSession from "@/hooks/use-session";
import { IAccount } from '@/interface/accounts';

export const getAccounts = async () => {
    try{
        const token = await getSession();

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}/account/gets`, {
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

export const updateAccount = async (value: IAccount) => {
    try{
        const token = await getSession();

        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_END_POINT}/account/updateAccount`, {
            ...value,
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