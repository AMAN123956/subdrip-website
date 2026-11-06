"use client";

import { track } from "@vercel/analytics";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import SignupModal from "@/components/signup/SignupModal";
import { detectPlatform, EMAIL_RE, type Platform, type SignupStatus } from "@/lib/beta";

/**
 * One signup popup for the whole site. Every "Join the beta" button calls
 * `openSignup()`; the popup, its draft email and the finished state live
 * here so all buttons stay in step (after signup they read "You're in ✓"
 * and reopen the install steps).
 */

type SignupError = "invalid" | "rate" | "failed" | null;

type Done = { status: SignupStatus; email: string; platform: Platform };

type SignupCtx = {
  isOpen: boolean;
  openSignup: (placement: string) => void;
  close: () => void;
  platform: Platform;
  setPlatform: (p: Platform) => void;
  email: string;
  setEmail: (v: string) => void;
  honeypot: string;
  setHoneypot: (v: string) => void;
  sending: boolean;
  error: SignupError;
  done: Done | null;
  submit: () => Promise<void>;
  reset: () => void;
};

const Ctx = createContext<SignupCtx | null>(null);

const DONE_KEY = "subdrip.signup";
const CHANNEL_KEY = "subdrip.channel";

function safeGet(store: Storage | undefined, key: string): string | null {
  try {
    return store?.getItem(key) ?? null;
  } catch {
    return null;
  }
}
function safeSet(store: Storage | undefined, key: string, value: string) {
  try {
    store?.setItem(key, value);
  } catch {
    /* private mode — the popup still works, it just won't remember */
  }
}

/** First-touch acquisition channel: ?utm_source / ?ref, else the referrer host. */
function captureChannel(): string {
  const existing = safeGet(window.sessionStorage, CHANNEL_KEY);
  if (existing) return existing;
  const params = new URLSearchParams(window.location.search);
  let channel = params.get("utm_source") || params.get("ref") || "";
  if (!channel && document.referrer) {
    try {
      const host = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (host !== window.location.hostname) {
        if (/reddit\.com$|redd\.it$/.test(host)) channel = "reddit";
        else if (/^(t\.co|x\.com|twitter\.com)$/.test(host)) channel = "x";
        else channel = host;
      }
    } catch {
      /* malformed referrer — ignore */
    }
  }
  channel = (channel || "direct").toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 40) || "direct";
  safeSet(window.sessionStorage, CHANNEL_KEY, channel);
  return channel;
}

export function SignupProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>("android");
  const [email, setEmailRaw] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<SignupError>(null);
  const [done, setDone] = useState<Done | null>(null);
  const placementRef = useRef("unknown");
  const channelRef = useRef("direct");
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    channelRef.current = captureChannel();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- UA is client-only; SSR renders the Android default
    setPlatform(detectPlatform(navigator.userAgent));
    const saved = safeGet(window.localStorage, DONE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Done;
        if (parsed?.status && parsed?.email) setDone(parsed);
      } catch {
        /* stale/corrupt value — ignore */
      }
    }
  }, []);

  const openSignup = useCallback((placement: string) => {
    placementRef.current = placement;
    openerRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
    track("signup_open", { placement, channel: channelRef.current });
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    openerRef.current?.focus?.();
  }, []);

  const setEmail = useCallback((v: string) => {
    setEmailRaw(v);
    setError(null);
  }, []);

  const submit = useCallback(async () => {
    if (sending) return;
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError("invalid");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/testers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          platform,
          channel: channelRef.current,
          placement: placementRef.current,
          website: honeypot,
        }),
      });
      if (res.status === 422) return setError("invalid");
      if (res.status === 429) return setError("rate");
      const data = (await res.json().catch(() => null)) as { status?: SignupStatus } | null;
      if (!res.ok || !data?.status) throw new Error(`testers returned ${res.status}`);
      const result: Done = { status: data.status, email: trimmed, platform };
      setDone(result);
      safeSet(window.localStorage, DONE_KEY, JSON.stringify(result));
      track("beta_signup", {
        platform,
        status: data.status,
        channel: channelRef.current,
        placement: placementRef.current,
      });
    } catch {
      setError("failed");
    } finally {
      setSending(false);
    }
  }, [email, platform, honeypot, sending]);

  /** "Use a different email" — back to the form, keeping the platform. */
  const reset = useCallback(() => {
    setDone(null);
    setEmailRaw("");
    setError(null);
    try {
      window.localStorage.removeItem(DONE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<SignupCtx>(
    () => ({
      isOpen,
      openSignup,
      close,
      platform,
      setPlatform: (p) => {
        setPlatform(p);
        setError(null);
      },
      email,
      setEmail,
      honeypot,
      setHoneypot,
      sending,
      error,
      done,
      submit,
      reset,
    }),
    [isOpen, openSignup, close, platform, email, setEmail, honeypot, sending, error, done, submit, reset],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <SignupModal />
    </Ctx.Provider>
  );
}

export function useSignup(): SignupCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSignup must be used inside <SignupProvider>");
  return ctx;
}
