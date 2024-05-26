import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "./Components/navbar";

const inter = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The All Countries",
  description: "Generated by Musab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
