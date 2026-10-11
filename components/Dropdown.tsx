"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import { Check, ChevronDown, Plus } from "lucide-react";
import type { DropdownProps } from "@/types/types";

export default function Dropdown({
  ariaLabel,
  icon: Icon,
  options,
  value,
  onChange,
  className = "",
  menuClassName = "",
  action,
  size = "default",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.findIndex((option) => option.value === value)),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) setOpen(true);
      setActiveIndex((current) =>
        event.key === "ArrowDown"
          ? (current + 1) % options.length
          : (current - 1 + options.length) % options.length,
      );
      return;
    }

    if (event.key === "Enter" && open) {
      event.preventDefault();
      const option = options[activeIndex];
      if (option) onChange(option.value);
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setActiveIndex(Math.max(0, options.findIndex((option) => option.value === value)));
          setOpen((current) => !current);
        }}
        onKeyDown={handleKeyDown}
        className="inline-flex h-10 w-full min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 shadow-sm outline-none transition hover:border-blue-300 focus-visible:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-100"
      >
        <Icon aria-hidden="true" size={17} className="shrink-0 text-[#2f74ff]" />
        <span className="min-w-0 flex-1 truncate text-left">{selected?.label}</span>
        <ChevronDown
          aria-hidden="true"
          size={15}
          className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className={`absolute right-0 top-[calc(100%+6px)] z-50 min-w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.14)] ${menuClassName}`}>
          <div
            role="listbox"
            aria-label={ariaLabel}
            className={size === "medium" ? "max-h-[min(60vh,360px)] overflow-y-auto" : "max-h-[min(60vh,380px)] overflow-y-auto"}
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isActive = index === activeIndex;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-4 border-b border-slate-200 text-left transition-colors ${
                    size === "medium"
                      ? "min-h-[78px] px-4 py-3 sm:min-h-[88px] sm:gap-4 sm:px-5"
                      : "min-h-[112px] px-4 py-4 sm:min-h-[150px] sm:gap-6 sm:px-8"
                  } ${
                    isSelected
                      ? "bg-blue-50/40"
                      : isActive
                        ? "bg-slate-50"
                        : "bg-white hover:bg-slate-50"
                  }`}
                >
                  {option.initials && (
                    <span
                      aria-hidden="true"
                      className={`grid shrink-0 place-items-center rounded-full font-medium text-white ${
                        size === "medium"
                          ? "h-11 w-11 text-sm sm:h-12 sm:w-12 sm:text-base"
                          : "h-14 w-14 text-lg sm:h-20 sm:w-20 sm:text-3xl"
                      } ${option.avatarClassName ?? "bg-blue-500"}`}
                    >
                      {option.initials}
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate ${
                      size === "medium" ? "text-sm sm:text-base" : "text-base sm:text-3xl"
                    } ${isSelected ? "font-semibold text-slate-700" : "font-medium text-slate-700"}`}>
                      {option.menuLabel ?? option.label}
                    </span>
                    {option.detail && (
                      <span className="mt-0.5 block truncate text-xs text-slate-500">
                        {option.detail}
                      </span>
                    )}
                    {option.balance && (
                      <span className={`mt-0.5 block font-medium text-[#1684ff] ${
                        size === "medium" ? "text-sm sm:text-base" : "text-base sm:text-2xl"
                      }`}>
                        {option.balance}
                      </span>
                    )}
                  </span>
                  {isSelected && (
                    <Check
                      aria-label="Selected account"
                      size={size === "medium" ? 20 : 26}
                      className={`shrink-0 text-[#3185ff] ${size === "medium" ? "sm:size-6" : "sm:size-10"}`}
                    />
                  )}
                </button>
              );
            })}
          </div>
          {action && (
            <Link
              href={action.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 font-medium text-slate-700 transition-colors hover:bg-slate-50 ${
                size === "medium"
                  ? "min-h-[58px] text-sm sm:min-h-[64px] sm:px-5 sm:text-base"
                  : "min-h-[76px] text-base sm:min-h-[100px] sm:gap-5 sm:px-8 sm:text-2xl"
              }`}
            >
              <Plus
                aria-hidden="true"
                size={size === "medium" ? 20 : 26}
                className={`shrink-0 ${size === "medium" ? "sm:size-6" : "sm:size-9"}`}
              />
              <span>{action.label}</span>
              {action.hint && (
                <span className={`ml-auto font-normal text-slate-500 ${size === "medium" ? "text-xs sm:text-sm" : "text-sm sm:text-xl"}`}>{action.hint}</span>
              )}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
