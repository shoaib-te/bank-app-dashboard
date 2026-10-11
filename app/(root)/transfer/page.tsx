import type { Metadata } from "next";
import PaymentTransferForm from "@/components/PaymentTransferForm";

export const metadata: Metadata = {
  title: "Payment Transfer | BankApp",
};

export default function TransferPage() {
  return (
    <main className="min-h-screen min-w-0 flex-1 bg-[#fbfcfe] p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1100px] rounded-xl bg-[#fcfcfd] p-0 sm:p-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Payment Transfer
        </h1>
        <p className="mt-1.5 mb-5 text-sm text-slate-500 sm:text-base">
          Please provide any specific details or notes related to the payment transfer
        </p>
        <PaymentTransferForm />
      </div>
    </main>
  );
}
