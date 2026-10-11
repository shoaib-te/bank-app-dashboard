"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  CirclePlus,
  House,
  Landmark,
  LogOut,
  ReceiptText,
  Search,
} from "lucide-react";

const navigationItems = [
  { label: "Home", href: "/", icon: House },
  { label: "My Banks", href: "/my-banks", icon: Landmark },
  { label: "Transaction History", href: "/transactions", icon: ReceiptText },
  { label: "Payment Transfer", href: "/transfer", icon: ArrowLeftRight },
  { label: "Connect Bank", href: "/connect-bank", icon: CirclePlus },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="dashboard-sidebar flex min-h-screen w-[250px] shrink-0 flex-col justify-between border-r border-slate-200 bg-[#f5f7fa] px-4 py-6 max-md:w-[68px] max-md:px-2">
      <div>
        <Link
          href="/"
          className="mb-8 flex items-center gap-3 px-2 no-underline max-md:justify-center max-md:px-0"
          aria-label="Horizon home"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#7dd3fc] text-white shadow-sm">
            <Landmark aria-hidden="true" size={18} strokeWidth={2.2} />
          </span>
          <span className="text-[1.8rem] font-semibold tracking-[-0.06em] text-slate-800 max-md:hidden">
            Horizon
          </span>
        </Link>

        <label className="mb-6 flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 shadow-sm max-md:justify-center max-md:px-0">
          <Search aria-hidden="true" size={18} className="shrink-0 text-slate-400" />
          <input
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-500 max-md:hidden"
            type="search"
            placeholder="Search"
            aria-label="Search dashboard"
          />
        </label>

        <nav aria-label="Main navigation" className="space-y-2">
          {navigationItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                aria-current={active ? "page" : undefined}
                aria-label={label}
                title={label}
                className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors max-md:justify-center max-md:px-0 ${
                  active
                    ? "bg-[#2f74ff] text-white shadow-[0_10px_18px_rgba(47,116,255,0.2)]"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon aria-hidden="true" size={18} strokeWidth={1.8} className="shrink-0" />
                <span className="max-md:hidden">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white/90 p-2.5 shadow-sm max-md:justify-center max-md:border-0 max-md:bg-transparent max-md:p-0 max-md:shadow-none">
        <div className="flex min-w-0 items-center gap-2.5">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#d9edf9] via-[#e1d4ff] to-[#f5d6de] text-xs font-bold text-slate-700"
            aria-hidden="true"
          >
            JS
          </div>
          <div className="min-w-0 max-md:hidden">
            <div className="truncate text-sm font-semibold text-slate-700">Adrian Hajdin</div>
            <div className="truncate text-xs text-slate-500">adrian@jsmastery.pro</div>
          </div>
        </div>
        <Link
          href="/sign-in"
          aria-label="Sign out"
          title="Sign out"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 max-md:hidden"
        >
          <LogOut aria-hidden="true" size={17} />
        </Link>
      </div>
    </aside>
  );
}
