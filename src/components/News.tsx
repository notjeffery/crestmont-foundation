   import Image from "next/image";
   import { images } from "@/lib/images";

   const news = [
     { date: "Nov 2026", title: "Crestmont launches storm response fund for homeowners", image: images.news[0] },
     { date: "Oct 2026", title: "New mortgage assistance program opens nationwide", image: images.news[1] },
     { date: "Sep 2026", title: "Back-to-school drive reaches 5,000 students", image: images.news[2] },
   ];

   export default function News() {
     const [featured, ...others] = news;

     return (
       <section id="news" className="bg-cream py-20">
         <div className="mx-auto max-w-7xl px-6">
           <div className="flex items-end justify-between">
             <div>
               <p className="text-sm font-bold uppercase tracking-[0.2em] text-burnt-dark">Latest News</p>
               <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">From Crestmont</h2>
             </div>
             <a href="#news" className="hidden text-sm font-semibold text-ink hover:underline sm:block">
               More news →
             </a>
           </div>

           <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
             <a href="#news" className="group block">
               <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                 <Image
                   src={featured.image}
                   alt={featured.title}
                   fill
                   sizes="(min-width: 1024px) 55vw, 100vw"
                   className="object-cover transition duration-500 group-hover:scale-105"
                 />
                 <span className="absolute left-4 top-4 rounded-full bg-burnt px-3 py-1 text-xs font-semibold text-ink-900">
                   Featured
                 </span>
               </div>
               <p className="mt-4 text-sm font-semibold text-burnt-dark">{featured.date}</p>
               <h3 className="mt-1 font-serif text-2xl font-semibold text-ink group-hover:underline">
                 {featured.title}
               </h3>
             </a>

             <div className="flex flex-col gap-6">
               {others.map((n) => (
                 <a key={n.title} href="#news" className="group flex gap-4">
                   <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl sm:w-36">
                     <Image
                       src={n.image}
                       alt={n.title}
                       fill
                       sizes="144px"
                       className="object-cover transition duration-500 group-hover:scale-105"
                     />
                   </div>
                   <div>
                     <p className="text-sm font-semibold text-burnt-dark">{n.date}</p>
                     <h3 className="mt-1 font-serif text-lg font-semibold text-ink group-hover:underline">
                       {n.title}
                     </h3>
                   </div>
                 </a>
               ))}
             </div>
           </div>
         </div>
       </section>
     );
   }