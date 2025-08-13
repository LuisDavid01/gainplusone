import "~/styles/globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { type Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "GainOne+ - Transform Your Fitness Journey",
  description:
    "Personalized gym routines designed for your unique goals. Create custom workouts, track progress, and achieve your fitness dreams.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
    <html lang="en" className={`${inter.variable}`}>
      <body>{children}</body>
    </html>
    </ClerkProvider>
  );
}
