"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Filter } from "lucide-react";
import { transactions, formatCurrency } from "@/data/banking";
import Dropdown from "@/components/Dropdown";

const pageSize = 6;

export default function TransactionTable() {
  const [category, setCategory] = useState("All categories");
  const [page, setPage] = useState(1);
  const categories = Array.from(new Set(transactions.map((transaction) => transaction.category)));
  const filtered = useMemo(
    () => transactions.filter((transaction) => category === "All categories" || transaction.category === category),
    [category],
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleTransactions = filtered.slice((page - 1) * pageSize, page * pageSize);

  function changeCategory(value: string) {
    setCategory(value);
    setPage(1);
  }

  return (
    <section className="min-w-0">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-800">Transaction history</h2>
        <Dropdown
          ariaLabel="Filter transactions by category"
          icon={Filter}
          className="w-[190px] max-w-full"
          value={category}
          onChange={changeCategory}
          options={[
            { label: "All categories", value: "All categories" },
            ...categories.map((item) => ({ label: item, value: item })),
          ]}
        />
      </div>

      <div className="overflow-x-auto rounded-t-xl">
        <table className="w-full min-w-[700px] border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs font-medium text-slate-500">
            <tr>
              <th className="px-3 py-3 font-medium">Transaction</th>
              <th className="px-3 py-3 font-medium">Amount</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-3 py-3 font-medium">Date</th>
              <th className="px-3 py-3 font-medium">Category</th>
            </tr>
          </thead>
          <tbody>
            {visibleTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className={`border-t border-slate-100 ${
                  transaction.status === "Success"
                    ? "bg-[#f4fcf8]"
                    : transaction.status === "Declined"
                      ? "bg-[#fffafa]"
                      : "bg-white"
                }`}
              >
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3 font-medium text-slate-700">
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white ${transaction.avatarColor}`}>
                      {transaction.initials}
                    </span>
                    {transaction.name}
                  </div>
                </td>
                <td className={`whitespace-nowrap px-3 py-3 font-semibold ${transaction.amount < 0 ? "text-red-500" : "text-emerald-600"}`}>
                  {transaction.amount < 0 ? "- " : "+ "}{formatCurrency(Math.abs(transaction.amount))}
                </td>
                <td className="px-3 py-3">
                  <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
                    transaction.status === "Success"
                      ? "bg-emerald-50 text-emerald-700"
                      : transaction.status === "Declined"
                        ? "bg-red-50 text-red-600"
                        : "bg-slate-100 text-slate-600"
                  }`}>
                    <span className="mr-1">●</span>{transaction.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-slate-500">{transaction.date}</td>
                <td className="px-3 py-3">
                  <span className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${
                    transaction.category === "Food and dining"
                      ? "border-pink-400 text-pink-600"
                      : transaction.category === "Deposit" || transaction.category === "Income"
                        ? "border-emerald-500 text-emerald-700"
                        : "border-blue-400 text-blue-600"
                  }`}>
                    {transaction.category}
                  </span>
                </td>
              </tr>
            ))}
            {visibleTransactions.length === 0 && (
              <tr>
                <td colSpan={5} className="bg-white px-4 py-12 text-center text-slate-500">
                  No transactions match this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <nav aria-label="Transaction pages" className="flex items-center justify-between gap-3 border-t border-slate-100 bg-white px-3 py-3 text-xs font-medium text-slate-500">
        <button
          className="inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
          type="button"
          disabled={page === 1}
          onClick={() => setPage((current) => Math.max(1, current - 1))}
        >
          <ArrowLeft size={15} /> Previous
        </button>
        <span>Page {page} of {pageCount}</span>
        <button
          className="inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
          type="button"
          disabled={page === pageCount}
          onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
        >
          Next <ArrowRight size={15} />
        </button>
      </nav>
    </section>
  );
}
