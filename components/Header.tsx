import type { HeaderProps } from "@/types/types";

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="mb-7">
      <h1 className="text-[2.2rem] font-semibold tracking-[-0.04em] text-slate-800">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-2 text-base text-slate-500">{subtitle}</p>
      ) : null}
    </div>
  );
}
