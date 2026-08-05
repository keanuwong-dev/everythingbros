"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SubmitButton } from "@/components/ui/Button";
import { CONTACT_SERVICES } from "@/lib/content";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setState("success");
      form.reset();
    } catch (err) {
      setState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <Section
      id="contact"
      variant="dark"
      className="snap-none scroll-mt-[calc(var(--header-height)+env(safe-area-inset-top,0px)+var(--panel-top-gap))] pt-[calc(var(--header-height)+env(safe-area-inset-top,0px)+var(--panel-top-gap)+1.5rem)]"
    >
      <SectionHeading
        dark
        title="Get a free quote"
        subtitle="Tell us what you need and we'll get back to you quickly with a personalized estimate."
      />

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-3 text-slate-300 transition-colors hover:text-white"
            >
              <div className="rounded-xl bg-navy-800 p-3">
                <Phone className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Phone</p>
                <p className="font-medium">{SITE.phone}</p>
              </div>
            </a>
            <a
              href={SITE.emailHref}
              className="flex items-center gap-3 text-slate-300 transition-colors hover:text-white"
            >
              <div className="rounded-xl bg-navy-800 p-3">
                <Mail className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="font-medium">{SITE.email}</p>
              </div>
            </a>
          </div>
          <p className="mt-8 text-sm leading-relaxed text-slate-400">
            {SITE.seasonalNote}
          </p>
        </div>

        <div className="lg:col-span-3">
          {state === "success" ? (
            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center">
              <p className="text-lg font-semibold text-white">Message sent!</p>
              <p className="mt-2 text-sm text-slate-300">
                Thanks for reaching out. We&apos;ll get back to you soon with your
                free quote.
              </p>
              <button
                type="button"
                onClick={() => setState("idle")}
                className="mt-6 text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-white/10 bg-navy-800 p-6 md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Phone" name="phone" type="tel" required />
              </div>
              <Field label="Email" name="email" type="email" required />
              <Field
                label="Address / neighborhood"
                name="address"
                placeholder="e.g. Lynnwood, near Alderwood Mall"
              />
              <fieldset>
                <legend className="mb-3 text-sm font-medium text-slate-300">
                  Service(s) interested in
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {CONTACT_SERVICES.map((service) => (
                    <label
                      key={service}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition-colors hover:border-blue-500/50"
                    >
                      <input
                        type="checkbox"
                        name="services"
                        value={service}
                        className="rounded border-slate-400 text-blue-500 focus:ring-blue-400"
                      />
                      {service}
                    </label>
                  ))}
                </div>
              </fieldset>
              <Field
                label="Message"
                name="message"
                multiline
                placeholder="Tell us about your project..."
              />

              {state === "error" && (
                <p className="text-sm text-red-400" role="alert">
                  {errorMessage}
                </p>
              )}

              <SubmitButton disabled={state === "submitting"}>
                {state === "submitting" ? "Sending..." : "Send message"}
              </SubmitButton>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  multiline,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
}) {
  const className = cn(
    "w-full min-h-11 rounded-xl border border-white/10 bg-navy-950 px-4 py-3 text-base text-white placeholder:text-slate-500",
    "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
  );

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
        {required && <span className="text-blue-400"> *</span>}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          required={required}
          placeholder={placeholder}
          className={className}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={className}
        />
      )}
    </div>
  );
}
