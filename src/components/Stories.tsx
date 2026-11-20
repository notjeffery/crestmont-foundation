   import Image from "next/image";
   import { images } from "@/lib/images";

   const stories = [
     { tag: "Video", title: "From a fallen tree to a repaired roof in two weeks", image: images.stories[0] },
     { tag: "Article", title: "Keeping a family in their home", image: images.stories[1] },
     { tag: "Feature", title: "Hunger in the classroom", image: images.stories[2] },
   ];

   export default function Stories() {
     return (
       <section id="stories" className="bg-cream py-20">
         <div className="mx-auto max-w-7xl px-6">
           <div className="flex items-end justify-between">
             <div>
               <p className="text-sm font-bold uppercase tracking-[0.2em] text-burnt-dark">Program Stories</p>
               <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
                 Real families. Real fresh starts.
               </h2>
             </div>
             <a
               href="#stories"
               className="hidden rounded-full border border-ink/60 px-6 py-2.5 text-sm font-semibold text-ink transition duration-200 hover:bg-ink/5 sm:block"
             >
               More stories
             </a>
           </div>

           <div className="mt-12 grid gap-6 md:grid-cols-3">
             {stories.map((s) => (
               <a key={s.title} href="#stories" className="group block">
                 <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                   <Image
                     src={s.image}
                     alt={s.title}
                     fill
                     sizes="(min-width: 768px) 33vw, 100vw"
                     className="object-cover transition duration-500 group-hover:scale-105"
                   />
                   <span className="absolute left-4 top-4 rounded-full bg-burnt px-3 py-1 text-xs font-semibold text-ink-900">
                     {s.tag}
                   </span>
                 </div>
                 <h3 className="mt-4 font-serif text-xl font-semibold text-ink group-hover:underline">
                   {s.title}
                 </h3>
               </a>
             ))}
           </div>

           <p className="mt-8 text-xs text-ink/50">
             Placeholder stories. Photos are for illustration only.
           </p>
         </div>
       </section>
     );
   }