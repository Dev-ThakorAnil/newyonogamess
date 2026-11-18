"use client";

﻿import { useState, useCallback } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection({
  faq,
  gameTitle,
}: {
  faq: FAQItem[];
  gameTitle: string;
}) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggleItem = useCallback((index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  if (!faq || faq.length === 0) return null;

  const validFaq = faq.filter((item) => item.question?.trim() && item.answer?.trim());
  if (validFaq.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: validFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h2
        className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-green-500 shrink-0"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        Frequently Asked Questions
      </h2>

      <div className="space-y-2" role="region" aria-label={`Frequently asked questions about ${gameTitle}`}>
        {validFaq.map((item, index) => {
          const isOpen = openIndices.has(index);
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-btn-${index}`;

          return (
            <div key={index} className="border border-border rounded-lg overflow-hidden glass-panel">
              <button
                id={buttonId}
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-muted/50 transition-colors cursor-pointer"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="text-sm pr-4 font-semibold text-foreground">{item.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-muted-foreground transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 text-green-500" : ""
                  }`}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`overflow-hidden transition-all duration-200 ${
                  isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
