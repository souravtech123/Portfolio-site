"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { Send, CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { useContactModal } from "../context/ContactModalContext";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const email = "souravsuman846@gmail.com";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/souravtech123",
    number: "01",
  },
  {
    label: "LinkedIn",
    href: "http://www.linkedin.com/in/sourav-suman-2ba806317",
    number: "02",
  },
  {
    label: "Email",
    href: `mailto:${email}`,
    number: "03",
  },
];

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const { openContactModal } = useContactModal();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setFeedbackMessage(data.message || "Message received! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setFeedbackMessage(
        err.message || "Unable to send message. Please try again or email directly."
      );
    }
  };

  const handleMailtoFallback = () => {
    const subjectEncoded = encodeURIComponent(
      formData.subject || `Message from ${formData.name || "Portfolio Visitor"}`
    );
    const bodyEncoded = encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
  };

  return (
    <section
      id="contact"
      className={`${display.variable} ${body.variable} bg-[#ECEEF3] px-6 pb-8 pt-24 text-[#121A30] sm:px-10 md:pt-32`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Main contact block */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-[#121A30] px-7 py-12 text-[#ECEEF3] sm:px-12 sm:py-16 md:px-16 md:py-20"
        >
          {/* Decorative background elements */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10 sm:h-96 sm:w-96"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-12 h-52 w-52 rounded-full border border-white/10 sm:h-72 sm:w-72"
          />

          <div className="relative z-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Heading and info */}
            <div className="lg:col-span-6">
              <p className="mb-7 font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.22em] text-[#9DA8FF]">
                07 / Get in touch
              </p>

              <h2 className="font-[family-name:var(--font-display)] text-5xl font-medium leading-[1.02] tracking-[-0.06em] sm:text-6xl md:text-7xl">
                Have an idea?
                <br />
                <span className="text-[#7F8BFF]">Let&apos;s build it.</span>
              </h2>

              <p className="mt-7 max-w-xl font-[family-name:var(--font-body)] text-base leading-7 text-white/65 sm:text-lg">
                I&apos;m always interested in meaningful projects, new
                opportunities, and connecting with people who love building
                useful things. Send me a message using the form or reach out directly at{" "}
                <a
                  href={`mailto:${email}`}
                  className="font-medium text-[#9DA8FF] underline underline-offset-4 hover:text-white"
                >
                  {email}
                </a>
                .
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={openContactModal}
                  className="inline-flex items-center justify-center gap-3 bg-[#3547F5] px-6 py-3.5 font-[family-name:var(--font-body)] text-sm font-semibold text-white transition-colors hover:bg-[#4C5CFF]"
                >
                  Open Popup Form
                  <span aria-hidden="true">↗</span>
                </button>

                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center justify-center gap-3 border border-white/20 px-6 py-3.5 font-[family-name:var(--font-body)] text-sm font-semibold text-white transition-colors hover:border-[#9DA8FF] hover:text-[#9DA8FF]"
                >
                  Email Directly
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Embedded Contact Form */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium text-white">
                  Send a message
                </h3>
                <p className="mt-1 font-[family-name:var(--font-body)] text-xs text-white/60">
                  Fill in the form below to send me a message.
                </p>

                {status === "success" ? (
                  <div className="mt-6 rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-center">
                    <CheckCircle2 className="mx-auto h-10 w-10 text-green-400" />
                    <h4 className="mt-3 text-lg font-semibold text-white">
                      Message Sent!
                    </h4>
                    <p className="mt-1 text-xs text-white/70">
                      {feedbackMessage}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {status === "error" && (
                      <div className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                        <div>
                          <p>{feedbackMessage}</p>
                          <button
                            type="button"
                            onClick={handleMailtoFallback}
                            className="mt-1 underline"
                          >
                            Open in your mail client
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="inline-name"
                          className="block font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-wider text-white/80"
                        >
                          Name <span className="text-[#7F8BFF]">*</span>
                        </label>
                        <input
                          id="inline-name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#7F8BFF] focus:outline-none focus:ring-1 focus:ring-[#7F8BFF]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="inline-email"
                          className="block font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-wider text-white/80"
                        >
                          Email <span className="text-[#7F8BFF]">*</span>
                        </label>
                        <input
                          id="inline-email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#7F8BFF] focus:outline-none focus:ring-1 focus:ring-[#7F8BFF]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="inline-subject"
                        className="block font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-wider text-white/80"
                      >
                        Subject
                      </label>
                      <input
                        id="inline-subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Inquiry / Job Opportunity"
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#7F8BFF] focus:outline-none focus:ring-1 focus:ring-[#7F8BFF]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="inline-message"
                        className="block font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-wider text-white/80"
                      >
                        Message <span className="text-[#7F8BFF]">*</span>
                      </label>
                      <textarea
                        id="inline-message"
                        name="message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message here..."
                        className="mt-1.5 w-full resize-none rounded-lg border border-white/15 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#7F8BFF] focus:outline-none focus:ring-1 focus:ring-[#7F8BFF]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#3547F5] px-6 py-3 font-[family-name:var(--font-body)] text-sm font-semibold text-white transition-colors hover:bg-[#4C5CFF] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="relative z-10 mt-16 border-t border-white/15 pt-6 sm:mt-20">
            <p className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.18em] text-white/45">
              Find me around the web
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3">
              {socials.map((social) => (
                <Link
                  key={social.number}
                  href={social.href}
                  target={social.label === "Email" ? undefined : "_blank"}
                  rel={
                    social.label === "Email"
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="group flex items-center justify-between border-b border-white/15 py-5 transition-colors hover:text-[#9DA8FF] sm:mr-5 sm:border-b-0 sm:border-r sm:pr-5"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-[family-name:var(--font-body)] text-xs text-white/40">
                      {social.number}
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-xl">
                      {social.label}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="flex flex-col justify-between gap-4 py-7 font-[family-name:var(--font-body)] text-xs text-[#566078] sm:flex-row sm:items-center">
          <Link
            href="#home"
            className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[#121A30] transition-colors hover:text-[#3547F5]"
          >
            Sourav<span className="text-[#3547F5]">.</span>
          </Link>

          <p>Designed & built with intention.</p>

          <Link
            href="#home"
            className="w-fit transition-colors hover:text-[#3547F5]"
          >
            Back to top ↑
          </Link>
        </footer>
      </div>
    </section>
  );
}
