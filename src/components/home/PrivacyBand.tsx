import Link from "next/link";

const POINTS = [
  { title: "Read-only", body: "We can't send, delete or change a single email.", icon: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" },
  { title: "No bank login", body: "SubDrip never asks for banking passwords.", icon: "M3 10h18M5 10v8M19 10v8M9 10v8M15 10v8M2 21h20M12 3l9 5H3z" },
  { title: "Billing emails only", body: "Receipts and renewal notices. Nothing personal.", icon: "M4 4h16v16H4zM4 8l8 5 8-5" },
  { title: "Delete anytime", body: "Wipe your account and data from inside the app.", icon: "M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" },
];

export default function PrivacyBand() {
  return (
    <section className="hp-sec hp-sec-flush" id="privacy">
      <div className="hp-wrap">
        <div className="hp-priv">
          <div className="hp-eyebrow">Privacy</div>
          <h2 className="hp-h2">Built for people who don&rsquo;t hand out inbox access.</h2>
          <div className="hp-pgrid">
            {POINTS.map((p) => (
              <div key={p.title} className="hp-pcell">
                <span className="hp-picon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon} /></svg>
                </span>
                <b>{p.title}</b>
                <span>{p.body}</span>
              </div>
            ))}
          </div>
          <Link href="/privacy" className="hp-priv-link">Read exactly how we handle your data →</Link>
        </div>
      </div>
    </section>
  );
}
