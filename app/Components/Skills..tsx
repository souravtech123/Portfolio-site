
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

const skillGroups = [
  {
    number: "01",
    title: "Frontend",
    description: "Interfaces that feel intuitive and work beautifully.",
    skills: ["JavaScript", "React.js", "Next.js", "Tailwind CSS"],
  },
  {
    number: "02",
    title: "Backend",
    description: "APIs, application logic, and server-side systems.",
    skills: ["Node.js", "Express.js", "Go (Golang)", "REST APIs"],
  },
  {
    number: "03",
    title: "Database",
    description: "Data modelling, storage, and querying.",
    skills: ["MongoDB", "PostgreSQL", "SQLite", "Prisma"],
  },
  {
    number: "04",
    title: "Tools & Platforms",
    description: "Tools I use to build, ship, and maintain software.",
    skills: ["Git", "GitHub", "Vercel", "Linux", "AWS Basics"],
  },
];

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
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
              05 / Skills & technology
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.08] tracking-[-0.055em] sm:text-5xl md:text-7xl">
              The tools
              <br />
              <span className="text-[#3547F5]">behind the work.</span>
            </h2>
          </div>

          <p className="max-w-sm font-[family-name:var(--font-body)] text-base leading-7 text-[#566078]">
            Technologies I use to turn ideas into functional products, from
            crafting interfaces to building backend systems.
          </p>
        </motion.div>

        {/* Skill groups */}
        <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.number}
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="border-b border-[#D5DAF4] py-8 first:pt-0 md:py-10 md:first:pt-0"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-3 font-[family-name:var(--font-body)] text-xs tracking-[0.18em] text-[#3547F5]">
                    / {group.number}
                  </p>

                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
                    {group.title}
                  </h3>
                </div>

                <span className="mt-2 text-2xl text-[#3547F5]" aria-hidden="true">
                  ↗
                </span>
              </div>

              <p className="mb-6 font-[family-name:var(--font-body)] text-sm leading-6 text-[#566078]">
                {group.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-[#D5DAF4] px-3 py-2 font-[family-name:var(--font-body)] text-sm text-[#121A30] transition-colors duration-200 hover:border-[#3547F5] hover:text-[#3547F5]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Learning note */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-col gap-4 border-l-2 border-[#3547F5] pl-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight">
              Always exploring what&apos;s next.
            </p>
            <p className="mt-2 font-[family-name:var(--font-body)] text-sm leading-6 text-[#566078]">
              Currently expanding my knowledge through hands-on development.
            </p>
          </div>

          <span className="w-fit font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-widest text-[#3547F5]">
            Learn · Build · Improve
          </span>
        </motion.div>
      </div>
    </section>
  );
}
