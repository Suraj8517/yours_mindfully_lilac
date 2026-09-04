import { useState } from "react";
import { Plus } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    question: "Do I need therapy, or should I start with Clarity Connect? ",
    answer: [
      "If you're unsure where to begin, Clarity Connect is the ideal first step. It helps us understand your concerns and guide you toward the most suitable service. ",
    ],
  },
  {
    question: "Are sessions conducted online? ",
    answer:
      "Yes. All sessions are conducted online, allowing you to access support from wherever you are. ",
  },
  {
    question: "How do I know which service is right for me? ",
    answer:
      "Our team will guide you based on your current needs, goals, and emotional wellness journey.",
  },
  {
    question: "Can I join a program without taking therapy? ",
    answer:
      "Yes. Many of our self-paced modules, webinars, masterclasses, and emotional wellness programs can be accessed independently. ",
  },
  {
    question: "Are sessions confidential? ",
    answer:
      "Absolutely. Every conversation is conducted in a safe, respectful, and confidential environment. ",
  }
];

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-slate-200 py-5 first:pt-0 last:border-b-0 ">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 text-left"
      >
        <span className="text-base font-medium text-slate-900 sm:text-lg">
          {faq.question}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-900 transition-transform duration-300 ${
            isOpen ? "rotate-45 border-[#cbb8f2] bg-[#f1eaf9]" : ""
          }`}
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
        </span>
      </button>

      <div
        className="grid overflow-hidden transition-all duration-300 ease-in-out "
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? "0.75rem" : "0",
        }}
      >
        <div className="overflow-hidden">
          {Array.isArray(faq.answer) ? (
            <ul className="max-w-2xl list-disc space-y-2 pl-5 leading-relaxed text-slate-500 marker:text-teal-600">
              {faq.answer.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          ) : (
            <p className="max-w-2xl leading-relaxed text-slate-500">
              {faq.answer}
            </p>
          )}

          {faq.programs && (
            <div className="mt-3 flex flex-wrap gap-2">
              {faq.programs.map((program, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm text-teal-800"
                >
                  {program}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full pt-28 px-4 sm:px-8 bg-linear-to-b from-[#FCFBF8] to-[#fcfbf8] " id="faq">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2
            className="mt-4 text-3xl text-slate-900 sm:text-4xl"
            style={{
              fontFamily: "'Fraunces', serif",
              fontOpticalSizing: "auto",
              fontWeight: 600,
            }}
          >
            What people ask before joining
          </h2>
        </div>

        <div className="mt-12">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}