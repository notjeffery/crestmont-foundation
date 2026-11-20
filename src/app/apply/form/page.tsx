import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplicationForm from "@/components/ApplicationForm";
import { programs } from "@/lib/programs";

export const metadata: Metadata = { title: "Application | Crestmont Foundation" };

export default function ApplicationFormPage({
  searchParams,
}: {
  searchParams: { zip?: string; need?: string };
}) {
  const zip = /^\d{5}$/.test(searchParams.zip ?? "") ? (searchParams.zip as string) : "";
  const program = programs.find((p) => p.id === searchParams.need);
  const backHref = `/apply${program ? `?need=${program.id}${zip ? `&zip=${zip}` : ""}` : ""}`;

  return (
    <>
      <Header solid />
      <main className="bg-cream pb-20 pt-32">
        <div className="mx-auto max-w-3xl px-6">
          <Link href={backHref} className="mb-8 inline-block text-sm font-semibold text-ink underline underline-offset-4">
            &larr; Back to program information
          </Link>
          <ApplicationForm program={program?.id} zip={zip || undefined} />
        </div>
      </main>
      <Footer />
    </>
  );
}
