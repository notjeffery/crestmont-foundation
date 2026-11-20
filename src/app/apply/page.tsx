import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntakeForm from "@/components/IntakeForm";
import { getNeed } from "@/lib/needs";
import { images } from "@/lib/images";

export const metadata: Metadata = { title: "Apply for Help | Crestmont Foundation" };

export default function ApplyPage({
  searchParams,
}: {
  searchParams: { zip?: string; need?: string };
}) {
  const zip = /^\d{5}$/.test(searchParams.zip ?? "") ? (searchParams.zip as string) : "";
  const need = getNeed(searchParams.need);
  const readyList = (need ?? getNeed("other")!).ready;

  return (
    <>
      <Header solid />
      <main>
        <section className="relative overflow-hidden bg-ink-900 pb-20 pt-40 text-white">
          <Image
            src={images.helpBg}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/80 via-ink-900/60 to-ink-900/85" />

          <div className="relative mx-auto max-w-7xl px-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-burnt">Apply</p>
            <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl md:text-6xl">
              We're here to help.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              {need && zip
                ? `Support for ${need.label.toLowerCase()} near ${zip}. Tell us a bit about your situation and we'll connect you with the right people.`
                : "Tell us a bit about your situation and we'll connect you with the right people."}
            </p>
            <Link
              href="/get-help"
              className="mt-5 inline-block text-sm font-semibold text-burnt-light underline underline-offset-4"
            >
              Back to programs
            </Link>
          </div>
        </section>

        <section className="bg-cream py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1.4fr]">
            <div className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="font-serif text-xl font-semibold text-ink">Helpful to have ready</h2>
                <ul className="mt-4 space-y-3">
                  {readyList.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink/80">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-burnt" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-ink/50">Don't have everything? Reach out anyway.</p>
              </div>

              <div className="rounded-2xl border border-burnt/40 bg-burnt/10 p-6">
                <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-ink">
                  <ShieldAlert size={20} className="text-burnt-dark" /> In an emergency
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-ink/80">
                  <li>Call <strong>911</strong> if anyone is in immediate danger.</li>
                  <li>Call or text <strong>988</strong> for a mental health crisis.</li>
                  <li>Call <strong>211</strong> any time to find local services.</li>
                </ul>
              </div>
            </div>

            <IntakeForm initialZip={zip} initialNeed={need?.id ?? ""} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
