import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Toaster from './components/Toaster'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Roaster - Brutally Honest Resume Reviews",
  description: "Get your resume roasted with AI-powered humor and constructive feedback",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Toaster />
        <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          {children}
        </main>
      </body>
    </html>
  );
}
