   "use client";

   import { useState } from "react";
   import { useRouter } from "next/navigation";
   import Image from "next/image";
   import { Phone } from "lucide-react";
   import { images } from "@/lib/images";
   import { needs } from "@/lib/needs";

   export default function HelpBanner() {
     const router = useRouter();
     const [zip, setZip] = useState("");
     const [need, setNeed] = useState(needs[0].id);
     const [error, setError] = useState("");

     function handleSubmit(e: React.FormEvent) {
       e.preventDefault();
       if (!/^\d{5}$/.test(zip)) {
         setError("Please enter a valid 5-digit ZIP code.");
         return;
       }
       router.push(`/get-help?zip=${zip}&need=${need}`);
     }

     return (
       <section id="get-help" className="relative overflow-hidden bg-ink py-20">
         <Image src={images.helpBg} alt="" fill sizes="100vw" className="object-cover" />
         <div className="absolute inset-0 bg-ink-900/80" />

         <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 md:flex-row md:items-center md:justify-between">
           <div className="max-w-2xl">
             <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
               Need help? Start here.
             </h2>
             <p className="mt-3 text-white/80">
               Tell us where you live and what you're facing. We'll connect you with the right support.
             </p>
           </div>

           <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
             <label className="block text-sm font-semibold text-ink">ZIP code</label>
             <input
               type="text"
               inputMode="numeric"
               maxLength={5}
               value={zip}
               onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
               placeholder="e.g. 30301"
               className="mt-1 w-full rounded-lg border border-ink/20 px-4 py-2.5 text-ink outline-none focus:border-burnt"
             />
             {error && <p className="mt-1 text-xs font-medium text-burnt-dark">{error}</p>}

             <label className="mt-4 block text-sm font-semibold text-ink">What do you need help with?</label>
             <select
               value={need}
               onChange={(e) => setNeed(e.target.value)}
               className="mt-1 w-full rounded-lg border border-ink/20 bg-white px-4 py-2.5 text-ink outline-none focus:border-burnt"
             >
               {needs.map((n) => (
                 <option key={n.id} value={n.id}>{n.label}</option>
               ))}
             </select>

             <button
               type="submit"
               className="mt-5 w-full rounded-full bg-burnt px-6 py-3 font-semibold text-ink-900 transition duration-200 hover:-translate-y-0.5 hover:bg-burnt-light hover:shadow-lg hover:shadow-burnt/40"
             >
               Find Help
             </button>

             <p className="mt-4 flex items-center gap-2 text-xs text-ink/60">
               <Phone size={14} /> Prefer to talk? Call 1-800-000-0000 (placeholder)
             </p>
           </form>
         </div>
       </section>
     );
   }