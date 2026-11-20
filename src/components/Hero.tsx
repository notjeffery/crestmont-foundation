export default function Hero() {
  return (
    <section className="relative flex min-h-[640px] h-screen items-center overflow-hidden bg-ink-900">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero-bg-web.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/75 via-ink/55 to-ink-900/85" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-burnt">
          Crestmont Foundation
        </p>
        <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          Standing with families when life breaks down.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/85">
          From a home damaged by a storm to a missed mortgage payment, we help neighbors across America get back on their feet.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#get-help"
            className="rounded-full border border-white/70 px-8 py-3 font-semibold text-white transition duration-200 hover:bg-white/10"
          >
            Get Help
          </a>
          <a
            href="#donate"
            className="rounded-full bg-burnt px-8 py-3 font-semibold text-ink-900 transition duration-200 hover:-translate-y-0.5 hover:bg-burnt-light hover:shadow-lg hover:shadow-burnt/40"
          >
            Give Today
          </a>
        </div>
      </div>
    </section>
  );
}