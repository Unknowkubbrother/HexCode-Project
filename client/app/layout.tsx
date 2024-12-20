"use client";

import {
  ClerkProvider,
  // SignedIn,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Loader from "@/components/ui/Loader";

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
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        variables: { colorPrimary: "#2887c7" },
      }}
    >
      <html lang="en" data-theme={theme}>
        <head>
          <link rel="icon" href="/logo.svg" type="image/svg" sizes="32x32" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>HEXCODE</title>
        </head>
        <body className={inter.className}>
          <ClerkLoading>
            <Loader/>
          </ClerkLoading>
          <ClerkLoaded>
            <Navbar setTheme={setTheme} theme={theme} />
            {children}
          </ClerkLoaded>
          {/* <SignedIn>
          <main className="mt-3">{children}</main>
        </SignedIn> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
