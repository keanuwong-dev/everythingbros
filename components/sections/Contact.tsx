"use client";

import { useState } from "react";
import { CheckCircle2, Mail, Phone, Upload } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SubmitButton } from "@/components/ui/Button";
import { CONTACT_FORM } from "@/lib/content";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success" | "error";

const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 100 * 1024 * 1024;
/** Vercel serverless requests are capped around 4.5 MB total */
const MAX_TOTAL_PHOTO_BYTES = 4 * 1024 * 1024;

export function Contact() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [servicesOther, setServicesOther] = useState(false);
  const [referralOther, setReferralOther] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const services = formData.getAll("services").map(String);
    if (services.length === 0) {
      setState("error");
      setErrorMessage("Please select at least one service.");
      return;
    }

    if (services.includes("Other") && !String(formData.get("servicesOther") ?? "").trim()) {
      setState("error");
      setErrorMessage('Please describe the service under "Other".');
      return;
    }

    const referralSource = String(formData.get("referralSource") ?? "");
    if (referralSource === "Other" && !String(formData.get("referralOther") ?? "").trim()) {
      setState("error");
      setErrorMessage('Please tell us how you heard about us under "Other".');
      return;
    }

    const photos = formData.getAll("photos").filter((entry): entry is File => {
      return entry instanceof File && entry.size > 0;
    });

    if (photos.length > MAX_PHOTOS) {
      setState("error");
      setErrorMessage(`You can upload up to ${MAX_PHOTOS} photos.`);
      return;
    }

    if (photos.some((photo) => photo.size > MAX_PHOTO_BYTES)) {
      setState("error");
      setErrorMessage("Each photo must be 100 MB or smaller.");
      return;
    }

    const totalPhotoBytes = photos.reduce((sum, photo) => sum + photo.size, 0);
    if (totalPhotoBytes > MAX_TOTAL_PHOTO_BYTES) {
      setState("error");
      setErrorMessage(
        "Total photo size must be under 4 MB for web upload. Email us directly for larger files.",
      );
      return;
    }

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
      setServicesOther(false);
      setReferralOther(false);
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
        title="Free quote request"
        subtitle="Premium exterior home & home assistance services."
      />

      <ul className="mb-8 flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-start">
        {CONTACT_FORM.trustSignals.map((signal) => (
          <li key={signal} className="flex items-center gap-1.5 text-sm text-slate-300">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-400" />
            {signal}
          </li>
        ))}
      </ul>
      <p className="-mt-4 mb-8 text-sm text-slate-400">{CONTACT_FORM.responseNote}</p>

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
              <p className="text-lg font-semibold text-white">Request sent!</p>
              <p className="mt-2 text-sm text-slate-300">
                Thanks for reaching out. We&apos;ll contact you within 24 hours with
                your free quote.
              </p>
              <button
                type="button"
                onClick={() => setState("idle")}
                className="mt-6 text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-5 rounded-2xl border border-white/10 bg-navy-800 p-6 md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" required />
                <Field label="Phone number" name="phone" type="tel" required />
              </div>
              <Field label="Email address" name="email" type="email" />

              <CheckboxFieldset
                legend="Services needed"
                name="services"
                required
                options={CONTACT_FORM.services}
                onOtherChange={(checked) => setServicesOther(checked)}
              />
              {servicesOther && (
                <Field
                  label="Other service"
                  name="servicesOther"
                  placeholder="Please specify"
                  required
                />
              )}

              <Field label="Property address" name="propertyAddress" required />

              <Field
                label="Please describe the project"
                name="projectDescription"
                multiline
                required
                placeholder="Tell us what you'd like cleaned or helped with, and include any details you think would be helpful."
              />

              <RadioFieldset
                legend="When would you like the work completed?"
                name="timeline"
                required
                options={CONTACT_FORM.timeline}
              />

              <RadioFieldset
                legend="How did you hear about us?"
                name="referralSource"
                required
                options={CONTACT_FORM.referralSources}
                onOtherChange={(value) => setReferralOther(value === "Other")}
              />
              {referralOther && (
                <Field
                  label="Other (how you heard about us)"
                  name="referralOther"
                  placeholder="Please specify"
                  required
                />
              )}

              <RadioFieldset
                legend="Would you like a free in-person estimate?"
                name="estimatePreference"
                required
                options={CONTACT_FORM.estimatePreference}
              />

              <div>
                <label htmlFor="photos" className="mb-1.5 block text-sm font-medium text-slate-300">
                  Upload photos of the area
                  <span className="font-normal text-slate-500"> — optional (highly recommended)</span>
                </label>
                <label
                  htmlFor="photos"
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-navy-950 px-4 py-6 text-center transition-colors hover:border-blue-500/50"
                >
                  <Upload className="h-6 w-6 text-blue-400" />
                  <span className="text-sm text-slate-300">
                    Choose up to {MAX_PHOTOS} files
                  </span>
                  <span className="text-xs text-slate-500">
                    Up to {MAX_PHOTOS} photos, 4 MB total for web upload
                  </span>
                </label>
                <input
                  id="photos"
                  name="photos"
                  type="file"
                  multiple
                  accept="image/*,.heic,.heif"
                  className="sr-only"
                />
              </div>

              {state === "error" && (
                <p className="text-sm text-red-400" role="alert">
                  {errorMessage}
                </p>
              )}

              <SubmitButton disabled={state === "submitting"}>
                {state === "submitting" ? "Sending..." : "Submit request"}
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

function CheckboxFieldset({
  legend,
  name,
  options,
  required,
  onOtherChange,
}: {
  legend: string;
  name: string;
  options: readonly string[];
  required?: boolean;
  onOtherChange?: (otherChecked: boolean) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-slate-300">
        {legend}
        {required && <span className="text-blue-400"> *</span>}
      </legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition-colors hover:border-blue-500/50"
          >
            <input
              type="checkbox"
              name={name}
              value={option}
              className="rounded border-slate-400 text-blue-500 focus:ring-blue-400"
              onChange={
                option === "Other"
                  ? (e) => onOtherChange?.(e.target.checked)
                  : undefined
              }
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function RadioFieldset({
  legend,
  name,
  options,
  required,
  onOtherChange,
}: {
  legend: string;
  name: string;
  options: readonly string[];
  required?: boolean;
  onOtherChange?: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-slate-300">
        {legend}
        {required && <span className="text-blue-400"> *</span>}
      </legend>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition-colors hover:border-blue-500/50"
          >
            <input
              type="radio"
              name={name}
              value={option}
              required={required}
              className="border-slate-400 text-blue-500 focus:ring-blue-400"
              onChange={(e) => onOtherChange?.(e.target.value)}
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
