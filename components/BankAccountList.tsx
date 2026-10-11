import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { bankAccounts, formatCurrency } from "@/data/banking";

export default function BankAccountList() {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {bankAccounts.map((account, index) => (
        <div
          className="flex min-h-[82px] items-center gap-4 border-b border-slate-200 px-5 py-4 last:border-b-0"
          key={account.id}
        >
          <div
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-sm font-semibold text-white ${
              account.color === "blue"
                ? "bg-blue-500"
                : account.color === "green"
                  ? "bg-emerald-600"
                  : account.color === "pink"
                    ? "bg-pink-500"
                    : "bg-violet-500"
            }`}
          >
            {account.initials}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-slate-700">
              {index === 0 ? account.accountName : account.bankName}
            </h3>
            <p className="text-sm font-medium text-[#147dff]">
              {formatCurrency(account.balance)}
            </p>
          </div>
          {index === 0 && (
            <Check aria-label="Selected account" className="text-[#2f83ff]" size={22} />
          )}
        </div>
      ))}
      <Link
        href="/connect-bank"
        className="flex min-h-[58px] items-center gap-3 px-5 font-medium text-slate-700 transition-colors hover:bg-slate-50"
      >
        <Plus aria-hidden="true" size={20} />
        Add new bank
        <span className="ml-auto text-xs text-slate-400">⌘ +</span>
      </Link>
    </section>
  );
}
