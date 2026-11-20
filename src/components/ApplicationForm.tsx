"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { beforeYouApply, steps, type Field, type InputField } from "@/lib/applicationSchema";
import { sendApplication, type ApplicationData } from "@/lib/submitApplication";

// Set to false while building so you can click through steps without filling fields.
// Turn it back on (true) before the form goes live.
const ENFORCE_VALIDATION = false;

const WATCHED = ["hasDependentChildren", "housingAtRisk", "employmentStatus", "childCount"];

const labelCls = "block text-sm font-semibold text-ink";
const inputCls =
  "mt-1 w-full rounded-lg border border-ink/20 bg-white px-4 py-2.5 text-ink outline-none focus:border-burnt group-data-[error=true]:border-burnt-dark";
const optionCls =
  "flex cursor-pointer items-center gap-3 rounded-lg border border-ink/15 px-4 py-3 text-sm text-ink transition hover:bg-ink/[0.03]";

function Wrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div data-field className={`group ${className}`}>
      {children}
    </div>
  );
}

function ErrorMsg({ text = "This field is required." }: { text?: string }) {
  return <p className="mt-2 hidden text-sm font-medium text-burnt-dark group-data-[error=true]:block">{text}</p>;
}

function LabelText({ label, required }: { label: string; required?: boolean }) {
  return (
    <>
      {label}
      {required ? (
        <span className="text-burnt-dark"> *</span>
      ) : (
        <span className="font-normal text-ink/50"> (Optional)</span>
      )}
    </>
  );
}

function InputView({ f }: { f: InputField }) {
  return (
    <Wrapper>
      <label htmlFor={f.name} className={labelCls}>
        <LabelText label={f.label} required={f.required} />
      </label>
      {f.hint && <p className="mt-0.5 text-xs text-ink/50">{f.hint}</p>}
      <input
        id={f.name}
        name={f.name}
        type={f.kind}
        required={f.required}
        min={f.min}
        max={f.max}
        step={f.step}
        inputMode={f.inputMode}
        placeholder={f.placeholder}
        className={inputCls}
      />
      <ErrorMsg />
    </Wrapper>
  );
}

function ChildCard({ n }: { n: number }) {
  const id = (s: string) => `child${n}${s}`;
  const text = (s: string, label: string, placeholder?: string) => (
    <Wrapper>
      <label htmlFor={id(s)} className={labelCls}>
        <LabelText label={label} required />
      </label>
      <input id={id(s)} name={id(s)} type="text" required placeholder={placeholder} className={inputCls} />
      <ErrorMsg />
    </Wrapper>
  );
  return (
    <fieldset className="space-y-5 rounded-xl border border-ink/15 bg-cream/60 p-5">
      <legend className="px-2 font-serif text-lg font-semibold text-ink">Child {n}</legend>
      {text("Name", "Child name")}
      <Wrapper>
        <label htmlFor={id("Age")} className={labelCls}>
          <LabelText label="Child age" required />
        </label>
        <input id={id("Age")} name={id("Age")} type="number" min={0} max={17} step={1} inputMode="numeric" required className={inputCls} />
        <ErrorMsg />
      </Wrapper>
      {text("Relationship", "Child relationship to applicant", "e.g. Son, daughter, grandchild")}
      {text("SupportRequested", "Child support requested")}
      <Wrapper>
        <label htmlFor={id("ImmediateRisk")} className={labelCls}>
          <LabelText label="Immediate child risk" required />
        </label>
        <textarea
          id={id("ImmediateRisk")}
          name={id("ImmediateRisk")}
          rows={3}
          required
          placeholder="Describe any immediate risk to this child"
          className={inputCls}
        />
        <ErrorMsg />
      </Wrapper>
      <Wrapper>
        <label htmlFor={id("TaxStatus")} className={labelCls}>
          <LabelText label="Child 2025 tax return status" required />
        </label>
        <select id={id("TaxStatus")} name={id("TaxStatus")} required defaultValue="" className={inputCls}>
          <option value="">Select one</option>
          <option value="Claimed by me (applicant)">Claimed by me (applicant)</option>
          <option value="Claimed by someone else">Claimed by someone else</option>
        </select>
        <ErrorMsg />
      </Wrapper>
    </fieldset>
  );
}

