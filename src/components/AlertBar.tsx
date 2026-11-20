export default function AlertBar() {
  return (
    <div className="border-b border-ink/10 bg-cream text-ink">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-6 py-2 text-center text-sm">
        <span className="font-bold uppercase tracking-wide">Disaster Relief:</span>
        <span className="text-ink/80">
          Hit by a storm or home emergency? We can help with repairs and temporary housing.
        </span>
        <a href="#get-help" className="font-semibold underline underline-offset-2 hover:text-burnt-dark">
          Get help now
        </a>
      </div>
    </div>
  );
}