import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BaseLayoutClient from "@/components/baseLayoutClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "eduworld-leads",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <BaseLayoutClient />
      </body>
    </html>
  );
}
