"use client"
import {useState , useEffect} from 'react'
import { getVerifies } from '@/actions/verificationAction'

export default function MangeVerify() {
  useEffect(() => {
    const fetchVerifies = async () => {
      const data = await getVerifies();
      console.log(data);
    };
    fetchVerifies();
  }
  , []);
        
  return (
    <div>MangeVerify</div>
  )
}
