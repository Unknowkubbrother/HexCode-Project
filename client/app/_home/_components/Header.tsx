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
        <Link href="/problems" className="bg-primary px-5 py-2 rounded-2xl shadow-lg hover:bg-bgsecondary duration-300">
          Problems
        </Link>
        <Link href="/challenges" className="bg-primary px-5 py-2 rounded-2xl shadow-lg hover:bg-bgsecondary duration-300">
          Challengs
        </Link>
      </div>
      <a className="flex mt-10 gap-5 text-[#9CA3AF]" href="#why">
        See why you should learn hex code
        <span className="animate-bounce p-2 bg-bgsecondary rounded-full text-sm">
          <ArrowDown />
        </span>
      </a>
    </header>
  );
};

export default Header;
