"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  MailOpen,
  Trash2,
  LogOut,
  RefreshCw,
  Inbox,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminDashboard() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionIds, setActionIds] = useState<Set<string>>(new Set());

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages");
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setMessages(data.messages || []);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const setActionPending = (id: string, pending: boolean) => {
    setActionIds((prev) => {
      const next = new Set(prev);
      pending ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const toggleRead = async (msg: Message) => {
    setActionPending(msg._id, true);
    try {
      await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msg._id, read: !msg.read }),
      });
      setMessages((prev) =>
        prev.map((m) => (m._id === msg._id ? { ...m, read: !m.read } : m))
      );
    } finally {
      setActionPending(msg._id, false);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message? This cannot be undone.")) return;
    setActionPending(id, true);
    try {
      await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (expandedId === id) setExpandedId(null);
    } finally {
      setActionPending(id, false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  const toggleExpand = async (msg: Message) => {
    if (expandedId === msg._id) {
      setExpandedId(null);
    } else {
      setExpandedId(msg._id);
      // Auto-mark as read when opened
      if (!msg.read) await toggleRead(msg);
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[#21262D] bg-[#0D1117]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3547F5]/15 ring-1 ring-[#3547F5]/30">
              <Inbox className="h-4 w-4 text-[#7F8BFF]" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-none tracking-tight">
                Messages
              </h1>
              <p className="mt-0.5 text-xs text-[#8B949E]">
                {unreadCount > 0
                  ? `${unreadCount} unread`
                  : "All caught up!"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchMessages}
              disabled={loading}
              title="Refresh"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8B949E] transition-colors hover:bg-[#21262D] hover:text-white disabled:opacity-40"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-[#30363D] px-3 py-1.5 text-xs font-medium text-[#8B949E] transition-colors hover:border-red-500/40 hover:text-red-400"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-[#3547F5]" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Inbox className="h-12 w-12 text-[#30363D]" />
            <h2 className="mt-4 text-lg font-semibold text-[#8B949E]">
              No messages yet
            </h2>
            <p className="mt-1 text-sm text-[#484F58]">
              Messages from your contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((msg) => {
              const isExpanded = expandedId === msg._id;
              const isPending = actionIds.has(msg._id);

              return (
                <div
                  key={msg._id}
                  className={`rounded-xl border transition-all ${
                    msg.read
                      ? "border-[#21262D] bg-[#161B22]"
                      : "border-[#3547F5]/30 bg-[#161B22] ring-1 ring-[#3547F5]/10"
                  }`}
                >
                  {/* Row header */}
                  <button
                    onClick={() => toggleExpand(msg)}
                    className="flex w-full items-center gap-4 px-4 py-3.5 text-left sm:px-5"
                  >
                    {/* Read indicator */}
                    <span className="shrink-0 text-[#3547F5]">
                      {msg.read ? (
                        <MailOpen className="h-4 w-4 text-[#484F58]" />
                      ) : (
                        <Mail className="h-4 w-4" />
                      )}
                    </span>

                    {/* Info */}
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span
                          className={`truncate text-sm font-semibold ${
                            msg.read ? "text-[#8B949E]" : "text-white"
                          }`}
                        >
                          {msg.name}
                        </span>
                        {!msg.read && (
                          <span className="shrink-0 rounded-full bg-[#3547F5] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                            NEW
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 flex items-center gap-2">
                        <span className="truncate text-xs text-[#484F58]">
                          {msg.email}
                        </span>
                        {msg.subject && (
                          <>
                            <span className="text-[#30363D]">·</span>
                            <span className="truncate text-xs text-[#8B949E]">
                              {msg.subject}
                            </span>
                          </>
                        )}
                      </span>
                    </span>

                    {/* Date + expand icon */}
                    <span className="ml-auto flex shrink-0 items-center gap-2 text-[#484F58]">
                      <span className="hidden text-xs sm:inline">
                        {formatDate(msg.createdAt)}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  {/* Expanded body */}
                  {isExpanded && (
                    <div className="border-t border-[#21262D] px-4 pb-4 pt-4 sm:px-5">
                      {/* Date on mobile */}
                      <p className="mb-3 text-xs text-[#484F58] sm:hidden">
                        {formatDate(msg.createdAt)}
                      </p>

                      {/* Message text */}
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#C9D1D9]">
                        {msg.message}
                      </p>

                      {/* Actions */}
                      <div className="mt-4 flex items-center gap-3">
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Your message")}`}
                          className="rounded-lg bg-[#3547F5] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#4C5CFF]"
                        >
                          Reply via Email
                        </a>
                        <button
                          onClick={() => toggleRead(msg)}
                          disabled={isPending}
                          className="rounded-lg border border-[#30363D] px-3 py-2 text-xs font-medium text-[#8B949E] transition-colors hover:border-[#3547F5]/40 hover:text-white disabled:opacity-40"
                        >
                          {msg.read ? "Mark as unread" : "Mark as read"}
                        </button>
                        <button
                          onClick={() => deleteMessage(msg._id)}
                          disabled={isPending}
                          className="ml-auto flex items-center gap-1.5 rounded-lg border border-[#30363D] px-3 py-2 text-xs font-medium text-[#8B949E] transition-colors hover:border-red-500/40 hover:text-red-400 disabled:opacity-40"
                        >
                          {isPending ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
