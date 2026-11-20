"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  Building2,
  CheckCircle2,
  CloudLightning,
  GraduationCap,
  HeartPulse,
  LifeBuoy,
  ShoppingCart,
  X,
  type LucideIcon,
} from "lucide-react";
import { programs } from "@/lib/programs";
import { getNeed } from "@/lib/needs";

const icons: Record<string, LucideIcon> = {
  housing: Building2,
  food: ShoppingCart,
  education: GraduationCap,
  health: HeartPulse,
  disability: Accessibility,
  disaster: CloudLightning,
  other: LifeBuoy,
};

type Props = {
  /** Validated 5-digit ZIP carried through to the application form. */
  zip?: string;
};

export default function ProgramGrid({ zip }: Props) {
  // The details modal only opens when someone clicks "View program details".
  const [openId, setOpenId] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = programs.find((p) => p.id === openId) ?? null;

  const applyHref = (id: string) => `/apply?need=${id}${zip ? `&zip=${zip}` : ""}`;

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openId]);

  const ready = open ? getNeed(open.id)?.ready ?? [] : [];

  return (
    <>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((p) => {
          const Icon = icons[p.id] ?? LifeBuoy;
          return (
            <article
              key={p.id}
              id={p.id}
              className="flex scroll-mt-28 flex-col rounded-2xl border border-ink/5 bg-white p-7 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-cream text-burnt-dark">
                  <Icon size={26} />
                </span>
                <span className="rounded-sm border border-burnt/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-burnt-dark">
                  {p.tag}
                </span>
              </div>

              <h3 className="mt-6 font-serif text-2xl font-semibold text-ink">{p.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink/70">{p.tagline}</p>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-ink/10 pt-6">
                <button
                  type="button"
                  onClick={() => setOpenId(p.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition duration-200 hover:bg-ink-700"
                >
                  View program details <ArrowRight size={14} />
                </button>
                <Link
                  href={applyHref(p.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-burnt px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-ink-900 transition duration-200 hover:-translate-y-0.5 hover:bg-burnt-light hover:shadow-lg hover:shadow-burnt/40"
                >
                  Apply <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/70 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenId(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="program-dialog-title"
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-burnt/50 bg-white p-7 shadow-2xl sm:p-10"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpenId(null)}
              aria-label="Close details"
              className="absolute right-4 top-4 rounded-full p-2 text-ink transition hover:bg-ink/5"
            >
              <X size={22} />
            </button>

            <span className="inline-block rounded-sm bg-ink px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-burnt-light">
              {open.tag}
            </span>
            <h2
              id="program-dialog-title"
              className="mt-5 pr-8 font-serif text-3xl font-bold text-ink sm:text-4xl"
            >
              {open.title}
            </h2>

            <h3 className="mt-6 font-serif text-sm font-bold uppercase tracking-[0.15em] text-burnt-dark">
              What we cover
            </h3>
            <p className="mt-3 leading-relaxed text-ink/75">{open.text}</p>
            <p className="mt-4 leading-relaxed text-ink/75">
              Tell us about your situation and a member of our team will reach out to talk through next steps.
            </p>

            {ready.length > 0 && (
              <>
                <h3 className="mt-6 font-serif text-sm font-bold uppercase tracking-[0.15em] text-burnt-dark">
                  Helpful to have ready
                </h3>
                <ul className="mt-3 space-y-2">
                  {ready.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink/80">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-burnt" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-ink/50">Don't have everything? Apply anyway.</p>
              </>
            )}

            <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-ink/10 pt-6">
              <Link
                href={applyHref(open.id)}
                className="inline-flex items-center gap-2 rounded-full bg-burnt px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-ink-900 transition duration-200 hover:-translate-y-0.5 hover:bg-burnt-light hover:shadow-lg hover:shadow-burnt/40"
              >
                Apply for assistance <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                onClick={() => setOpenId(null)}
                className="rounded-full border border-ink px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-ink transition hover:bg-ink/5"
              >
                Close details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
