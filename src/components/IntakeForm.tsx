   "use client";

   import { useState } from "react";
   import { CheckCircle2 } from "lucide-react";
   import { needs } from "@/lib/needs";

   type Props = { initialZip: string; initialNeed: string };

   const field =
     "mt-1 w-full rounded-lg border border-ink/20 bg-white px-4 py-2.5 text-ink outline-none focus:border-burnt";
   const label = "block text-sm font-semibold text-ink";

   const urgencies = [
     { value: "today", label: "Emergency: I need help today" },
     { value: "week", label: "Within the next week" },
     { value: "planning", label: "Planning ahead" },
   ];

   export default function IntakeForm({ initialZip, initialNeed }: Props) {
     const [submitted, setSubmitted] = useState(false);
     const [firstName, setFirstName] = useState("");
     const [error, setError] = useState("");

     function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
       e.preventDefault();
       const data = new FormData(e.currentTarget);
       const zip = String(data.get("zip") ?? "");
       const phone = String(data.get("phone") ?? "").trim();
       const email = String(data.get("email") ?? "").trim();

       if (!/^\d{5}$/.test(zip)) {
         setError("Please enter a valid 5-digit ZIP code.");
         return;
       }
       if (!phone && !email) {
         setError("Please give us a phone number or an email so we can reach you.");
         return;
       }

       setError("");
       // TODO: save this request to Supabase
       setFirstName(String(data.get("name") ?? "").trim().split(" ")[0]);
       setSubmitted(true);
     }

     if (submitted) {
       return (
         <div className="rounded-2xl bg-white p-8 shadow-xl sm:p-12">
           <CheckCircle2 size={48} className="text-burnt" />
           <h2 className="mt-5 font-serif text-3xl font-bold text-ink">
             Thank you{firstName ? `, ${firstName}` : ""}.
           </h2>
           <p className="mt-3 leading-relaxed text-ink/70">
             We've received your request and a member of our team will reach out using the contact details you gave us.
           </p>
           <p className="mt-4 text-sm text-ink/60">
             If anything changes or gets urgent, call 211 for local help, or 911 if anyone is in immediate danger.
           </p>
           <a
             href="/"
             className="mt-8 inline-block rounded-full bg-burnt px-8 py-3 font-semibold text-ink-900 transition duration-200 hover:-translate-y-0.5 hover:bg-burnt-light hover:shadow-lg hover:shadow-burnt/40"
           >
             Back to home
           </a>
         </div>
       );
     }

     return (
       <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-xl sm:p-10">
         <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Tell us what's going on</h2>
         <p className="mt-2 text-sm text-ink/60">
           Share only what you're comfortable with. You can give us more detail when we talk.
         </p>

         <div className="mt-8 grid gap-5 sm:grid-cols-2">
           <div>
             <label className={label}>What do you need help with?</label>
             <select name="need" defaultValue={initialNeed || needs[0].id} className={field}>
               {needs.map((n) => (
                 <option key={n.id} value={n.id}>{n.label}</option>
               ))}
             </select>
           </div>
           <div>
             <label className={label}>ZIP code</label>
             <input
               name="zip"
               type="text"
               inputMode="numeric"
               maxLength={5}
               defaultValue={initialZip}
               placeholder="e.g. 30301"
               className={field}
             />
           </div>

           <div className="sm:col-span-2">
             <label className={label}>Full name</label>
             <input name="name" type="text" required className={field} />
           </div>

           <div>
             <label className={label}>Phone</label>
             <input name="phone" type="tel" placeholder="(555) 000-0000" className={field} />
           </div>
           <div>
             <label className={label}>Email</label>
             <input name="email" type="email" className={field} />
           </div>

           <div className="sm:col-span-2">
             <label className={label}>Best way to reach you</label>
             <select name="contact" defaultValue="phone" className={field}>
               <option value="phone">Phone call</option>
               <option value="text">Text message</option>
               <option value="email">Email</option>
             </select>
           </div>

           <div className="sm:col-span-2">
             <span className={label}>How soon do you need help?</span>
             <div className="mt-2 flex flex-wrap gap-2">
               {urgencies.map((u) => (
                 <label key={u.value} className="cursor-pointer">
                   <input
                     type="radio"
                     name="urgency"
                     value={u.value}
                     defaultChecked={u.value === "week"}
                     className="peer sr-only"
                   />
                   <span className="inline-block rounded-full border border-ink/20 px-4 py-2 text-sm font-medium text-ink transition peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-burnt">
                     {u.label}
                   </span>
                 </label>
               ))}
             </div>
           </div>

           <div className="sm:col-span-2">
             <label className={label}>Anything you'd like us to know? (optional)</label>
             <textarea name="message" rows={4} className={field} />
           </div>

           <label className="flex items-start gap-3 text-sm text-ink/80 sm:col-span-2">
             <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-burnt" />
             I agree that Crestmont Foundation may contact me about this request.
           </label>
         </div>

         {error && <p className="mt-5 text-sm font-medium text-burnt-dark">{error}</p>}

         <button
           type="submit"
           className="mt-8 w-full rounded-full bg-burnt px-8 py-3 font-semibold text-ink-900 transition duration-200 hover:-translate-y-0.5 hover:bg-burnt-light hover:shadow-lg hover:shadow-burnt/40 sm:w-auto"
         >
           Send my request
         </button>
       </form>
     );
   }