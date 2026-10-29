
"use client";

import Link from "next/link";
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

const projects = [
  {
    number: "01",
    name: "Build-Mate",
    category: "Project Collaboration Platform",
    description:
      "A platform that connects developers, helps them find project teammates, and turns ideas into real-world products through collaboration.",
    stack: ["Next.js", "Go", "PostgreSQL"],
    year: "2026",
    live: "https://build-mate-main.vercel.app/",
    featured: true,
    visual: "build-mate",
  },
  {
  number: "02",
  name: "XTS Member Portal",
  category: "Society Management Platform",
  description:
    "A centralized platform for managing society members, registrations, events, and activities, streamlining operations and improving member engagement at Xavier TechByte Society.",
  stack: ["React", "Node.js", "MongoDB"],
  year: "2026",
  live: "https://xts-member-portal.vercel.app/",
  featured: false,
  visual: "second",
},
];

function ProjectVisual({ type }: { type: string }) {
  if (type === "build-mate") {
    return (
      <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-[#3547F5] p-7 sm:min-h-[390px]">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/20" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-white/20" />

        <div className="relative w-full max-w-sm rotate-[-3deg] border border-[#D5DAF4] bg-[#ECEEF3] p-6 shadow-2xl transition-transform duration-500 group-hover:rotate-0 sm:p-8">
          <div className="mb-8 flex items-center justify-between border-b border-[#D5DAF4] pb-4">
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold">
              build-mate
            </span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#3547F5]" />
          </div>

          <p className="mb-3 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.18em] text-[#566078]">
            Find your people
          </p>
          <h3 className="mb-7 font-[family-name:var(--font-display)] text-3xl leading-tight tracking-[-0.05em] sm:text-4xl">
            Build ideas
            <br />
            into reality.
          </h3>

          <div className="mb-3 h-2 w-full bg-[#D5DAF4]" />
          <div className="mb-7 h-2 w-3/5 bg-[#D5DAF4]" />

          <div className="flex items-center justify-between bg-[#3547F5] px-4 py-3 text-white">
            <span className="font-[family-name:var(--font-body)] text-xs">
              Start collaborating
            </span>
            <span aria-hidden="true">↗</span>
          </div>
        </div>

        <span className="absolute bottom-5 right-6 font-[family-name:var(--font-body)] text-xs tracking-widest text-white/75">
          PROJECT / 01
        </span>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-[#D5DAF4] p-7 sm:min-h-[390px]">
      <div className="absolute left-8 top-8 h-24 w-24 border border-[#3547F5]/20" />
      <div className="absolute bottom-8 right-8 h-36 w-36 rounded-full border border-[#3547F5]/20" />

      <div className="relative w-full max-w-sm border border-[#D5DAF4] bg-[#ECEEF3] p-6 shadow-xl transition-transform duration-500 group-hover:translate-y-[-4px] sm:p-8">
        <div className="mb-8 flex items-center justify-between border-b border-[#D5DAF4] pb-4">
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold">
            project / 02
          </span>
          <span className="text-[#3547F5]">✳</span>
        </div>

        <div className="mb-5 flex gap-3">
          <div className="h-12 w-12 bg-[#3547F5]" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-2 w-4/5 bg-[#D5DAF4]" />
            <div className="h-2 w-3/5 bg-[#D5DAF4]" />
          </div>
        </div>

        <div className="mb-3 h-20 border border-[#D5DAF4] p-3">
          <div className="h-2 w-2/5 bg-[#3547F5]/70" />
          <div className="mt-3 h-2 w-4/5 bg-[#D5DAF4]" />
          <div className="mt-2 h-2 w-3/5 bg-[#D5DAF4]" />
        </div>

        <div className="h-9 bg-[#121A30]" />
      </div>

      <span className="absolute bottom-5 right-6 font-[family-name:var(--font-body)] text-xs tracking-widest text-[#566078]">
        PROJECT / 02
      </span>
    </div>
  );
}

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className={`${display.variable} ${body.variable} bg-[#ECEEF3] px-6 py-24 text-[#121A30] sm:px-10 md:py-32`}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col justify-between gap-6 border-b border-[#D5DAF4] pb-10 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-5 font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.22em] text-[#3547F5]">
              03 / Selected work
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.08] tracking-[-0.055em] sm:text-5xl md:text-7xl">
              A few things
              <br />
              I&apos;ve <span className="text-[#3547F5]">built.</span>
            </h2>
          </div>

          <p className="max-w-sm font-[family-name:var(--font-body)] text-base leading-7 text-[#566078]">
            Two projects. Real problems. A continuous process of learning,
            experimenting, and building better software.
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.number}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group overflow-hidden border border-[#D5DAF4]"
            >
              <div
                className={`grid ${
                  index % 2 === 1 ? "md:grid-cols-[0.95fr_1.05fr]" : "md:grid-cols-[1.05fr_0.95fr]"
                }`}
              >
                <div
                  className={`flex flex-col justify-between p-7 sm:p-10 md:p-12 ${
                    index % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <div>
                    <div className="mb-10 flex items-center justify-between">
                      <span className="font-[family-name:var(--font-display)] text-2xl text-[#3547F5]">
                        {project.number}
                      </span>
                      <span className="font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-[#566078]">
                        {project.year}
                      </span>
                    </div>

                    <p className="mb-3 font-[family-name:var(--font-body)] text-sm text-[#3547F5]">
                      {project.category}
                    </p>

                    <h3 className="mb-5 font-[family-name:var(--font-display)] text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                      {project.name}
                      <span className="text-[#3547F5]">.</span>
                    </h3>

                    <p className="max-w-lg font-[family-name:var(--font-body)] text-base leading-7 text-[#566078]">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-9">
                    <div className="mb-7 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="border border-[#D5DAF4] px-3 py-1.5 font-[family-name:var(--font-body)] text-xs text-[#121A30]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.live ? (
                      <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 font-[family-name:var(--font-body)] text-sm font-semibold transition-colors hover:text-[#3547F5]"
                      >
                        Explore project
                        <span
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-1"
                        >
                          ↗
                        </span>
                      </Link>
                    ) : (
                      <span className="font-[family-name:var(--font-body)] text-sm text-[#566078]">
                        Add your project link
                      </span>
                    )}
                  </div>
                </div>

                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <ProjectVisual type={project.visual} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-between gap-5 border-t border-[#D5DAF4] pt-8 sm:flex-row sm:items-center">
          <p className="font-[family-name:var(--font-body)] text-sm text-[#566078]">
            Interested in building something together?
          </p>

          <Link
            href="#contact"
            className="inline-flex w-fit items-center gap-3 bg-[#121A30] px-5 py-3.5 font-[family-name:var(--font-body)] text-sm font-semibold text-white transition-colors hover:bg-[#3547F5]"
          >
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
