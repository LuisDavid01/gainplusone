import "~/styles/globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { dark } from "@clerk/themes";
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
    <ClerkProvider
    appearance={{
        baseTheme: dark,
        variables:{
          colorBackground: "#000",
          colorInput: "#121212",
          colorInputForeground: "white",
          colorMutedForeground: "#fff",
          colorPrimary: "#e25c22"
        }
    }}
    >
    <html lang="en" className={`${inter.variable}`}>
      <body>{children}</body>
    </html>
    </ClerkProvider>
  );
}
