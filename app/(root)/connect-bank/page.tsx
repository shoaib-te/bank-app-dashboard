import type { Metadata } from "next";
import ConnectBankInfo from "@/components/ConnectBankInfo";

export const metadata: Metadata = {
  title: "Connect Bank | BankApp",
};

export default function ConnectBankPage() {
  return <ConnectBankInfo />;
}
