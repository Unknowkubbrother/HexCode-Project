import { Inter } from "next/font/google";
import './globals.css';
import Navbar from '@/components/ui/Navbar';

const inter = Inter({subsets: ['latin']});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <header>
            <Navbar />
          </header>
          <main>
            {children}
          </main>
        </body>
      </html>
  );
}
