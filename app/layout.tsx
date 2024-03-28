import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import NextBreadcrumb from "@/components/Breadcrumb";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studio Ghibli",
  description: "Studio Ghibli",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Navigation/>
        <NextBreadcrumb
          homeElement={'Home'}
          separator={<span> | </span>}
          activeClasses='text-sky-400'
          containerClasses='flex py-5' 
          listClasses='hover:underline mx-2 font-bold'
          capitalizeLinks
        /> 
        {children}
        </body>
    </html>
  );
}
