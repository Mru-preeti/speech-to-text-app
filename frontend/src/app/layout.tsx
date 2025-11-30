import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Speech to Text AI",
  description: "Real-time voice transcription",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative overflow-hidden`}
      >

        {/* Background Layer */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-br 
        from-[#1a103d] via-[#25144a] to-[#0f082c] animate-gradient"></div>

        {/* Particle Layer */}
        <div className="particles z-[-10]"></div>

        {/* Blobs */}
        <div className="absolute blur-3xl bg-purple-600/20 rounded-full 
        w-[500px] h-[500px] top-10 left-10 animate-bounce-slow"></div>

        <div className="absolute blur-3xl bg-pink-500/20 rounded-full
        w-[350px] h-[350px] bottom-10 right-10 animate-bounce-slower"></div>

        {children}
      </body>
    </html>
  );
}
