"use client";

import { useState } from "react";
import BrandLogo from "@/components/home/BrandLogo";
import { CATALOG_DEMO, inr } from "@/lib/homeData";

/** The "add by hand" demo: service → plan (price prefilled) → added. Real catalog plans. */
export default function CatalogPicker() {
  const [svc, setSvc] = useState<number | null>(null);
  const [plan, setPlan] = useState<number | null>(null);
  const step = svc === null ? 0 : plan === null ? 1 : 2;
  const s = svc === null ? null : CATALOG_DEMO[svc];

  return (
    <div className="hp-demo" aria-label="Try adding a subscription by hand">
      <div className="hp-dsteps" aria-hidden>
        {["1 · Service", "2 · Plan", "3 · Done"].map((t, i) => (
          <span key={t} className={i === step ? "on" : undefined}>{t}</span>
        ))}
      </div>
      {step === 0 && (
        <>
          <div className="hp-dsearch" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
            Search Netflix, Spotify…
          </div>
          <div className="hp-dgrid">
            {CATALOG_DEMO.map((c, i) => (
              <button key={c.slug} type="button" className="hp-dsvc" onClick={() => setSvc(i)}>
                <BrandLogo slug={c.slug} name="" />
                {c.name}
              </button>
            ))}
          </div>
        </>
      )}
      {step === 1 && s && (
        <>
          <div className="hp-mrow" style={{ marginBottom: 6 }}>
            <BrandLogo slug={s.slug} name="" />
            <div><div className="hp-nm">{s.name}</div><div className="hp-mt">Pick your plan. Prices are filled in.</div></div>
            <button type="button" className="hp-dback" onClick={() => setSvc(null)}>Back</button>
          </div>
          {s.plans.map((p, i) => (
            <button key={p.name} type="button" className="hp-dplan" onClick={() => setPlan(i)}>
              <span>{p.name}<small>{p.meta}</small></span>
              <b>{inr(p.amount)}</b>
            </button>
          ))}
        </>
      )}
      {step === 2 && s && plan !== null && (
        <div className="hp-ddone" role="status">
          <div className="hp-ok" aria-hidden>✓</div>
          <h4>{s.name} {s.plans[plan].name} added</h4>
          <p>{inr(s.plans[plan].amount)} a month. We&rsquo;ll remind you before it renews.</p>
          <button type="button" className="hp-dreset" onClick={() => { setSvc(null); setPlan(null); }}>
            Add another
          </button>
        </div>
      )}
    </div>
  );
}
