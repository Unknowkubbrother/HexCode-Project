"use client";
import React from "react";
import SwitchTheme from "@/components/ui/SwitchTheme";
import Image from "next/image";
import Link from "next/link";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

interface NavbarProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export default function Navbar({ setTheme, theme }: NavbarProps) {
  return (
    <nav className="w-full h-[50px] flex justify-around items-center border-b-2 bg-bgprimary py-7 top-0 z-50 sticky backdrop-blur navbar-theme">
      <Link href="/" className="flex justify-center items-center gap-3">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <span className="text-lg font-bold drop-shadow-lg">
          HEX
          <span className="text-primary">CODE</span>
        </span>
      </Link>
      <ul className="flex justify-center items-center gap-5 text-md font-semibold">
        <li>
          <Link href="/" className="hover:text-primary duration-300">
            Home
          </Link>
        </li>
        <li>
          <Link href="/problem" className="hover:text-primary duration-300">
            Problems
          </Link>
        </li>
        <li>
          <Link href="/challenges" className="hover:text-primary duration-300">
            Challenges
          </Link>
        </li>
        <li>
          <Link href="/docs" className="hover:text-primary duration-300">
            Dashboard
          </Link>
        </li>
        <li>
          <SwitchTheme
            setTheme={setTheme}
            theme={theme}
            className="hover:text-primary duration-300"
          />
        </li>
        <li>
          <SignedIn>
            <UserButton/>
          </SignedIn>
          <SignedOut>
            <div className="flex gap-3">
              <span className="hover:text-primary duration-300"><SignUpButton mode="modal" /></span>
              <span className="hover:text-primary duration-300"><SignInButton mode="modal"/></span>
            </div>
          </SignedOut>
        </li>
      </ul>
    </nav>
  );
}
