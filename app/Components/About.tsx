
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
} from "next/font/google";
import { useContactModal } from "../context/ContactModalContext";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
});

const principles = [
  {
    number: "01",
    title: "Think in systems",
    description:
      "I enjoy understanding how interfaces, APIs, and databases connect to create complete, reliable products.",
  },
  {
    number: "02",
    title: "Solve real problems",
    description:
      "For me, development is about more than writing code. It is about turning real problems into useful digital solutions.",
  },
  {
    number: "03",
    title: "Build and keep learning",
    description:
      "Every project is an opportunity to explore new technologies, improve my engineering skills, and build something better.",
  },
];

export default function About() {
  const reduce = useReducedMotion();
  const { openContactModal } = useContactModal();

  return (
    <section
      id="about"
      className={`${body.className} relative overflow-hidden bg-[#ECEEF3] py-24 text-[#121A30] sm:py-32`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-between gap-6 border-b border-[#D5DAF4] pb-8 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#3547F5]">
              01 / About me
            </p>

            <h2
              className={`${display.className} max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl`}
            >
              More than code.
              <br />
              <span className="text-[#3547F5]">
                A mindset for building.
              </span>
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-7 text-[#566078]">
            Curious by nature. Driven by problems worth solving.
            Always building toward something better.
          </p>
        </motion.div>

        {/* About Content */}
        <div className="grid gap-14 py-12 md:py-16 lg:grid-cols-12 lg:gap-16">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <p className="text-lg leading-9 text-[#303950] sm:text-xl">
              I&apos;m Sourav, a full stack developer in India who enjoys
              building digital products from the ground up — from designing
              databases and developing backend services to creating
              intuitive user interfaces.
            </p>

            <p className="mt-6 text-base leading-8 text-[#566078]">
              I learn by building, experimenting, and solving problems
              through real projects. I&apos;m interested in how technology
              can bring ideas to life, simplify everyday challenges, and
              create meaningful experiences for people.
            </p>

            <Link
              href="#projects"
              className="mt-8 inline-flex items-center gap-2 rounded-sm border-b border-[#3547F5]/40 pb-2 text-sm font-semibold transition-colors hover:border-[#3547F5] hover:text-[#3547F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3547F5]"
            >
              Explore my work
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>

          {/* Principles */}
          <div className="lg:col-span-7">
            {principles.map((item, index) => (
              <motion.article
                key={item.number}
                initial={{
                  opacity: 0,
                  x: reduce ? 0 : 18,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
                className="grid grid-cols-[3rem_1fr] gap-4 border-t border-[#D5DAF4] py-7 sm:grid-cols-[4rem_1fr] sm:gap-6"
              >
                <span className="pt-1 text-xs font-medium tracking-wider text-[#3547F5]">
                  {item.number}
                </span>

                <div>
                  <h3
                    className={`${display.className} text-xl font-semibold tracking-tight sm:text-2xl`}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-7 text-[#566078] sm:text-base">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}

            <div className="border-t border-[#D5DAF4]" />
          </div>
        </div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="flex flex-col justify-between gap-6 border border-[#D5DAF4] bg-white/40 p-7 sm:flex-row sm:items-center sm:p-9"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3547F5]">
              What drives me
            </p>

            <h3
              className={`${display.className} mt-3 text-2xl font-semibold tracking-tight sm:text-3xl`}
            >
              Turning ideas into working products.
            </h3>
          </div>

          <button
            onClick={openContactModal}
            className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#3547F5] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#2535D6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3547F5]"
          >
            Let&apos;s connect
            <ArrowUpRight size={17} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
