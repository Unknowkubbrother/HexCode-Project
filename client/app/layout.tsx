"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState("dark");

  return (
    <html lang="en" data-theme={theme}>
      <head>
          <link rel="icon" href="/logo.svg" type="image/svg" sizes="32x32" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HEXCODE</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
          integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        <header>
          <Navbar setTheme={setTheme} theme={theme} />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
