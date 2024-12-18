"use client";
import React from "react";
import SwitchTheme from "@/components/ui/SwitchTheme";
import Image from "next/image";
import ButtonUserProfile from "../ButtonUserProfile";
interface NavbarProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export default function Navbar({ setTheme, theme }: NavbarProps) {
  return (
    <nav className="w-full h-[50px] flex justify-around items-center bgSecondary bg-bgprimary text-white py-7">
      <ul className="flex justify-center items-center gap-3">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <span className="text-lg font-bold drop-shadow-lg">HEX
          <span className="text-primary">CODE</span>
        </span>
      </ul>
      <ul className="flex justify-center items-center gap-3">
        <li>
          <SwitchTheme setTheme={setTheme} theme={theme} className="hover:text-primary duration-300"/>
        </li>
        <li>
          <ButtonUserProfile />
        </li>
      </ul>
    </nav>
  );
}
