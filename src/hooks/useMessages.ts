"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CreateMessagePayload, Message } from "@/types/messages";

export function useMessages(projectId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const endpoint = useMemo(() => {
    const base = "/api/messages";
    if (!projectId) return base;
    const params = new URLSearchParams({ projectId });
    return `${base}?${params.toString()}`;
  }, [projectId]);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Unable to load messages");
      }
      const data = await response.json();
      setMessages(Array.isArray(data.messages) ? data.messages.reverse() : []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const sendMessage = useCallback(
    async (payload: Omit<CreateMessagePayload, "projectId">) => {
      setSending(true);
      setError(null);
      try {
        const response = await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, projectId }),
        });

        const data = await response.json();
        if (!response.ok) {
          const errors = data?.errors ? Object.values<string>(data.errors).join(" · ") : data?.error;
          throw new Error(errors || "Unable to send message");
        }

        if (data?.message) {
          setMessages((prev) => [...prev, data.message as Message]);
        }

        return data.message as Message;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to send message";
        setError(message);
        throw err;
      } finally {
        setSending(false);
      }
    },
    [projectId]
  );

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return {
    messages,
    loading,
    error,
    refresh: fetchMessages,
    sendMessage,
    sending,
  };
}
