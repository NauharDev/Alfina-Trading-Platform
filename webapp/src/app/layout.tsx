"use client"; // Add this line

import type React from "react";
import { SiteHeader } from "../components/site-header";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
          <SiteHeader />
          <main className="flex-1 overflow-hidden">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
