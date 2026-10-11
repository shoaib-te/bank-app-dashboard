import type { Metadata } from "next";
import TransactionHistoryView from "@/components/TransactionHistoryView";

export const metadata: Metadata = {
  title: "Transaction History | BankApp",
};

export default function TransactionsPage() {
  return <TransactionHistoryView />;
}
