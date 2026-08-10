"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Currency = "INR" | "USD";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  /** Pick the right literal for the active currency: p('₹649', '$15.49'). */
  p: (inr: string, usd: string) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("INR");
  const p = useCallback(
    (inr: string, usd: string) => (currency === "USD" ? usd : inr),
    [currency],
  );
  const value = useMemo(
    () => ({ currency, setCurrency, p }),
    [currency, p],
  );
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
}
