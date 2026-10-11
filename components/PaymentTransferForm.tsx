"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, CreditCard, MoreVertical } from "lucide-react";
import { bankAccounts, formatCurrency } from "@/data/banking";

export default function PaymentTransferForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Transfer details are ready. Connect a payment provider to send funds.");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white px-5 sm:px-7">
      <div className="flex items-start justify-between border-b border-slate-200 py-5">
        <div>
          <h2 className="font-semibold text-slate-800">Transfer details</h2>
          <p className="mt-1 text-sm text-slate-500">Enter the details of the recipient</p>
        </div>
        <MoreVertical aria-hidden="true" size={18} className="text-slate-400" />
      </div>

      <div className="grid gap-4 border-b border-slate-200 py-5 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-6">
        <label htmlFor="transfer-source" className="text-sm font-medium text-slate-600">
          Select Source Bank
          <span className="mt-1 block text-xs font-normal text-slate-500">Select the bank account you want to transfer funds from</span>
        </label>
        <div className="relative">
          <CreditCard aria-hidden="true" size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#1684ff]" />
          <select id="transfer-source" required className="h-11 w-full appearance-none rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
            {bankAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.bankName} — {formatCurrency(account.balance)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 border-b border-slate-200 py-5 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-6">
        <label htmlFor="transfer-note" className="text-sm font-medium text-slate-600">
          Transfer Note (Optional)
          <span className="mt-1 block text-xs font-normal text-slate-500">Add information or instructions related to the transfer</span>
        </label>
        <textarea
          id="transfer-note"
          rows={3}
          placeholder="Add a note for the recipient"
          className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="border-b border-slate-200 py-5">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="font-semibold text-slate-800">Bank account details</h2>
            <p className="mt-1 text-sm text-slate-500">Enter the bank account details of the recipient</p>
          </div>
          <MoreVertical aria-hidden="true" size={18} className="text-slate-400" />
        </div>
        <div className="space-y-4">
          <label className="grid gap-2 text-sm font-medium text-slate-600 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center sm:gap-6">
            Recipient&apos;s Email Address
            <input type="email" required autoComplete="email" placeholder="name@example.com" className="h-11 min-w-0 rounded-lg border border-slate-300 px-3 text-sm font-normal text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-600 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center sm:gap-6">
            Recipient&apos;s Bank Account Number
            <input inputMode="numeric" autoComplete="off" required minLength={6} maxLength={17} pattern="[0-9]{6,17}" placeholder="Enter the account number" className="h-11 min-w-0 rounded-lg border border-slate-300 px-3 text-sm font-normal text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-600 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center sm:gap-6">
            Amount
            <span className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input type="number" required min="0.01" step="0.01" placeholder="0.00" className="h-11 w-full rounded-lg border border-slate-300 pl-7 pr-3 text-sm font-normal text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
            </span>
          </label>
        </div>
      </div>

      <div className="py-4">
        <button type="submit" className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#087bfa] to-[#478eff] text-sm font-semibold text-white transition hover:brightness-105">
          Transfer Funds
        </button>
        {message && (
          <p role="status" className="mt-3 flex items-start gap-2 text-sm text-emerald-700">
            <CheckCircle2 size={17} className="mt-0.5 shrink-0" /> {message}
          </p>
        )}
      </div>
    </form>
  );
}
