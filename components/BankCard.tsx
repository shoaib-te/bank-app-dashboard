import { CreditCard } from "lucide-react";
import { formatCurrency } from "@/data/banking";
import type { BankCardProps } from "@/types/types";

const cardColors = {
  blue: "from-[#087cf0] to-[#2563eb]",
  green: "from-[#079b5b] to-[#0aa35e]",
  purple: "from-[#7652d8] to-[#8b5be0]",
  pink: "from-[#d7479a] to-[#e155a2]",
};

export default function BankCard({ account, compact = false }: BankCardProps) {
  if (compact) {
    return (
      <article className="min-w-0">
        <div
          className={`bank-visual-card relative flex aspect-[1.62/1] min-h-[86px] flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br ${cardColors[account.color]} p-2.5 text-white shadow-md sm:p-3`}
        >
          <div className="bank-card-waves" aria-hidden="true" />
          <div className="relative flex min-w-0 items-start justify-between gap-2">
            <p className="truncate text-[10px] font-semibold leading-tight sm:text-xs">
              {account.bankName}
            </p>
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white/20">
              <CreditCard aria-hidden="true" size={13} />
            </span>
          </div>
          <div className="relative flex items-end justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[6px] font-medium tracking-wide text-white/90 sm:text-[7px]">
                {account.cardholder ?? "ADRIAN HAJDIN"}
              </p>
              <p className="mt-1 text-[7px] tracking-[0.13em] sm:text-[8px]">
                1234 1234 1234 {account.lastFour}
              </p>
            </div>
            <div className="flex shrink-0 items-center pr-1">
              <span className="h-3 w-3 rounded-full bg-red-500/95" />
              <span className="-ml-1.5 h-3 w-3 rounded-full bg-amber-400/95" />
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="mb-1 flex items-center justify-between gap-2 text-[8px] text-slate-600 sm:text-[9px]">
            <span>Spending this month</span>
            <span>{formatCurrency(account.balance)}</span>
          </div>
          <div
            className="h-1 overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-label={`${account.bankName} monthly spending`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={account.spendingPercent ?? 58}
          >
            <div
              className={`h-full rounded-full ${account.color === "blue" ? "bg-[#3485ff]" : "bg-[#633cff]"}`}
              style={{ width: `${account.spendingPercent ?? 58}%` }}
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`relative flex min-h-[170px] items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r ${cardColors[account.color]} p-6 text-white shadow-sm sm:p-7`}
    >
      <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full border border-white/10" />
      <div className="absolute -right-1 -top-8 h-44 w-44 rounded-full border border-white/10" />
      <div className="relative min-w-0">
        <p className="truncate text-xl font-semibold sm:text-2xl">
          {account.bankName}
        </p>
        <p className="mt-1 truncate text-sm text-white/85 sm:text-base">
          {account.accountName}
        </p>
        <p className="mt-3 flex items-center gap-1 text-sm tracking-[0.16em] text-white/95">
          <span aria-label={`Account ending in ${account.lastFour}`}>
            •••• •••• ••••
          </span>
          <span className="tracking-normal">{account.lastFour}</span>
        </p>
      </div>
      <div className="relative ml-4 flex shrink-0 items-center gap-3">
        {!compact && (
          <CreditCard aria-hidden="true" className="hidden text-white/80 sm:block" size={25} />
        )}
        <div className="rounded-lg border border-white/35 bg-white/25 px-3 py-2.5 backdrop-blur-sm sm:px-4">
          <p className="text-xs text-white/85">Current Balance</p>
          <p className="mt-1 text-lg font-semibold sm:text-2xl">
            {formatCurrency(account.balance)}
          </p>
        </div>
      </div>
    </article>
  );
}
