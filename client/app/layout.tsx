"use client";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Providers from "@/app/Providers";
import Loader from "@/components/ui/Loader";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
const inter = Inter({ subsets: ["latin"] });
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [theme, setTheme] = useState<string>("dark")


  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme == "dark" ? dark : undefined,
        variables: { colorPrimary: "#2887c7" },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.svg" type="image/svg" sizes="32x32" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>HEXCODE</title>
        </head>
        <body className={inter.className}>
          <Providers>
            <ClerkLoading>
              <Loader />
            </ClerkLoading>
            <ClerkLoaded>
              <Navbar setTheme={setTheme}/>
              <main className="mt-2 w-full h-screen">
              {children}
              </main>
            </ClerkLoaded>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
