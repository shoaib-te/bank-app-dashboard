import Header from "@/components/Header";
import type { DashboardSectionProps } from "@/types/types";

export default function DashboardSection({
  icon: Icon,
  title,
  subtitle,
  emptyTitle,
  emptyDescription,
}: DashboardSectionProps) {
  return (
    <main className="min-h-screen min-w-0 flex-1 bg-[#eef3f8] p-4 text-slate-800 lg:p-7">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1400px] flex-col rounded-[28px] border border-slate-200/70 bg-[#f5f7fb] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8 lg:min-h-[calc(100vh-3.5rem)] lg:p-10">
        <Header title={title} subtitle={subtitle} />
        <section className="flex flex-1 items-center justify-center rounded-[20px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="max-w-md">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#2f74ff]">
              <Icon aria-hidden="true" size={26} strokeWidth={1.8} />
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-800">
              {emptyTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {emptyDescription}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
