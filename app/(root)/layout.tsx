import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "BankApp",
  description: "Modern banking dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
