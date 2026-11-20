export default function Footer() {
  return (
    <footer id="about" className="bg-ink-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-serif text-2xl font-semibold">
              Crestmont <span className="text-burnt">Foundation</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Standing with families through housing, food, education, health, and disaster relief across the United States.
            </p>

            <p className="mt-8 text-sm font-semibold">Get our newsletter</p>
            <div className="mt-2 flex max-w-sm gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 rounded-full bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-burnt"
              />
              <button
                type="button"
                className="rounded-full bg-burnt px-5 py-2.5 text-sm font-semibold text-ink-900 transition duration-200 hover:-translate-y-0.5 hover:bg-burnt-light hover:shadow-lg hover:shadow-burnt/40"
              >
                Sign up
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-burnt-light">What We Do</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Housing & Mortgage</li>
              <li>Food & Nutrition</li>
              <li>Education</li>
              <li>Health & Wellness</li>
              <li>Disaster Relief</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-burnt-light">Get Involved</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><a href="/get-help" className="hover:text-white">Get Help</a></li>
              <li><a href="/#donate" className="hover:text-white">Donate</a></li>
              <li><a href="/#stories" className="hover:text-white">Stories</a></li>
              <li><a href="/#news" className="hover:text-white">News</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} Crestmont Foundation. A 501(c)(3) nonprofit. EIN 00-0000000 (placeholder).
        </div>
      </div>
    </footer>
  );
}