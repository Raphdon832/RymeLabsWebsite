"use client";

import { useEffect, useMemo, useState } from "react";
import { useProjectIntakes } from "@/hooks/useProjectIntakes";
import { useMessages } from "@/hooks/useMessages";
import { useAuth } from "@/context/AuthContext";
import { MessageAttachment } from "@/types/messages";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

type ThreadOption = {
  id: string;
  label: string;
  meta: string;
};

export default function DashboardMessagesPage() {
  const { user } = useAuth();
  const { intakes } = useProjectIntakes();
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [pendingAttachments, setPendingAttachments] = useState<MessageAttachment[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const threadOptions: ThreadOption[] = useMemo(() => {
    const base: ThreadOption[] = [
      {
        id: "general",
        label: "General inbox",
        meta: "Direct submissions & follow-ups",
      },
    ];

    const intakeOptions = intakes.map((intake) => ({
      id: intake.id,
      label: intake.name || "New inquiry",
      meta: `${intake.serviceType} · ${intake.budget}`,
    }));

    return [...base, ...intakeOptions];
  }, [intakes]);

  useEffect(() => {
    if (!activeThread && threadOptions.length > 0) {
      setActiveThread(threadOptions[0].id);
    }
  }, [activeThread, threadOptions]);

  const projectScope = activeThread && activeThread !== "general"
    ? intakes.find((item) => item.id === activeThread)
    : null;

  const { messages, loading, error, sendMessage, sending } = useMessages(
    activeThread && activeThread !== "general" ? activeThread : undefined
  );

  const handleUpload = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Upload failed");
      }

      setPendingAttachments((prev) => [
        ...prev,
        {
          name: payload.originalFilename || file.name,
          url: payload.url,
          bytes: payload.bytes,
          format: payload.format,
        },
      ]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to upload";
      setUploadError(message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!body.trim() || sending) return;
    try {
      await sendMessage({
        sender: user?.email || "team@rymelabs.com",
        senderType: "team",
        body: body.trim(),
        attachments: pendingAttachments,
      });
      setBody("");
      setPendingAttachments([]);
    } catch {
      /* errors are surfaced via hook */
    }
  };

  if (!activeThread) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-white/70">
        Loading conversations...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-6">
      <aside className="rounded-3xl border border-white/10 bg-black/40 p-6 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-2">Inbox</p>
          <h2 className="text-2xl font-semibold">Conversations</h2>
        </div>
        <div className="space-y-3">
          {threadOptions.map((thread) => {
            const isActive = thread.id === activeThread;
            return (
              <button
                key={thread.id}
                onClick={() => setActiveThread(thread.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-colors ${
                  isActive
                    ? "border-white/40 bg-white/10"
                    : "border-white/10 bg-transparent hover:border-white/30"
                }`}
              >
                <p className="font-semibold text-sm">{thread.label}</p>
                <p className="text-xs text-white/50">{thread.meta}</p>
              </button>
            );
          })}
        </div>
      </aside>

      <section className="rounded-3xl border border-white/10 bg-black/30 p-6 flex flex-col min-h-[600px]">
        <div className="flex flex-col gap-2 border-b border-white/10 pb-4 mb-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">Thread</p>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
            <div>
              <h2 className="text-2xl font-semibold">
                {projectScope ? projectScope.name || "Unnamed inquiry" : "General inbox"}
              </h2>
              <p className="text-sm text-white/60">
                {projectScope ? `${projectScope.serviceType} · ${projectScope.budget}` : "Site-wide inquiries"}
              </p>
            </div>
            {projectScope && (
              <p className="text-xs text-white/40">
                Contact: <span className="text-white/70">{projectScope.email}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
          {loading && <p className="text-sm text-white/60">Loading messages...</p>}
          {!loading && messages.length === 0 && (
            <p className="text-sm text-white/60">No messages yet. Start the thread below.</p>
          )}
          {messages.map((message) => {
            const isTeam = message.senderType === "team";
            return (
              <div key={message.id} className={`flex ${isTeam ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xl rounded-2xl border px-4 py-3 text-sm space-y-2 ${
                    isTeam
                      ? "bg-white text-black border-white/0"
                      : "bg-white/5 text-white border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between gap-6">
                    <p className={`text-xs uppercase tracking-[0.3em] ${isTeam ? "text-black/60" : "text-white/50"}`}>
                      {isTeam ? "RymeLabs" : "Client"}
                    </p>
                    <span className={`text-[10px] ${isTeam ? "text-black/50" : "text-white/50"}`}>
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                  <p className="leading-relaxed whitespace-pre-wrap">{message.body}</p>
                  {message.attachments?.length > 0 && (
                    <div className="space-y-1">
                      {message.attachments.map((attachment) => (
                        <a
                          key={attachment.url}
                          href={attachment.url}
                          target="_blank"
                          className={`inline-flex items-center gap-2 text-xs underline ${
                            isTeam ? "text-black" : "text-white"
                          }`}
                        >
                          ↗ {attachment.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 space-y-4">
          <textarea
            rows={3}
            value={body}
            placeholder="Drop a note or status update..."
            onChange={(event) => setBody(event.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-white/40"
          />
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/70 hover:text-white cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    void handleUpload(file);
                    event.target.value = "";
                  }
                }}
              />
              {uploading ? "Uploading" : "Attach file"}
            </label>
            <button
              onClick={handleSubmit}
              disabled={!body.trim() || sending}
              className="px-6 py-2 rounded-full bg-white text-black font-semibold disabled:opacity-40"
            >
              {sending ? "Sending" : "Send"}
            </button>
            {(error || uploadError) && (
              <p className="text-xs text-rose-300">{error || uploadError}</p>
            )}
          </div>
          {pendingAttachments.length > 0 && (
            <div className="flex flex-wrap gap-2 text-xs text-white/70">
              {pendingAttachments.map((attachment) => (
                <span
                  key={attachment.url}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20"
                >
                  {attachment.name}
                  <button
                    className="text-white/50 hover:text-white"
                    onClick={() =>
                      setPendingAttachments((prev) => prev.filter((item) => item.url !== attachment.url))
                    }
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
