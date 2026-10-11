"use client"
import Totalbalancebox from "@/components/Totalbalancebox";
import Header from "../../components/Header";
import { useState } from "react";
import { BankAccount } from "@/types/types";

const transactions = [
  { id: 1, name: "Spotify", amount: -15, status: "Processing", date: "Wed 1:00pm", category: "Subscriptions", brand: "green" },
  { id: 2, name: "Alexa Doe", amount: 88, status: "Success", date: "Wed 2:45am", category: "Deposit", brand: "green" },
  { id: 3, name: "Figma", amount: -18.99, status: "Processing", date: "Tue 6:10pm", category: "Income", brand: "green" },
  { id: 4, name: "Fresh & FV", amount: 88, status: "Success", date: "Tue 12:15pm", category: "Groceries", brand: "purple" },
  { id: 5, name: "Sam Sukel", amount: -40.20, status: "Declined", date: "Tue 5:40am", category: "Food", brand: "pink" },
];

const budgets = [
  { name: "Subscriptions", value: 85, left: 25, color: "bg-[#2f74ff]", tone: "bg-[#eaf2ff]", label: "text-[#2f74ff]" },
  { name: "Food and booze", value: 68, left: 12, color: "bg-[#ea5da8]", tone: "bg-[#fce8f3]", label: "text-[#ea5da8]" },
  { name: "Savings", value: 92, left: 50, color: "bg-[#0fbf7d]", tone: "bg-[#eafaf2]", label: "text-[#0fbf7d]" },
];



