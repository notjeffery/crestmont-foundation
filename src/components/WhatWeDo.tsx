"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { images } from "@/lib/images";

const programs = [
  { id: "housing", title: "Housing & Mortgage Help", text: "Rental aid, foreclosure prevention, and mortgage assistance to keep families safely in their homes.", image: images.programs.housing },
  { id: "food", title: "Food & Nutrition", text: "Pantries, meal programs, and groceries for families and individuals at risk of hunger.", image: images.programs.food },
  { id: "education", title: "Education", text: "Tutoring, scholarships, school supplies, and adult learning programs that open doors.", image: images.programs.education },
  { id: "health", title: "Health & Wellness", text: "Care navigation, mental health support, and help with medical bills for the whole person.", image: images.programs.health },
  { id: "disability", title: "Disability Support", text: "Home accessibility, equipment, and guidance on benefits and services.", image: images.programs.disability },
  { id: "disaster", title: "Disaster & Home Emergency Relief", text: "Fast help after storms, fires, floods, or sudden damage to your home, plus long-term recovery support.", image: images.programs.disaster },
  { id: "other", title: "Other Support", text: "Emergency cash aid, utilities, and help for needs that don't fit anywhere else.", image: images.programs.other },
];

export default function WhatWeDo() {
  const [activeId, setActiveId] = useState(programs[0].id);
  const active = programs.find((p) => p.id === activeId) ?? programs[0];

  return (
    <section id="what-we-do" className="bg-cream pb-24 pt-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-burnt-dark">What We Do</p>
        <h2 className="mt-3 max-w-2xl font-serif text-3xl font-bold text-ink sm:text-4xl">
          Practical help for the moments that matter most.
        </h2>
        <p className="mt-4 max-w-2xl text-ink/70">
          Whether it's a missed payment or a tree through the roof, Crestmont Foundation helps neighbors across the country find stability again.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[340px_1fr] lg:gap-12">
          <div role="tablist" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
            {programs.map((p) => {
              const isActive = p.id === active.id;
              return (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(p.id)}
                  className={`relative shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition lg:whitespace-normal lg:rounded-none lg:border-x-0 lg:border-t-0 lg:px-6 lg:py-5 lg:text-left lg:text-lg lg:font-medium ${
                    isActive
                      ? "border-ink bg-ink text-white lg:border-ink/10 lg:bg-white lg:font-semibold lg:text-ink"
                      : "border-ink/15 bg-white text-ink hover:bg-ink/5 lg:border-ink/10 lg:bg-transparent"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-0 hidden h-full w-1 bg-burnt lg:block" />
                  )}
                  {p.title}
                </button>
              );
            })}
          </div>

          <div>
            <div className="relative h-[320px] overflow-hidden rounded-2xl bg-ink/10 sm:h-[420px] lg:h-[520px]">
              <Image
                key={active.id}
                src={active.image}
                alt={active.title}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="relative z-10 -mt-16 ml-4 mr-4 rounded-2xl bg-white p-6 shadow-xl sm:ml-8 sm:mr-8 sm:p-10 lg:-mt-28">
              <h3 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">{active.title}</h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">{active.text}</p>
              <a
                href="#get-help"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-ink"
              >
                <ChevronRight size={16} className="text-burnt transition group-hover:translate-x-1" />
                <span className="border-b-2 border-burnt pb-0.5">About the program</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}