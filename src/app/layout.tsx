import type { Metadata } from "next";
import "./globals.css";
import './styles/main.scss';

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Org Chart",
  description: "Organization Chart Application",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className={`${inter.variable}`}>
      <Providers>
        <div className="flex h-screen ">
          <Sidebar />
          <div className="flex flex-col flex-1 w-[100%] overflow-x-hidden">
            <Header />
            <main className="flex-1 md:p-10 px-3 bg-[#F7F7F7] overflow-x-hidden">
              {children}
            </main>
          </div>
        </div>
        </Providers>
      </body>
    </html>
  );
}