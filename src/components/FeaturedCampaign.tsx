import Image from "next/image";
import { images } from "@/lib/images";

export default function FeaturedCampaign() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:aspect-auto md:h-[560px] md:w-[68%]">
            <Image
              src={images.featured}
              alt="Storm recovery"
              fill
              sizes="(min-width: 768px) 68vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="relative z-10 mx-4 -mt-12 rounded-2xl bg-white p-8 shadow-xl md:absolute md:right-0 md:top-1/2 md:mx-0 md:mt-0 md:w-[46%] md:-translate-y-1/2 md:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-burnt-dark">
              Disaster Relief
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
              Help a family rebuild after the storm.
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Storm season can turn a quiet street into a disaster zone overnight. Your gift helps families with emergency repairs, temporary housing, and the long road back home.
            </p>
            <a
              href="#donate"
              className="mt-8 inline-block rounded-full bg-burnt px-8 py-3 font-semibold text-ink-900 transition duration-200 hover:-translate-y-0.5 hover:bg-burnt-light hover:shadow-lg hover:shadow-burnt/40"
            >
              Support recovery
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}