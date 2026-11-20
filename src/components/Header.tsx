   "use client";

   import { useEffect, useState } from "react";
   import Link from "next/link";

   const links = [
     { label: "What We Do", href: "/#what-we-do" },
     { label: "Ways to Give", href: "/#give" },
     { label: "Stories", href: "/#stories" },
     { label: "News", href: "/#news" },
     { label: "About", href: "/#about" },
   ];

   export default function Header({ solid = false }: { solid?: boolean }) {
     const [scrolled, setScrolled] = useState(false);

     useEffect(() => {
       const onScroll = () => setScrolled(window.scrollY > 40);
       onScroll();
       window.addEventListener("scroll", onScroll, { passive: true });
       return () => window.removeEventListener("scroll", onScroll);
     }, []);

     const filled = solid || scrolled;

     return (
       <header
         className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
           filled ? "bg-ink-900/95 shadow-lg backdrop-blur" : "bg-transparent"
         }`}
       >
         <div
           className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 ${
             filled ? "py-3" : "py-5"
           }`}
         >
           <Link href="/" className="font-serif text-2xl font-semibold text-white">
             Crestmont <span className="text-burnt">Foundation</span>
           </Link>

           <nav className="hidden items-center gap-8 md:flex">
             {links.map((l) => (
               <a key={l.href} href={l.href} className="text-sm font-medium text-white/90 hover:text-burnt-light">
                 {l.label}
               </a>
             ))}
           </nav>

           <div className="flex items-center gap-3">
             <a
               href="/get-help"
               className="hidden rounded-full border border-white/70 px-5 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-white/10 sm:block"
             >
               Get Help
             </a>
             <a
               href="/#donate"
               className="rounded-full bg-burnt px-5 py-2 text-sm font-semibold text-ink-900 transition duration-200 hover:-translate-y-0.5 hover:bg-burnt-light hover:shadow-lg hover:shadow-burnt/40"
             >
               Donate
             </a>
           </div>
         </div>
       </header>
     );
   }