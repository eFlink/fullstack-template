import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Sidebar from "./sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Jade Finance",
  description: "Developed by Jade Finance",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en h-full bg-gray-50">
      <body className={`h-full font-sans bg-gray-50 ${inter.variable}`}>
        <TRPCReactProvider>
          <Sidebar>
            {children}
          </Sidebar>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
