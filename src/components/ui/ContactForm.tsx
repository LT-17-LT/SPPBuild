"use client";

import { useState } from "react";

const CONTACT_EMAIL = "hello@swingpathpro.com";

const COUNTRIES = [
  "South Africa",
  "United Kingdom",
  "United States",
  "Australia",
  "Ireland",
  "New Zealand",
  "United Arab Emirates",
  "Germany",
  "France",
  "Other",
];

/**
 * ContactForm - the enquiry form. Mirrors the fields on the existing site.
 * With no mail backend wired yet, submitting composes a pre-filled email to
 * CONTACT_EMAIL via the visitor's mail client (an honest interim). Swap the
 * submit handler for a POST to a form service (Formspree/Resend/etc.) when
 * one is set up - the markup won't need to change.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => (data.get(k) as string) || "";

    const lines = [
      `First name: ${get("firstName")}`,
      `Last name: ${get("lastName")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone")}`,
      `Enquiry type: ${get("enquiryType")}`,
      "",
      "Enquiry:",
      get("enquiry"),
      "",
      `Company: ${get("company")}`,
      `VAT ID: ${get("vat")}`,
      `Country/Region: ${get("country")}`,
      `Address: ${get("address")}`,
      `City: ${get("city")}`,
      `Zip / Postal code: ${get("zip")}`,
    ];

    const subject = `Swing Path Pro enquiry - ${get("enquiryType") || "General"}`;
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;

    window.location.href = href;
    setSent(true);
  };

  if (sent) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "clamp(2rem, 5vw, 3.5rem) 0",
        }}
      >
        <h2
          className="font-display"
          style={{
            color: "var(--ink)",
            fontWeight: 400,
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Thank you.
        </h2>
        <p
          style={{
            color: "var(--moss)",
            fontSize: "1rem",
            lineHeight: 1.65,
            fontWeight: 300,
            margin: "1rem auto 0",
            maxWidth: "44ch",
          }}
        >
          Your email client should have opened with your enquiry ready to send.
          If it didn&rsquo;t, write to us directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            style={{ color: "var(--green)", fontWeight: 500 }}
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      <div className="contact-grid">
        <Field label="First name" required htmlFor="firstName">
          <input id="firstName" name="firstName" className="spp-input" required />
        </Field>
        <Field label="Last name" htmlFor="lastName">
          <input id="lastName" name="lastName" className="spp-input" />
        </Field>
        <Field label="Email" required htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            className="spp-input"
            required
          />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            className="spp-input"
            placeholder="+27"
          />
        </Field>
      </div>

      {/* Single choice */}
      <fieldset
        style={{ border: "none", padding: 0, margin: "1.75rem 0 0" }}
      >
        <legend className="spp-field-label" style={{ padding: 0 }}>
          Single choice<span className="req">*</span>
        </legend>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.25rem",
            marginTop: "0.4rem",
          }}
        >
          <label className="spp-radio-row">
            <input type="radio" name="enquiryType" value="General enquiry" required />
            General enquiry
          </label>
          <label className="spp-radio-row">
            <input
              type="radio"
              name="enquiryType"
              value="Pre-order (4 week lead time)"
            />
            Pre-order (4 week lead time)
          </label>
        </div>
      </fieldset>

      <div style={{ marginTop: "1.75rem" }}>
        <Field label="Enquiry" htmlFor="enquiry">
          <textarea id="enquiry" name="enquiry" className="spp-input" rows={4} />
        </Field>
      </div>

      <div className="contact-grid" style={{ marginTop: "1.75rem" }}>
        <Field label="Company name" htmlFor="company">
          <input id="company" name="company" className="spp-input" />
        </Field>
        <Field label="Vat/ID" htmlFor="vat">
          <input id="vat" name="vat" className="spp-input" />
        </Field>
        <Field label="Country/Region" htmlFor="country">
          <select id="country" name="country" className="spp-input" defaultValue="">
            <option value="" disabled>
              Select&hellip;
            </option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Address" htmlFor="address">
          <input id="address" name="address" className="spp-input" />
        </Field>
        <Field label="City" htmlFor="city">
          <input id="city" name="city" className="spp-input" />
        </Field>
        <Field label="Zip / Postal code" htmlFor="zip">
          <input id="zip" name="zip" className="spp-input" />
        </Field>
      </div>

      <button type="submit" className="spp-submit" style={{ marginTop: "2.5rem" }}>
        Submit
      </button>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem 2rem;
        }
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="spp-field-label" htmlFor={htmlFor}>
        {label}
        {required && <span className="req">*</span>}
      </label>
      {children}
    </div>
  );
}
