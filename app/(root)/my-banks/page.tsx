import type { Metadata } from "next";
import MyBanksView from "@/components/MyBanksView";

export const metadata: Metadata = {
  title: "My Banks | BankApp",
};

export default function MyBanksPage() {
  return <MyBanksView />;
}
