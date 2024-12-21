'use server';
import axios from 'axios';

export const getProblem = async (token : string) => {
    try{

        const response = await axios.get('http://localhost:4000/problem/get', {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.error(error)
    }
};
