import Link from "next/link";
import { ArrowLeft, Building2, ShieldCheck } from "lucide-react";

export default function ConnectBankInfo() {
  return (
    <main className="min-h-screen min-w-0 flex-1 bg-[#fbfcfe] p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-4xl">
        <Link href="/my-banks" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800">
          <ArrowLeft aria-hidden="true" size={16} /> Back to my banks
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Connect a bank</h1>
        <p className="mt-2 text-slate-500">Securely link a financial account to view it in your dashboard.</p>
        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mx-auto flex max-w-lg flex-col items-center py-8 text-center">
            <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-[#2f74ff]">
              <Building2 aria-hidden="true" size={26} />
            </span>
            <h2 className="text-lg font-semibold">Bank linking isn’t configured yet</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Connect a banking provider to securely search for and authorize your bank. No account credentials are collected by this demo.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
              <ShieldCheck aria-hidden="true" size={16} />
              Your banking credentials should only be handled by a trusted provider.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
