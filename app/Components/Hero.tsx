"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { useContactModal } from "../context/ContactModalContext";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

/*
  Palette
  paper   #ECEEF3   page
  ink     #121A30   text, primary button
  slate   #566078   secondary text
  cobalt  #3547F5   the one accent
  mist    #D5DAF4   photo backing, hairlines
*/

const stack = [
  { area: "Interfaces", tools: "React, Next.js" },
  { area: "Services", tools: "Go, Node.js" },
  { area: "Data", tools: "PostgreSQL" },
];

const headline = ["I build web products", "from the database", "to the interface."];

export default function Hero() {
  const reduce = useReducedMotion();
  const { openContactModal } = useContactModal();

  const line = {
    hidden: { y: reduce ? 0 : "105%" },
    visible: (i: number) => ({
      y: 0,
      transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  const fade = {
    hidden: { opacity: reduce ? 1 : 0 },
    visible: (d: number) => ({ opacity: 1, transition: { duration: 0.6, delay: d } }),
  };

  return (
    <section
      id="home"
      className={`${body.className} relative min-h-screen bg-[#ECEEF3] text-[#121A30]`}
    >
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 sm:px-10 lg:px-12">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-6" aria-label="Main">
          <Link
            href="#home"
            className={`${display.className} rounded text-xl font-semibold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3547F5]`}
          >
            Sourav
          </Link>

          <div className="flex items-center gap-8 text-sm">
            <div className="hidden items-center gap-8 text-[#566078] md:flex">
              {["About", "Projects"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="rounded transition-colors hover:text-[#121A30] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3547F5]"
                >
                  {item}
                </Link>
              ))}
            </div>
            <button
              onClick={openContactModal}
              className="rounded-full bg-[#3547F5] px-5 py-2.5 font-medium text-white transition-colors hover:bg-[#2535d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3547F5]"
            >
              Get in touch
            </button>
          </div>
        </nav>

        {/* Main */}
        <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-12 lg:gap-10 lg:py-6">
          {/* Text */}
          <div className="lg:col-span-7">
            <h1
              className={`${display.className} text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-6xl xl:text-[4.5rem]`}
            >
              <span className="sr-only">{headline.join(" ")}</span>
              {headline.map((text, i) => (
                <span key={text} aria-hidden="true" className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={line}
                    className="block"
                  >
                    {text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div initial="hidden" animate="visible" variants={fade} custom={0.7}>
              <p className="mt-7 max-w-[34rem] text-lg leading-8 text-[#566078]">
                I&apos;m Sourav, a full stack developer in India. I design the data,
                write the services, and build the screens, so a product works the
                same way behind the scenes as it looks on them.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link
                  href="#projects"
                  className="rounded-full bg-[#121A30] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#25304d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3547F5]"
                >
                  View my projects
                </Link>
                <a
                  href="https://github.com/souravtech123"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded text-sm font-medium underline decoration-[#3547F5]/40 underline-offset-[6px] transition-colors hover:decoration-[#3547F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3547F5]"
                >
                  GitHub
                </a>
                <a
                  href="http://www.linkedin.com/in/sourav-suman-2ba806317"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded text-sm font-medium underline decoration-[#3547F5]/40 underline-offset-[6px] transition-colors hover:decoration-[#3547F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3547F5]"
                >
                  LinkedIn
                </a>
              </div>

              {/* Stack, grouped by what each tool is used for */}
              <dl className="mt-12 max-w-[34rem] border-t border-[#D5DAF4]">
                {stack.map(({ area, tools }) => (
                  <div
                    key={area}
                    className="grid grid-cols-[7rem_1fr] border-b border-[#D5DAF4] py-3.5 text-sm"
                  >
                    <dt className="text-[#566078]">{area}</dt>
                    <dd className="font-medium">{tools}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none lg:justify-self-end lg:pl-8"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full bg-[#3547F5] sm:translate-x-6 sm:translate-y-6"
            />
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-[#D5DAF4]">
              <Image
                src="/images/sourav.png"
                alt="Portrait of Sourav"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 36vw"
                className="object-cover object-top"
              />
            </div>
          </motion.div>
        </div>

        {/* Footer line */}
        <div className="flex items-center justify-between gap-4 border-t border-[#D5DAF4] py-5 text-sm text-[#566078]">
          <p>Based in India, working with teams anywhere.</p>
          <Link
            href="#about"
            className="rounded transition-colors hover:text-[#121A30] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3547F5]"
          >
            About me
          </Link>
        </div>
      </div>
    </section>
  );
}