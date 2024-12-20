import React from "react";
import Image from "next/image";
import TemplateImage from "@/assets/avatar.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Coins } from 'lucide-react';
import Link from "next/link";

const CardChallenges = () => {
  return (
    <Link href="/" className="w-[250px] h-[360px] bg-bgsecondary rounded-lg flex flex-col overflow-hidden shadow-lg duration-300 transform hover:scale-105">
      <div className="w-full h-full m-auto p-2">
        <div className="w-full h-[50%] rounded-lg overflow-hidden object-cover">
          <Image
            src={TemplateImage}
            alt="avatar"
            className="w-full h-full object-cover"
          ></Image>
        </div>
        <div className="w-full flex flex-col gap-2 mt-[10px]">
          <section id="title" className="flex justify-between items-center">
            <span>
              <span>🔥</span>
              <span className="font-bold text-rose-500">Challenge1</span>
              </span>
            <span className="flex gap-2 justify-center items-center">
              <span className="text-sm">Google</span>
              <Avatar className="h-5 w-5">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </span>
          </section>
          <section id="detail" className="w-full h-[90px] overflow-y-auto text-sm">
             <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. A molestiae ipsa enim inventore incidunt fugiat tempora iusto ab neque minima dolorum sint itaque accusantium dolores, deleniti provident saepe hic. Culpa, sint, et aliquid eum nobis repudiandae sapiente autem expedita ea, assumenda quaerat commodi molestias aspernatur! Consequatur fugit aut officiis nesciunt?</p>
          </section>
          <section id="joinAndgift" className="w-full flex justify-between items-center">
            <span className="flex gap-2 justify-center items-center"> 
              <span>1,800</span> 
              <span className="text-gray-400"><Users size={16}/></span>
              </span>
             <span className="flex gap-2 justify-center items-center">
              <span>1M</span>
               <span className="text-gray-400"><Coins size={17}/></span>
               </span>
          </section>
        </div>
      </div>
    </Link>
  );
};

export default CardChallenges;
