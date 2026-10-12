'use client'
import { TotalBalanceBoxProps } from "@/types/types";
import { Plus } from "lucide-react";
import CountUp from 'react-countup';
import Chart from "./Chart";
function Totalbalancebox({ account = [], totalbalance, totalbank }: TotalBalanceBoxProps) {

  return (
    <div className="mb-8 flex items-center justify-between rounded-[22px] border border-slate-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex items-center h-30 gap-5">
        
        {/* chart  */}
        <Chart account={account} />
        <div>
          <div className="flex items-center gap-2 text-xl font-semibold text-slate-800">
            {totalbank} Bank Accounts
          </div>
          <div className="mt-2 text-slate-500">Total Current Balance</div>
          <div className="mt-2 text-4xl font-semibold tracking-[-0.06em] text-slate-800">
            {/* animated count */}
            <CountUp
              start={0}
              end={totalbalance}
              duration={2}
              separator=","
              prefix="$"
              suffix=" USD"
            />
          </div>
        </div>
      </div>
      <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-700 shadow-sm">
        <Plus aria-hidden="true" size={18} />
        Add bank
      </button>
    </div>
  )
}

export default Totalbalancebox