function validateStep(stepEl: HTMLElement | null): boolean {
  if (!stepEl) return true;
  stepEl.querySelectorAll("[data-error]").forEach((el) => el.removeAttribute("data-error"));
  if (!ENFORCE_VALIDATION) return true;

  const bad: HTMLElement[] = [];
  const markBad = (el: Element) => {
    const wrapper = (el.closest("[data-field]") as HTMLElement | null) ?? (el as HTMLElement);
    wrapper.setAttribute("data-error", "true");
    bad.push(wrapper);
  };
  const handled = new Set<Element>();

  // Certification: every box must be ticked.
  stepEl.querySelectorAll<HTMLElement>("[data-cert]").forEach((box) => {
    const boxes = Array.from(box.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'));
    boxes.forEach((b) => handled.add(b));
    if (boxes.some((b) => b.required && !b.checked)) markBad(box);
  });
  // Required checkbox groups: at least one box.
  stepEl.querySelectorAll<HTMLElement>("[data-required-group]").forEach((group) => {
    const boxes = Array.from(group.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'));
    boxes.forEach((b) => handled.add(b));
    if (!boxes.some((b) => b.checked)) markBad(group);
  });
  // Required radio groups: one choice per name.
  const radioNames = new Set<string>();
  stepEl.querySelectorAll<HTMLInputElement>('input[type="radio"][required]').forEach((r) => radioNames.add(r.name));
  radioNames.forEach((name) => {
    const group = Array.from(stepEl.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${name}"]`));
    if (!group.some((r) => r.checked)) markBad(group[0]);
  });
  // Everything else that is required.
  stepEl
    .querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      "input[required], select[required], textarea[required]",
    )
    .forEach((el) => {
      if (el instanceof HTMLInputElement && (el.type === "radio" || handled.has(el))) return;
      if (!el.value.trim() || !el.checkValidity()) markBad(el);
    });

  if (bad.length > 0) bad[0].scrollIntoView({ behavior: "smooth", block: "center" });
  return bad.length === 0;
}

type Props = { program?: string; zip?: string };

export default function ApplicationForm({ program, zip }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const [step, setStep] = useState(0);
  const [watched, setWatched] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const total = steps.length + 1; // "Before you apply" + the steps in the schema
  const isLast = step === total - 1;
  const label = step === 0 ? beforeYouApply.label : steps[step - 1].label;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const visible = (f: Field) => {
    if (!("dependsOn" in f) || !f.dependsOn) return true;
    return watched[f.dependsOn.name] === f.dependsOn.value;
  };

  const childCount = (() => {
    if (watched.hasDependentChildren !== "Yes") return 0;
    const n = parseInt(watched.childCount ?? "", 10);
    return Number.isInteger(n) && n > 0 ? Math.min(n, 10) : 0;
  })();

  function handleChange(e: React.FormEvent<HTMLFormElement>) {
    const t = e.target as HTMLInputElement;
    t.closest("[data-error]")?.removeAttribute("data-error");

    // "None of the above" style options are exclusive within their checkbox group.
    if (t.type === "checkbox") {
      const group = t.closest("[data-checkbox-group]");
      if (group) {
        const boxes = group.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
        if (t.hasAttribute("data-exclusive") && t.checked) {
          boxes.forEach((b) => {
            if (b !== t) b.checked = false;
          });
        } else if (t.checked) {
          boxes.forEach((b) => {
            if (b.hasAttribute("data-exclusive")) b.checked = false;
          });
        }
      }
    }

    if (formRef.current) {
      const fd = new FormData(formRef.current);
      const next: Record<string, string> = {};
      WATCHED.forEach((k) => {
        next[k] = String(fd.get(k) ?? "");
      });
      setWatched(next);
    }
  }

  function collectData(): ApplicationData {
    const data: ApplicationData = {};
    if (!formRef.current) return data;
    new FormData(formRef.current).forEach((value, key) => {
      const v = String(value);
      const existing = data[key];
      if (existing === undefined) data[key] = v;
      else data[key] = Array.isArray(existing) ? [...existing, v] : [existing, v];
    });
    return data;
  }

  async function handleNext() {
    if (!validateStep(stepRefs.current[step])) return;
    if (!isLast) {
      setStep(step + 1);
      return;
    }
    if (submitting) return;
    setSubmitting(true);
    try {
      await sendApplication(collectData());
      setDone(true);
    } catch {
      alert("Something went wrong submitting your application. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function renderField(f: Field, key: string) {
    if (!visible(f)) return null;

    switch (f.kind) {
      case "text":
      case "tel":
      case "email":
      case "date":
      case "number":
        return <InputView key={key} f={f} />;

      case "group":
        return (
          <fieldset key={key} className="space-y-5 rounded-xl border border-ink/15 p-5">
            <legend className="px-2 text-sm font-semibold text-ink">{f.label}</legend>
            {f.fields.map((sub) => (
              <InputView key={sub.name} f={sub} />
            ))}
          </fieldset>
        );

      case "radio":
        return (
          <Wrapper key={key}>
            <span className={labelCls}>
              <LabelText label={f.label} required={f.required} />
            </span>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {f.options.map((o) => (
                <label key={o} className={optionCls}>
                  <input type="radio" name={f.name} value={o} required={f.required} className="h-4 w-4 accent-burnt" />
                  {o}
                </label>
              ))}
            </div>
            <ErrorMsg text="Please choose one." />
          </Wrapper>
        );

      case "checkboxes":
        return (
          <Wrapper key={key}>
            <span className={labelCls}>
              <LabelText label={f.label} required={f.required} />
            </span>
            {f.hint && <p className="mt-0.5 text-xs text-ink/50">{f.hint}</p>}
            <div
              data-checkbox-group="true"
              data-required-group={f.required ? "true" : undefined}
              className="mt-2 grid gap-2 sm:grid-cols-2"
            >
              {f.options.map((o) => (
                <label key={o.value} className={optionCls}>
                  <input
                    type="checkbox"
                    name={f.name}
                    value={o.value}
                    data-exclusive={o.exclusive ? "true" : undefined}
                    className="h-4 w-4 accent-burnt"
                  />
                  {o.value}
                </label>
              ))}
            </div>
            <ErrorMsg text="Please choose at least one." />
          </Wrapper>
        );

      case "textarea":
        return (
          <Wrapper key={key}>
            <label htmlFor={f.name} className={labelCls}>
              <LabelText label={f.label} required={f.required} />
            </label>
            <textarea id={f.name} name={f.name} rows={f.rows ?? 4} required={f.required} className={inputCls} />
            <ErrorMsg />
          </Wrapper>
        );

      case "children":
        return childCount > 0 ? (
          <div key={key} className="space-y-5">
            {Array.from({ length: childCount }, (_, i) => (
              <ChildCard key={i + 1} n={i + 1} />
            ))}
          </div>
        ) : null;
    }
  }

  return (
    <>
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-burnt-dark">Assistance Application</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-ink sm:text-5xl">Let&rsquo;s begin your application.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-ink/70">
          This secure, multi-step application can be completed at your own pace. Your information is reviewed
          confidentially and with compassion.
        </p>
      </div>

      <div className="mt-10 flex items-center justify-between text-sm font-semibold text-ink">
        <span>{label}</span>
        <span className="text-ink/60">
          Step {step + 1} of {total}
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10">
        <div
          className="h-full rounded-full bg-burnt transition-all duration-300"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      <form
        ref={formRef}
        noValidate
        onChange={handleChange}
        onSubmit={(e) => e.preventDefault()}
        className="mt-6 rounded-2xl bg-white p-6 shadow-xl sm:p-10"
      >
        <input type="hidden" name="program" value={program ?? ""} />
        <input type="hidden" name="zip" value={zip ?? ""} />

        <section ref={(el) => { stepRefs.current[0] = el; }} hidden={step !== 0}>
          <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">{beforeYouApply.title}</h2>
          <div className="mt-4 space-y-3 leading-relaxed text-ink/75">
            {beforeYouApply.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-5 border-l-4 border-burnt bg-cream p-4 text-sm leading-relaxed text-ink/80">
            {beforeYouApply.callout}
          </p>
          <p className="mt-5 text-ink/75">{beforeYouApply.outro}</p>

          <h3 className="mt-8 font-serif text-xl font-semibold text-ink">{beforeYouApply.certificationTitle}</h3>
          <Wrapper className="mt-3">
            <div data-cert className="space-y-3 rounded-xl border border-ink/15 p-4">
              {beforeYouApply.certifications.map((c) => (
                <label key={c.name} className="flex cursor-pointer items-start gap-3 text-sm text-ink/80">
                  <input type="checkbox" name={c.name} value="Agreed" required className="mt-0.5 h-4 w-4 shrink-0 accent-burnt" />
                  <span>{c.text}</span>
                </label>
              ))}
            </div>
            <ErrorMsg text={beforeYouApply.certificationError} />
          </Wrapper>
        </section>

        {steps.map((s, i) => (
          <section
            key={s.id}
            ref={(el) => { stepRefs.current[i + 1] = el; }}
            hidden={step !== i + 1}
          >
            <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">{s.title}</h2>
            <div className="mt-6 space-y-6">{s.fields.map((f, j) => renderField(f, `${s.id}-${j}`))}</div>
          </section>
        ))}

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className={`rounded-full border border-ink px-6 py-3 text-sm font-bold text-ink transition hover:bg-ink/5 ${
              step === 0 ? "invisible" : ""
            }`}
          >
            &larr; Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={submitting}
            className="rounded-full bg-burnt px-8 py-3 font-semibold text-ink-900 transition duration-200 hover:-translate-y-0.5 hover:bg-burnt-light hover:shadow-lg hover:shadow-burnt/40 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : isLast ? "Submit application" : "Next →"}
          </button>
        </div>
      </form>

      {done && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/70 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="submitted-title"
            className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-2xl sm:p-10"
          >
            <CheckCircle2 size={48} className="mx-auto text-burnt" />
            <h2 id="submitted-title" className="mt-5 font-serif text-3xl font-bold text-ink">
              Application Received!
            </h2>
            <p className="mt-3 leading-relaxed text-ink/70">Thank you for submitting your application.</p>
            <p className="mt-3 leading-relaxed text-ink/70">
              Your application has been received and is now being carefully reviewed. We appreciate the opportunity to
              consider your request and will be in touch as soon as a decision is made. We wish you and your household
              the very best during this time.
            </p>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mt-8 rounded-full bg-burnt px-8 py-3 font-semibold text-ink-900 transition duration-200 hover:-translate-y-0.5 hover:bg-burnt-light hover:shadow-lg hover:shadow-burnt/40"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <p className="mt-6 text-center text-sm text-ink/60">
        <Link href="/get-help" className="underline underline-offset-4">
          Back to programs
        </Link>
      </p>
    </>
  );
}
