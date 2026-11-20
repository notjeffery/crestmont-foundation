import type { Metadata } from "next";
import Image from "next/image";
import { ShieldAlert } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProgramGrid from "@/components/ProgramGrid";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Get Help | Crestmont Foundation",
  description:
    "Explore Crestmont Foundation's programs, see what each one covers, and apply for the help you need.",
};

export default function GetHelpPage({
  searchParams,
}: {
  searchParams: { zip?: string; need?: string };
}) {
  const zip = /^\d{5}$/.test(searchParams.zip ?? "") ? (searchParams.zip as string) : "";

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
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-burnt">Get Help</p>
            <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl md:text-6xl">
              We're here to help.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              Browse our programs, see what each one covers, and apply when you're ready.
            </p>
          </div>
        </section>

        <section className="bg-cream py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-4xl space-y-4 text-lg leading-relaxed text-ink/75">
              <p>
                When a household is under strain, the need is rarely just one thing. It may be a missed payment, an
                empty pantry, a damaged roof, or simply not knowing where to turn.
              </p>
              <p>
                Crestmont Foundation brings practical support together in one place, helping people through the
                immediate problem while building toward lasting stability.
              </p>
              <p>Everyone who reaches out is treated with respect and listened to without judgment.</p>
            </div>

            <h2 className="mt-16 font-serif text-3xl font-bold uppercase tracking-wide text-ink sm:text-4xl">
              Our Core Programs
            </h2>
            <div className="mt-4 h-1 w-24 bg-burnt" />

            <ProgramGrid zip={zip || undefined} />

            <div className="mt-12 rounded-2xl border border-burnt/40 bg-burnt/10 p-6 sm:p-8">
              <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-ink sm:text-2xl">
                <ShieldAlert size={22} className="text-burnt-dark" /> In an emergency
              </h2>
              <ul className="mt-3 space-y-2 text-ink/80">
                <li>Call <strong>911</strong> if anyone is in immediate danger.</li>
                <li>Call or text <strong>988</strong> for a mental health crisis.</li>
                <li>Call <strong>211</strong> any time to find local services.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
