
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const education = [
  {
    number: "01",
    degree: "B.Sc. in Computer Applications",
    institution: "St. Xavier's College, Ranchi",
    period: "2024 – 2027",
    status: "Undergraduate",
    description:
      "Building a foundation in computer applications, programming, software development, and computational problem-solving.",
    highlights: [
      "Software Development",
      "Computer Science Fundamentals",
      "Data Structures & Algorithms",
    ],
  },
];

export default function Education() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="education"
      className={`${display.variable} ${body.variable} bg-[#ECEEF3] px-6 py-24 text-[#121A30] sm:px-10 md:py-32`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col justify-between gap-6 border-b border-[#D5DAF4] pb-10 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-5 font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.22em] text-[#3547F5]">
              06 / Education
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.08] tracking-[-0.055em] sm:text-5xl md:text-7xl">
              Learning is
              <br />
              <span className="text-[#3547F5]">part of the process.</span>
            </h2>
          </div>

          <p className="max-w-sm font-[family-name:var(--font-body)] text-base leading-7 text-[#566078]">
            The academic foundation behind my journey into software
            development and technology.
          </p>
        </motion.div>

        {/* Education entry */}
        {education.map((item) => (
          <motion.article
            key={item.number}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="grid gap-8 border border-[#D5DAF4] p-7 sm:p-10 md:grid-cols-[220px_1fr] md:gap-14 md:p-12"
          >
            {/* Left column */}
            <div>
              <p className="mb-5 font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.18em] text-[#3547F5]">
                / {item.number}
              </p>

              <p className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight">
                {item.period}
              </p>

              <span className="mt-4 inline-block border border-[#D5DAF4] px-3 py-1.5 font-[family-name:var(--font-body)] text-xs text-[#566078]">
                {item.status}
              </span>
            </div>

            {/* Main details */}
            <div>
              <p className="mb-3 font-[family-name:var(--font-body)] text-sm font-medium text-[#3547F5]">
                {item.institution}
              </p>

              <h3 className="mb-5 font-[family-name:var(--font-display)] text-3xl font-medium leading-tight tracking-[-0.045em] sm:text-4xl">
                {item.degree}
              </h3>

              <p className="mb-8 max-w-2xl font-[family-name:var(--font-body)] text-base leading-7 text-[#566078]">
                {item.description}
              </p>

              <div className="border-t border-[#D5DAF4] pt-6">
                <p className="mb-4 font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.16em]">
                  Areas of study
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="border border-[#D5DAF4] px-3 py-2 font-[family-name:var(--font-body)] text-sm text-[#121A30] transition-colors hover:border-[#3547F5] hover:text-[#3547F5]"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}

        {/* Closing line */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex items-center gap-4"
        >
          <span className="h-px flex-1 bg-[#D5DAF4]" />
          <p className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.16em] text-[#566078]">
            Theory meets practice
          </p>
          <span className="h-px flex-1 bg-[#D5DAF4]" />
        </motion.div>
      </div>
    </section>
  );
}
