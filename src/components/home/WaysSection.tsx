import BrandLogo from "@/components/home/BrandLogo";
import CatalogPicker from "@/components/home/CatalogPicker";

const SCAN_ROWS = [
  { slug: "netflix", name: "Netflix", meta: "Receipt · 14 Oct", chip: "Looks right", tone: "green" },
  { slug: "google-one", name: "Google One", meta: "Invoice · 2 Oct", chip: "Looks right", tone: "green" },
  { slug: "chatgpt", name: "ChatGPT Plus", meta: "Renewal notice", chip: "Review", tone: "amber" },
];

const AFTER = [
  { n: "1", title: "Tracks every date", body: "Renewals, trial endings and annual plans on one calendar." },
  { n: "2", title: "Reminds you early", body: "A heads-up days before, by push or email. You pick when." },
  { n: "3", title: "Rings for the big ones", body: "An optional alarm on the morning an expensive plan renews." },
  { n: "✓", title: "You decide in time", body: "Keep it, switch plans or cancel, before you're charged." },
];

export default function WaysSection() {
  return (
    <section className="hp-sec hp-ways" id="how-it-works">
      <div className="hp-wrap">
        <div className="hp-eyebrow">How it works</div>
        <h2 className="hp-h2" style={{ maxWidth: "20ch" }}>Two ways in. Pick the one you&rsquo;re comfortable with.</h2>
        <p className="hp-lead" style={{ marginTop: 14 }}>
          Let SubDrip find everything for you, or keep your inbox to yourself and add your plans by hand. Either way,
          it takes about a minute.
        </p>

        <div className="hp-ways-grid">
          <div className="hp-way">
            <div className="hp-waytop">
              <span className="hp-wicon" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
              </span>
              <span className="hp-badge muted">Fastest</span>
            </div>
            <h3>Scan Gmail, automatically</h3>
            <p>SubDrip reads only receipts, invoices and renewal notices, with read-only access. Your first results show up in about 10 seconds.</p>
            <ul className="hp-bul">
              <li>Finds subscriptions you forgot you had</li>
              <li>You confirm each one; nothing is saved without you</li>
              <li>Disconnect anytime</li>
            </ul>
            <div className="hp-demo" aria-hidden>
              <div className="hp-scanbar"><i /></div>
              <div className="hp-note" style={{ marginBottom: 8 }}>Scanning billing emails… 4 found</div>
              <div className="hp-scan">
                {SCAN_ROWS.map((r) => (
                  <div key={r.name} className="hp-row">
                    <BrandLogo slug={r.slug} name="" />
                    <div><div className="hp-nm">{r.name}</div><div className="hp-mt">{r.meta}</div></div>
                    <span className={`hp-chip ${r.tone}`}>{r.chip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hp-way private">
            <div className="hp-waytop">
              <span className="hp-wicon" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
              </span>
              <span className="hp-badge">Most private</span>
            </div>
            <h3>Add by hand, with no inbox access</h3>
            <p>Prefer not to connect anything? Pick the service and the plan. The prices are already filled in. Two taps and you&rsquo;re done.</p>
            <ul className="hp-bul">
              <li>Popular services with current Indian prices built in</li>
              <li>Anything missing? Type it in yourself</li>
              <li>No email, no bank, no SMS access needed</li>
            </ul>
            <CatalogPicker />
          </div>
        </div>

        <div className="hp-after">
          <h3>Then SubDrip takes it from there.</h3>
          <p>You&rsquo;ll hear from us <b>before</b> the money is taken, not after.</p>
          <ol className="hp-steps">
            {AFTER.map((a) => (
              <li key={a.title}>
                <span className="hp-sdot" aria-hidden>{a.n}</span>
                <b>{a.title}</b>
                <span>{a.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
