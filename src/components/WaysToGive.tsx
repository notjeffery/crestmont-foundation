   import { Repeat, Gift, ScrollText, Users } from "lucide-react";

   const ways = [
     { title: "Give Monthly", text: "Steady monthly gifts let us plan ahead and respond fast when families call.", cta: "Start monthly giving", Icon: Repeat },
     { title: "Make a One-Time Gift", text: "Every dollar goes toward housing, food, education, health, or disaster relief.", cta: "Give once", Icon: Gift },
     { title: "Leave a Legacy", text: "Include Crestmont Foundation in your will or estate plan to help families for generations.", cta: "Learn about legacy giving", Icon: ScrollText },
     { title: "Volunteer or Partner", text: "Give your time or bring your company in as a community partner.", cta: "Get involved", Icon: Users },
   ];

   export default function WaysToGive() {
     return (
       <section id="give" className="bg-white py-20">
         <div className="mx-auto max-w-7xl px-6">
           <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burnt-dark">Ways to Give</p>
           <h2 className="mt-3 max-w-2xl font-serif text-3xl font-bold text-ink sm:text-4xl">
             Your generosity becomes someone's fresh start.
           </h2>

           <div id="donate" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
             {ways.map(({ title, text, cta, Icon }) => (
               <div key={title} className="flex flex-col rounded-2xl border border-ink/10 bg-cream p-7">
                 <span className="flex h-12 w-12 items-center justify-center rounded-full bg-burnt text-ink-900">
                   <Icon size={24} />
                 </span>
                 <h3 className="mt-5 font-serif text-xl font-semibold text-ink">{title}</h3>
                 <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{text}</p>
                 <a href="#donate" className="mt-5 text-sm font-semibold text-ink underline-offset-4 hover:underline">
                   {cta} →
                 </a>
               </div>
             ))}
           </div>

           <p className="mt-10 text-center text-xs text-ink/50">
             Crestmont Foundation is a 501(c)(3) nonprofit. EIN 00-0000000 (placeholder). Donations are tax-deductible to the extent allowed by law.
           </p>
         </div>
       </section>
     );
   }