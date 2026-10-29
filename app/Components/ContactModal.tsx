"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { useContactModal } from "../context/ContactModalContext";

export default function ContactModal() {
  const { isOpen, closeContactModal } = useContactModal();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Close on Escape key press and manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeContactModal();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeContactModal]);

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
      setFeedbackMessage(data.message || "Message sent successfully!");
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
    window.location.href = `mailto:souravsuman846@gmail.com?subject=${subjectEncoded}&body=${bodyEncoded}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeContactModal}
            className="fixed inset-0 bg-[#121A30]/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-[#D5DAF4] bg-[#ECEEF3] text-[#121A30] shadow-2xl"
          >
            {/* Top Accent bar */}
            <div className="h-1.5 w-full bg-[#3547F5]" />

            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3547F5]">
                    Contact Form
                  </span>
                  <h2
                    id="contact-modal-title"
                    className="mt-1 text-2xl font-bold tracking-tight text-[#121A30] sm:text-3xl"
                  >
                    Get in touch
                  </h2>
                  <p className="mt-1.5 text-sm text-[#566078]">
                    Send a direct message to{" "}
                    <span className="font-medium text-[#121A30]">
                      souravsuman846@gmail.com
                    </span>
                    .
                  </p>
                </div>

                <button
                  onClick={closeContactModal}
                  aria-label="Close dialog"
                  className="rounded-full p-2 text-[#566078] transition-colors hover:bg-[#D5DAF4] hover:text-[#121A30]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form or Success State */}
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="my-8 rounded-xl border border-green-200 bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-[#121A30]">
                    Thank you! Message Sent.
                  </h3>
                  <p className="mt-2 text-sm text-[#566078]">
                    {feedbackMessage}
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => setStatus("idle")}
                      className="rounded-lg border border-[#D5DAF4] bg-white px-5 py-2.5 text-sm font-semibold text-[#121A30] transition-colors hover:border-[#3547F5] hover:text-[#3547F5]"
                    >
                      Send another message
                    </button>
                    <button
                      onClick={closeContactModal}
                      className="rounded-lg bg-[#3547F5] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2535D6]"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {status === "error" && (
                    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm text-red-800">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                      <div className="flex-1">
                        <p>{feedbackMessage}</p>
                        <button
                          type="button"
                          onClick={handleMailtoFallback}
                          className="mt-1.5 inline-flex items-center gap-1.5 font-medium underline transition-opacity hover:opacity-80"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          Send directly via mail app instead
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="modal-name"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#121A30]"
                      >
                        Your Name <span className="text-[#3547F5]">*</span>
                      </label>
                      <input
                        id="modal-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="mt-1.5 w-full rounded-lg border border-[#D5DAF4] bg-white px-3.5 py-2.5 text-sm text-[#121A30] placeholder-[#566078]/50 shadow-sm transition-all focus:border-[#3547F5] focus:outline-none focus:ring-2 focus:ring-[#3547F5]/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="modal-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#121A30]"
                      >
                        Your Email <span className="text-[#3547F5]">*</span>
                      </label>
                      <input
                        id="modal-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="mt-1.5 w-full rounded-lg border border-[#D5DAF4] bg-white px-3.5 py-2.5 text-sm text-[#121A30] placeholder-[#566078]/50 shadow-sm transition-all focus:border-[#3547F5] focus:outline-none focus:ring-2 focus:ring-[#3547F5]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="modal-subject"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#121A30]"
                    >
                      Subject
                    </label>
                    <input
                      id="modal-subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry / Collaboration / Hiring"
                      className="mt-1.5 w-full rounded-lg border border-[#D5DAF4] bg-white px-3.5 py-2.5 text-sm text-[#121A30] placeholder-[#566078]/50 shadow-sm transition-all focus:border-[#3547F5] focus:outline-none focus:ring-2 focus:ring-[#3547F5]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="modal-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#121A30]"
                    >
                      Message <span className="text-[#3547F5]">*</span>
                    </label>
                    <textarea
                      id="modal-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, idea, or opportunity..."
                      className="mt-1.5 w-full resize-none rounded-lg border border-[#D5DAF4] bg-white px-3.5 py-2.5 text-sm text-[#121A30] placeholder-[#566078]/50 shadow-sm transition-all focus:border-[#3547F5] focus:outline-none focus:ring-2 focus:ring-[#3547F5]/20"
                    />
                  </div>

                  <div className="flex flex-col-reverse items-center justify-between gap-3 pt-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleMailtoFallback}
                      className="inline-flex items-center gap-1.5 text-xs text-[#566078] transition-colors hover:text-[#3547F5]"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Open directly in your mail app
                    </button>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3547F5] px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-[#2535D6] focus:outline-none focus:ring-2 focus:ring-[#3547F5] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
