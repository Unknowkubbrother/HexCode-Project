"use client";
import React from "react";
import { ModeToggle } from "@/components/ui/ModeToggle";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useEffect } from "react";

interface NavbarProps {
  setTheme: (theme: string) => void;
}

export default function Navbar({ setTheme }: NavbarProps) {
  const { theme } = useTheme();

  useEffect(() => {
    setTheme(theme || "dark");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <nav className="w-full h-[50px] flex justify-around items-center border-b-2 bg-bgprimary py-7 top-0 z-50 sticky backdrop-blur text-navtextcolor">
      <Link href="/" className="flex justify-center items-center gap-3">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <span className="text-lg font-bold drop-shadow-lg">
          <span>HEX</span>
          <span className="text-primary">CODE</span>
        </span>
      </Link>
      <ul className="flex justify-center items-center gap-5 text-md font-semibold">
        <Link href="/" className="hover:text-primary duration-300">
          Home
        </Link>

        <Link href="/problems" className="hover:text-primary duration-300">
          Problems
        </Link>

        <Link href="/challenges" className="hover:text-primary duration-300">
          Challenges
        </Link>

        <SignedIn>
          <Link href="/dashboard" className="hover:text-primary duration-300">
            Dashboard
          </Link>
        </SignedIn>

        <ModeToggle />

        <li>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <span className="hover:text-primary duration-300">
              <SignInButton />
            </span>
          </SignedOut>
        </li>
      </ul>
    </nav>
  );
}
