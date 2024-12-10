import type { Metadata } from "next";
import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs'
import { QueryProvider } from "@/components";
import { StoreProvider, StoreSetupProvider } from "@/redux";


export const metadata: Metadata = {
  title: "NotionLite",
  description: "Create your notes with lite version of Notion app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <StoreProvider>
          <QueryProvider>
            <body>
              <StoreSetupProvider>
                {children}
              </StoreSetupProvider>
            </body>
          </QueryProvider>
        </StoreProvider>
      </html>
    </ClerkProvider>
  );
}
