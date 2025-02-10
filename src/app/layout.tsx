import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/footer";
import WhatsappLive from "@/components/whatsapp-live";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gastroteca | Home",
  description: "Gastroteca Restaurante Cava",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Header /> {children}
          <Footer />
          <WhatsappLive />
        </SessionProvider>
      </body>
    </html>
  );
}
