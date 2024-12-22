import React from "react";
import { ArrowDown } from 'lucide-react';
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full h-screen flex flex-col gap-5 justify-center items-center text-center">
      <h1 className="text-5xl font-bold drop-shadow-2xl flex gap-3">
        <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        </span>
        <span>
          HEX
          <span className="text-primary relative">CODE</span>
        </span>
        <span>For</span>
        <span>Everyone</span>
      </h1>
      <h2 className="text-2xl text-[#9CA3AF]">
        A platform to learn and practice programming for everyone
      </h2>
      <div className="flex gap-5 mt-5 text-white">
        <Link href="/problems" className="bg-primary px-5 py-2 rounded-2xl shadow-lg hover:bg-secondary hover:shadow-lg hover:shadow-primary duration-300">
          Problems
        </Link>
        <Link href="/challenges" className="bg-primary px-5 py-2 rounded-2xl shadow-lg hover:bg-secondary hover:shadow-lg hover:shadow-primary duration-300">
          Challenges
        </Link>
      </div>
      <span className="text-[#9CA3AF] mt-10">See why you should learn hex code</span>
      <Link className="flex text-[#9CA3AF] mt-2" href="#introduction">
        <span className="animate-bounce p-2 bg-bgsecondary rounded-full text-sm">
          <ArrowDown />
        </span>
      </Link>
    </header>
  );
};

export default Header;
