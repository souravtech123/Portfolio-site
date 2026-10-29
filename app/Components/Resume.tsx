
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

export default function Resume() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="resume"
      className={`${display.variable} ${body.variable} bg-[#ECEEF3] px-6 py-24 text-[#121A30] sm:px-10 md:py-32`}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden border border-[#D5DAF4] p-7 sm:p-12 md:p-16"
        >
          {/* Decorative graphic */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[#3547F5]/15 sm:h-80 sm:w-80"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-4 h-44 w-44 rounded-full border border-[#3547F5]/15 sm:h-60 sm:w-60"
          />

          <div className="relative z-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mb-6 font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.22em] text-[#3547F5]">
                07 / Resume
              </p>

              <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.08] tracking-[-0.055em] sm:text-5xl md:text-7xl">
                A closer look
                <br />
                at my <span className="text-[#3547F5]">journey.</span>
              </h2>

              <p className="mt-6 max-w-xl font-[family-name:var(--font-body)] text-base leading-7 text-[#566078]">
                Explore my experience, technical skills, education, and
                projects in one place. View my resume online or download a
                copy for future reference.
              </p>

              <p className="mt-5 font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-[#566078]">
                PDF document · Resume
              </p>
            </div>

            {/* Resume document icon */}
            <div
              aria-hidden="true"
              className="hidden h-44 w-36 rotate-3 flex-col justify-between border border-[#D5DAF4] bg-white p-5 shadow-sm md:flex"
            >
              <div>
                <div className="mb-3 h-2 w-12 bg-[#3547F5]" />
                <div className="mb-2 h-1.5 w-full bg-[#D5DAF4]" />
                <div className="mb-2 h-1.5 w-4/5 bg-[#D5DAF4]" />
                <div className="mb-5 h-1.5 w-3/5 bg-[#D5DAF4]" />
                <div className="mb-2 h-1.5 w-full bg-[#D5DAF4]" />
                <div className="mb-2 h-1.5 w-4/5 bg-[#D5DAF4]" />
              </div>
              <span className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-widest text-[#3547F5]">
                PDF / CV
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="relative z-10 mt-10 flex flex-col gap-3 border-t border-[#D5DAF4] pt-7 sm:flex-row">
            <a
              href="/Sourav_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#121A30] px-6 py-4 font-[family-name:var(--font-body)] text-sm font-semibold text-white transition-colors hover:bg-[#3547F5]"
            >
              View Resume
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href="/Sourav_Resume.pdf"
              download="Sourav_Resume.pdf"
              className="inline-flex items-center justify-center gap-3 border border-[#D5DAF4] px-6 py-4 font-[family-name:var(--font-body)] text-sm font-semibold text-[#121A30] transition-colors hover:border-[#3547F5] hover:text-[#3547F5]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-4 w-4"
              >
                <path
                  d="M12 3v12m0 0 4-4m-4 4-4-4M5 17v3h14v-3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
