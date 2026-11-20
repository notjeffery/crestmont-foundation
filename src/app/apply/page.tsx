import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { programs } from "@/lib/programs";
import { images } from "@/lib/images";
import {
  about,
  howToApply,
  responseTime,
  eligibility,
  eligibleAssistance,
  childSupport,
  disclaimer,
} from "@/lib/applyInfo";

export const metadata: Metadata = {
  title: "Apply for Assistance | Crestmont Foundation",
  description:
    "Learn how to apply, who is eligible, and what assistance Crestmont Foundation may provide before you start your application.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="border-b border-ink/15 pb-3 font-serif text-3xl font-bold text-ink">{title}</h2>
      <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/80">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-burnt">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function ApplyPage({
  searchParams,
}: {
  searchParams: { zip?: string; need?: string };
}) {
  const zip = /^\d{5}$/.test(searchParams.zip ?? "") ? (searchParams.zip as string) : "";
  const selected = programs.find((p) => p.id === searchParams.need);
  const formHref = `/apply/form${selected ? `?need=${selected.id}${zip ? `&zip=${zip}` : ""}` : zip ? `?zip=${zip}` : ""}`;

  const buttonClass =
    "inline-block rounded-full bg-ink px-8 py-3 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-ink-700 hover:shadow-lg";

  return (
    <>
      <Header solid />
      <main className="bg-cream pb-20 pt-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            {selected && (
              <p className="mb-4 inline-block rounded-sm border border-burnt/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-burnt-dark">
                {selected.title}
              </p>
            )}
            <h1 className="font-serif text-4xl font-bold text-ink sm:text-5xl">Apply for Assistance</h1>
            <div className="mx-auto mt-6 h-1 w-full bg-burnt" />
          </div>

          <div className="relative mt-10 h-[440px] overflow-hidden bg-ink/10 sm:h-[500px]">
            <Image
              src={selected?.image ?? images.programs.other}
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-4 bottom-0 bg-white/90 p-8 text-center backdrop-blur-sm sm:inset-x-8">
              <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Applications open now</h2>
              <p className="mt-2 text-ink/80">
                Eligible households can submit an application for assistance.
              </p>
              <Link href={formHref} className={`${buttonClass} mt-5`}>
                Apply Now
              </Link>
            </div>
          </div>

          <Section title="About Our Assistance">
            {about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Section>

          <Section title="How to Apply">
            {howToApply.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="pt-2">
              <Link href={formHref} className={buttonClass}>
                Start application
              </Link>
            </div>
            <p>
              <strong className="text-ink">Response time:</strong> {responseTime}
            </p>
          </Section>

          <Section title="Eligibility">
            <p>{eligibility.intro}</p>
            <p>{eligibility.prioritySituationsLabel}</p>
            <BulletList items={eligibility.prioritySituations} />
            <p>{eligibility.priorityGroupsLabel}</p>
            <BulletList items={eligibility.priorityGroups} />
          </Section>

          <Section title="Eligible Assistance">
            <p>{eligibleAssistance.intro}</p>
            {eligibleAssistance.groups.map((g) => (
              <div key={g.title} className="pt-2">
                <h3 className="mb-3 text-xl font-bold text-ink">{g.title}</h3>
                <BulletList items={g.items} />
              </div>
            ))}
          </Section>

          <Section title="Child Household Support">
            <p>
              {childSupport.before}
              <strong className="text-ink">{childSupport.amount}</strong>
              {childSupport.after}
            </p>
            <p className="border-l-4 border-burnt bg-ink/[0.04] p-6 text-base text-ink/80">{disclaimer}</p>
          </Section>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 bg-ink-900 px-6 py-5 text-white">
            <span className="font-serif text-lg font-semibold">
              Crestmont <span className="text-burnt">Foundation</span>
            </span>
            <Link href={formHref} className="font-semibold text-burnt-light underline underline-offset-4">
              Apply now
            </Link>
          </div>

          <p className="mt-8 text-center text-sm text-ink/60">
            <Link href="/get-help" className="underline underline-offset-4">
              Back to programs
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
