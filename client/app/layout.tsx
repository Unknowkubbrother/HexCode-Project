"use client";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import "./globals.css";
import { dark } from "@clerk/themes";
import Providers from "@/app/Providers";
import Loader from "@/components/ui/Loader";
import { Inter } from "next/font/google";
import { useState } from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<string>("dark");

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
              <Navbar setTheme={setTheme} />
              <Spotlight
                  className="-top-40 left-0 md:left-2/3 md:-top-20 fixed"
                  fill="#0ea5e9"
                />
                <Spotlight
                  className="-top-40 left-0 md:left-2/4 md:-top-20 fixed"
                  fill="#9c7cd6"
                />
                {children}
                <Footer />
            </ClerkLoaded>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
