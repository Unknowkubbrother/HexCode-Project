import {
  ClerkProvider,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider"
import Loader from "@/components/ui/Loader";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
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
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <ClerkLoading>
            <Loader/>
          </ClerkLoading>
          <ClerkLoaded>
            <Navbar/>
            {children}
          </ClerkLoaded>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
