"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Script from "next/script";
import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      
      <body className={inter.className}>
          <Navbar />
          {children}
       
      </body>
    </html>
  );
}