export default function Page() {
  const [totalBalance, setTotalBalance] = useState(234556);
  const [totalBanks, setTotalBanks] = useState(2);
  const [accounts, setAccounts] = useState<BankAccount[]>([ {
    id: "1",
    bankName: "Chase Bank",
    accountName: "Savings Account", 
    lastFour: "1234",
    balance: 2588.12,
    color: "blue",
    initials: "CB",
  },
  {
    id: "2",
    bankName: "Bank of America",
    accountName: "Checking Account",
    lastFour: "5678",
    balance: 1500.00,
    color: "green",
  initials: "BA",

  }

]);
  return (
    <div className="min-h-screen min-w-0 flex-1 bg-[#eef3f8]  text-slate-800">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1400px] overflow-hidden  border border-slate-200/70 bg-[#f4f7f9]  lg:min-h-[calc(100vh-3.5rem)]">
        

        <main className="flex-1 bg-[#f5f7fb] px-7 py-6">
          <div className="mb-8 flex items-start justify-between gap-5">
            <Header title="Welcome, Adrian" subtitle="Access &amp; manage your account and transactions efficiently." />
          </div>
          {/* Balance overview */}
         <Totalbalancebox totalbalance={totalBalance} totalbank={totalBanks} account={accounts} />
          {/* Recent transactions */}

          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[2.2rem] font-semibold tracking-[-0.06em] text-slate-800">Recent transactions</h2>
              <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">View all</button>
            </div>

            <div className="mb-4 flex gap-5 border-b border-slate-200 pb-2 text-base font-medium text-slate-500">
              {"Chase Bank"} {"Bank of America"} {"First Platinum Bank"}
            </div>

            <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between rounded-xl bg-[#eaf3ff] px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[1.15rem] font-bold text-sky-700 shadow-sm">CB</div>
                  <div>
                    <div className="text-[1.7rem] font-semibold text-[#2f74ff]">Chase Bank</div>
                    <div className="text-xl font-semibold text-slate-800">$2,588.12</div>
                  </div>
                </div>
                <span className="rounded-full bg-[#dff5e8] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#15803d]">savings</span>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-[#f7f9fb]">
                <div className="grid grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr_0.9fr] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-500">
                  <span>Transaction</span>
                  <span>Amount</span>
                  <span>Status</span>
                  <span>Date</span>
                  <span>Category</span>
                </div>

                {transactions.map((item) => (
                  <div key={item.id} className="grid grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr_0.9fr] items-center gap-3 border-b border-slate-200 px-4 py-4 text-sm last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-[0.7rem] font-bold text-slate-600">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-slate-700">{item.name}</span>
                    </div>
                    <span className={`font-semibold ${item.amount < 0 ? "text-red-500" : "text-emerald-600"}`}>
                      {item.amount < 0 ? "-$" : "+$"}{Math.abs(item.amount).toFixed(2)}
                    </span>
                    <span className={`inline-flex w-fit rounded-full border px-2.5 py-1 font-medium ${
                      item.status === "Success"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                        : item.status === "Processing"
                          ? "border-amber-200 bg-amber-50 text-amber-700"
                          : "border-red-200 bg-red-50 text-red-600"
                    }`}>{item.status}</span>
                    <span className="text-slate-500">{item.date}</span>
                    <span className={`inline-flex w-fit rounded-full border px-2.5 py-1 font-medium ${
                      item.category === "Subscriptions"
                        ? "border-sky-200 bg-sky-50 text-sky-600"
                        : item.category === "Groceries"
                          ? "border-violet-200 bg-violet-50 text-violet-600"
                          : item.category === "Food"
                            ? "border-pink-200 bg-pink-50 text-pink-600"
                            : "border-emerald-200 bg-emerald-50 text-emerald-600"
                    }`}>{item.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <aside className="w-[360px] border-l border-slate-200 bg-[#f3f7fb] p-6">
          <div className="mb-8 rounded-[32px] bg-gradient-to-r from-[#d0e6ff] via-[#d8d3ff] to-[#f6d0e5] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.7)]">
            <div className="flex h-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/70 text-3xl font-bold text-slate-700 shadow-lg">JS</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-[2.2rem] font-semibold tracking-[-0.06em] text-slate-800">Adrian Hajdin</h3>
            <div className="mt-2 text-lg text-slate-500">adrian@jsmastery.pro</div>
          </div>

          <div className="mb-5 flex items-center justify-between">
            <h4 className="text-2xl font-semibold tracking-[-0.05em] text-slate-800">My Banks</h4>
            <button className="text-base font-medium text-slate-700">＋ Add bank</button>
          </div>

          <div className="rounded-[26px] bg-gradient-to-r from-[#0f2f56] via-[#123d75] to-[#1ea3ff] p-5 text-white shadow-[0_18px_35px_rgba(17,82,147,0.35)]">
            <div className="mb-8 flex items-center justify-between">
              <div className="text-2xl font-bold">JS Mastery Pro.</div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                <div className="h-5 w-5 rounded-full bg-white/80" />
              </div>
            </div>
            <div className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-blue-100">ADRIAN HAJDIN</div>
            <div className="mb-4 text-2xl font-semibold tracking-[0.18em]">1234 1234 1234 1234</div>
            <div className="flex items-center justify-between">
              <div className="text-[0.7rem] tracking-[0.2em] text-blue-100">VALID THRU</div>
              <div className="text-[0.7rem] tracking-[0.2em] text-blue-100">06/24</div>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-5 flex items-center justify-between">
              <h4 className="text-2xl font-semibold tracking-[-0.05em] text-slate-800">My budgets</h4>
              <button className="text-xl text-slate-500">⋮</button>
            </div>

            <div className="space-y-5">
              {budgets.map((budget) => (
                <div key={budget.name} className={`rounded-[18px] border border-slate-200 bg-white p-4 shadow-sm ${budget.tone}`}>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${budget.color} text-lg text-white`}>
                        {budget.name === "Subscriptions" ? "◫" : budget.name === "Food and booze" ? "◧" : "◌"}
                      </div>
                      <span className="text-xl font-semibold text-slate-700">{budget.name}</span>
                    </div>
                    <span className={`text-xl font-semibold ${budget.label}`}>${budget.left} left</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/70">
                    <div className={`h-full rounded-full ${budget.color}`} style={{ width: `${budget.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
