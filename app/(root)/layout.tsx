import Sidebar from "@/components/sidebar";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "BankApp",
  description: "Modern banking dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#eef3f8]">
      <Sidebar />
      {children}
    </div>
  );
}
