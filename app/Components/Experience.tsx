
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { useContactModal } from "../context/ContactModalContext";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const experiences = [
  {
    number: "01",
    role: "Software Development Intern",
    company: "Coal India Limited",
    department: "Contract Management Cell (CMC)",
    period: "Internship",
    type: "Professional Experience",
    description:
      "Contributed to the development of a Tender Management System to support digital workflows for tender and contract management.",
    contributions: [
      "Developed application interfaces using React.",
      "Built backend functionality with Express.js.",
      "Worked with SQLite and Electron.js for a desktop application.",
    ],
    technologies: ["React", "Express.js", "SQLite", "Electron.js"],
  },
  {
    number: "02",
    role: "Technical Head",
    company: "Xavier Tech Byte Society",
    department: "St. Xavier's College, Ranchi",
    period: "2026 – Present",
    type: "Leadership & Community",
    description:
      "Leading a student technology community focused on collaborative learning, product development, and creating practical opportunities for aspiring developers.",
    contributions: [
      "Led development initiatives for the society's Member Management Portal.",
      "Coordinated student teams around real-world product ideas.",
      "Helped organize technical events, workshops, and startup-focused initiatives.",
    ],
    technologies: ["Next.js", "React", "Go", "Team Leadership"],
  },
];

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();
  const { openContactModal } = useContactModal();

  return (
    <section
      id="experience"
      className={`${display.variable} ${body.variable} bg-[#ECEEF3] px-6 py-24 text-[#121A30] sm:px-10 md:py-32`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col justify-between gap-6 border-b border-[#D5DAF4] pb-10 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-5 font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.22em] text-[#3547F5]">
              04 / Experience
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.08] tracking-[-0.055em] sm:text-5xl md:text-7xl">
              Where I&apos;ve
              <br />
              <span className="text-[#3547F5]">made an impact.</span>
            </h2>
          </div>

          <p className="max-w-sm font-[family-name:var(--font-body)] text-base leading-7 text-[#566078]">
            From building software in a professional environment to leading
            student-led product initiatives, each experience shapes how I build.
          </p>
        </motion.div>

        {/* Experience timeline */}
        <div className="relative">
          <div className="absolute bottom-8 left-[15px] top-8 hidden w-px bg-[#D5DAF4] sm:block" />

          <div className="space-y-5">
            {experiences.map((experience, index) => (
              <motion.article
                key={experience.number}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 20 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative grid gap-7 border border-[#D5DAF4] p-6 sm:p-9 md:grid-cols-[190px_1fr] md:gap-12 md:p-10"
              >
                {/* Left metadata */}
                <div className="relative">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center border border-[#3547F5] bg-[#ECEEF3] font-[family-name:var(--font-body)] text-xs font-semibold text-[#3547F5]">
                      {experience.number}
                    </span>

                    <span className="font-[family-name:var(--font-body)] text-xs uppercase tracking-wider text-[#566078]">
                      {experience.type}
                    </span>
                  </div>

                  <p className="font-[family-name:var(--font-body)] text-sm font-medium text-[#121A30]">
                    {experience.period}
                  </p>

                  <p className="mt-2 font-[family-name:var(--font-body)] text-sm leading-6 text-[#566078]">
                    {experience.department}
                  </p>
                </div>

                {/* Main content */}
                <div>
                  <p className="mb-2 font-[family-name:var(--font-body)] text-sm font-medium text-[#3547F5]">
                    {experience.company}
                  </p>

                  <h3 className="mb-5 font-[family-name:var(--font-display)] text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl">
                    {experience.role}
                  </h3>

                  <p className="mb-7 max-w-3xl font-[family-name:var(--font-body)] text-base leading-7 text-[#566078]">
                    {experience.description}
                  </p>

                  <div className="mb-8">
                    <p className="mb-4 font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.16em] text-[#121A30]">
                      Key contributions
                    </p>

                    <ul className="space-y-3">
                      {experience.contributions.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 font-[family-name:var(--font-body)] text-sm leading-6 text-[#566078]"
                        >
                          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-[#3547F5]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="border border-[#D5DAF4] px-3 py-1.5 font-[family-name:var(--font-body)] text-xs text-[#121A30]"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Closing note */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-col gap-4 border-t border-[#D5DAF4] pt-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-[family-name:var(--font-body)] text-sm text-[#566078]">
            Always learning. Always building.
          </p>

          <button
            onClick={openContactModal}
            className="w-fit font-[family-name:var(--font-body)] text-sm font-semibold text-[#3547F5] transition-colors hover:text-[#121A30]"
          >
            Let&apos;s work together ↗
          </button>
        </motion.div>
      </div>
    </section>
  );
}
