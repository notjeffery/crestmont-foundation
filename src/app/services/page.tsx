import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardList, PhoneCall, ShieldAlert, UserCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { programs } from "@/lib/programs";
import { getNeed } from "@/lib/needs";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Services | Crestmont Foundation",
  description:
    "Explore the programs Crestmont Foundation offers, see what to have ready, and apply for the help you need.",
};

const steps = [
  {
    icon: ClipboardList,
    title: "Choose a program",
    text: "Find the kind of help that fits your situation below. Not sure? Pick Other Support.",
  },
  {
    icon: UserCheck,
    title: "Tell us what's going on",
    text: "Fill out a short request form. Share only what you're comfortable with.",
  },
  {
    icon: PhoneCall,
    title: "We reach out",
    text: "A member of our team contacts you to talk through next steps.",
  },
];

export default function ServicesPage() {
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
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-burnt">Our Services</p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold sm:text-5xl md:text-6xl">
              Find the help that fits your situation.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              Crestmont Foundation offers practical support for housing, food, education, health, disability needs, and
              emergencies. Choose a program to see what it covers, then apply when you're ready.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#programs"
                className="rounded-full bg-burnt px-7 py-3 font-semibold text-ink-900 transition duration-200 hover:-translate-y-0.5 hover:bg-burnt-light hover:shadow-lg hover:shadow-burnt/40"
              >
                Browse programs
              </a>
              <Link
                href="/get-help"
                className="rounded-full border border-white/70 px-7 py-3 font-semibold text-white transition duration-200 hover:bg-white/10"
              >
                Apply now
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-burnt-dark">How It Works</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">Three simple steps.</h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title} className="rounded-2xl bg-cream p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-burnt text-ink-900">
                      <s.icon size={20} />
                    </span>
                    <span className="text-sm font-bold uppercase tracking-[0.15em] text-ink/50">Step {i + 1}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="programs" className="scroll-mt-24 bg-cream py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-burnt-dark">Programs</p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl font-bold text-ink sm:text-4xl">
              What we can help with.
            </h2>

            <div className="mt-10 space-y-8">
              {programs.map((p) => {
                const ready = getNeed(p.id)?.ready ?? [];
                return (
                  <article
                    key={p.id}
                    id={p.id}
                    className="grid scroll-mt-28 overflow-hidden rounded-2xl bg-white shadow-sm lg:grid-cols-[2fr_3fr]"
                  >
                    <div className="relative h-56 bg-ink/10 sm:h-72 lg:h-auto">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="p-6 sm:p-10">
                      <h3 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">{p.title}</h3>
                      <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">{p.text}</p>

                      {ready.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-ink/60">
                            Helpful to have ready
                          </h4>
                          <ul className="mt-3 space-y-2">
                            {ready.map((item) => (
                              <li key={item} className="flex items-start gap-3 text-sm text-ink/80">
                                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-burnt" />
                                {item}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-3 text-xs text-ink/50">Don't have everything? Apply anyway.</p>
                        </div>
                      )}

                      <Link
                        href={`/get-help?need=${p.id}`}
                        className="group mt-8 inline-flex items-center gap-2 rounded-full bg-burnt px-7 py-3 font-semibold text-ink-900 transition duration-200 hover:-translate-y-0.5 hover:bg-burnt-light hover:shadow-lg hover:shadow-burnt/40"
                      >
                        Apply for this program
                        <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-ink-900 p-8 text-white sm:p-10">
              <h2 className="font-serif text-2xl font-semibold sm:text-3xl">Not sure where to start?</h2>
              <p className="mt-3 leading-relaxed text-white/80">
                Tell us what's going on and we'll point you to the right support. You don't need to know which program
                fits.
              </p>
              <Link
                href="/get-help?need=other"
                className="mt-6 inline-block rounded-full bg-burnt px-7 py-3 font-semibold text-ink-900 transition duration-200 hover:-translate-y-0.5 hover:bg-burnt-light hover:shadow-lg hover:shadow-burnt/40"
              >
                Start a request
              </Link>
            </div>

            <div className="rounded-2xl border border-burnt/40 bg-burnt/10 p-8 sm:p-10">
              <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-ink sm:text-3xl">
                <ShieldAlert size={24} className="text-burnt-dark" /> In an emergency
              </h2>
              <ul className="mt-4 space-y-2 text-ink/80">
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
