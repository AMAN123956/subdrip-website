import Link from "next/link";
import { HOME_FAQ_IDS } from "@/lib/homeData";
import { ALL_FAQS } from "@/lib/siteData";

export default function HomeFaq() {
  const faqs = HOME_FAQ_IDS.map((id) => ALL_FAQS.find((f) => f.id === id)!);
  return (
    <section className="hp-sec hp-sec-flush" id="faq">
      <div className="hp-wrap hp-faqgrid">
        <div>
          <div className="hp-eyebrow">Questions</div>
          <h2 className="hp-h2">What people ask first.</h2>
          <p className="hp-lead" style={{ marginTop: 12 }}>
            Something else? <Link href="/faq">See all questions</Link> or <Link href="/support">contact support</Link>.
          </p>
        </div>
        <div>
          {faqs.map((f, i) => (
            <details key={f.id} className="hp-faq" open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
