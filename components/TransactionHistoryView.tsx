"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { bankAccounts, formatCurrency } from "@/data/banking";
import BankCard from "@/components/BankCard";
import TransactionTable from "@/components/TransactionTable";
import Dropdown from "@/components/Dropdown";

const accountAvatarColors = {
  blue: "bg-[#1678f8]",
  green: "bg-[#08a05b]",
  purple: "bg-[#8057df]",
  pink: "bg-[#dc4a9b]",
};

export default function TransactionHistoryView() {
  const [accountId, setAccountId] = useState(bankAccounts[0].id);
  const account = bankAccounts.find((item) => item.id === accountId) ?? bankAccounts[0];

  return (
    <main className="min-h-screen min-w-0 flex-1 bg-[#fbfcfe] p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl">
              Transaction history
            </h1>
            <p className="mt-1.5 text-sm text-slate-500 sm:text-base">
              Gain Insights and Track Your Transactions Over Time
            </p>
          </div>
          <Dropdown
            ariaLabel="Select account"
            icon={CreditCard}
            className="w-[200px] max-w-full"
            menuClassName="w-[min(440px,calc(100vw-2rem))]"
            size="medium"
            value={accountId}
            onChange={setAccountId}
            action={{
              href: "/connect-bank",
              label: "Add new bank",
              hint: "⌘ +",
            }}
            options={[...bankAccounts]
              .sort((left, right) => {
                const order = ["america", "chase", "platypus"];
                return order.indexOf(left.id) - order.indexOf(right.id);
              })
              .map((item) => ({
                label: item.bankName,
                menuLabel: item.id === "chase" ? item.accountName : item.bankName,
                value: item.id,
                initials: item.initials,
                avatarClassName: accountAvatarColors[item.color],
                balance: formatCurrency(item.balance),
              }))}
          />
        </div>

        <div className="mb-7">
          <BankCard account={account} />
        </div>
        <div className="rounded-xl bg-white">
          <TransactionTable />
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Available balance: {formatCurrency(account.balance)}
        </p>
      </div>
    </main>
  );
}
