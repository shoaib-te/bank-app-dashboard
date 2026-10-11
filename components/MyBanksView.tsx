import { MoreVertical } from "lucide-react";
import { bankCards } from "@/data/banking";
import BankCard from "@/components/BankCard";

export default function MyBanksView() {
  return (
    <main className="min-h-screen min-w-0 flex-1 bg-white px-5 py-6 text-slate-800 sm:px-8 sm:py-7">
      <div className="mx-auto w-full max-w-[1400px]">
        <header className="mb-8 border-l-2 border-[#2f83ff] pl-4">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl">
            My Bank Accounts
          </h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Effortlessly Manage Your Banking Activities
          </p>
        </header>

        <section aria-labelledby="your-cards-title">
          <div className="mb-4 flex items-center justify-between">
            <h2 id="your-cards-title" className="text-sm font-semibold text-slate-800">
              Your cards
            </h2>
            <button
              type="button"
              aria-label="More card options"
              className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <MoreVertical aria-hidden="true" size={17} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-6 min-[520px]:grid-cols-2 min-[900px]:grid-cols-3">
            {bankCards.map((account) => (
              <BankCard
                key={account.id}
                account={account}
                compact
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
