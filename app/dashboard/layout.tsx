import SideNavbar from "@/components/ux/Sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Questana Admin Panel",
  description: "Auth : Heryad S. Mahmood",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex-row flex">
          <SideNavbar />
          <main className="w-screen p-5">
          {children}
          </main>
        </div>
      </body>
    </html>
  );
}
