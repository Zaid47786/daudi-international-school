import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  { q: "What classes does DIS offer?", a: "DIS offers classes from Nursery (Montessori) all the way through Class X — a complete English-medium school journey under one roof in Muzaffarpur." },
  { q: "Is DIS affiliated with CBSE?", a: "DIS follows a rigorous English-medium curriculum aligned with national educational standards. Our academic structure mirrors CBSE guidelines, with a strong emphasis on conceptual learning and holistic development." },
  { q: "Where exactly is DIS located in Muzaffarpur?", a: "We are located at Shafi Manzil, Daudi Market, Motijheel, Muzaffarpur, Bihar 842001 — near Motijheel Park, centrally situated and easily reachable from Saraiyaganj, Brahmpura, Juran Chapra, and all major areas of the city." },
  { q: "How much are the school fees?", a: "DIS offers transparent and affordable fee structures designed to be accessible to families across income levels. Scholarship programs are available for deserving students. Contact our admissions office for current fee details." },
  { q: "Does DIS have smart classrooms?", a: "Yes. DIS has invested in modern classroom technology including projectors and interactive learning tools to make education more engaging and effective for every child." },
  { q: "Are admissions currently open?", a: "Yes! Admissions for the 2026–27 academic year are open across all classes. We recommend applying early as seats are limited. Visit our Admissions page to get started." },
  { q: "Does the school offer scholarships for underprivileged students?", a: "Absolutely. Under the Daudi Welfare Trust mission, DIS has scholarship and fee-waiver programs to ensure no child is denied quality education due to financial constraints." },
  { q: "Is there a school near Motijheel with English medium instruction?", a: "Yes — Daudi International School is located right at Motijheel, Muzaffarpur. It is one of the very few non-profit, English-medium schools in the area, serving students from Nursery to Class X." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-16 sm:py-28" style={{ backgroundColor: "var(--cream)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="mb-10">
          <p className="label-stamp text-cobalt mb-3">Have questions?</p>
          <h2 className="font-fraunces font-bold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "var(--cobalt-deep)" }}>
            Frequently asked questions
          </h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.07)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-sm leading-snug" style={{ color: "var(--ink)" }}>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className="shrink-0 transition-transform duration-200"
                  style={{ color: "var(--ink-muted)", transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {open === i && (
                <p className="px-5 pb-4 text-[13.5px] leading-[1.8]" style={{ color: "var(--ink-soft)" }}>{faq.a}</p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
            Still have questions?{" "}
            <Link to="/contact" className="font-semibold underline" style={{ color: "var(--cobalt)" }}>Contact us</Link>
          </p>
        </div>
      </div>
    </section>
  );
}