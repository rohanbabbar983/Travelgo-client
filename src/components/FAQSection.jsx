import { useState } from "react";
const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

const faqs = [
  {
    q: "Can I cancel my booking for free?",
    a: "Many properties offer free cancellation up to a certain date. We surface these policies clearly on the listing and at checkout.",
  },
  {
    q: "Do you charge hidden fees?",
    a: "No. Taxes and fees are shown upfront before you pay. What you see is what you pay.",
  },
  {
    q: "How do I contact support?",
    a: "Use in-app chat 24×7 or email support@yourbrand.com — we typically respond within minutes.",
  },
  {
    q: "Do prices change by device?",
    a: "Never. We maintain consistent pricing across devices and platforms.",
  },
];

function Item({ q, a, idx }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${idx}`;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <button
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-medium text-gray-900">{q}</span>
        <span
          className={`ml-4 inline-flex cursor-pointer h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6Z" />
          </svg>
        </span>
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={id}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="mt-3 text-gray-600">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-14 sm:py-20 bg-gray-50">
      <div className={container}>
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">FAQ</h2>
          <p className="mt-3 text-gray-600">
            Answers to common questions about bookings, payments, and support.
          </p>
        </div>

        <div className="mt-8 grid gap-4">
          {faqs.map((f, idx) => (
            <Item key={f.q} idx={idx} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
