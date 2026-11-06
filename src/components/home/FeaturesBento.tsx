import BrandLogo from "@/components/home/BrandLogo";
import { EXAMPLE_MONTHLY, EXAMPLE_YEARLY, inr } from "@/lib/homeData";

// November 2026 starts on a Sunday; today is the 6th. Event days match the hero phone.
const EVENTS: Record<number, string> = { 2: "ev", 8: "ev", 9: "ev big", 18: "ev", 21: "ev", 25: "ev" };
const TODAY = 6;

export default function FeaturesBento() {
  return (
    <section className="hp-sec" id="features">
      <div className="hp-wrap">
        <div className="hp-eyebrow">Inside the app</div>
        <h2 className="hp-h2" style={{ maxWidth: "18ch" }}>Everything recurring, in one calm place.</h2>
        <div className="hp-bento">
          <div className="hp-tile t-cal">
            <h3>Renewal calendar</h3>
            <p>See every charge coming this month, and how big it is.</p>
            <div className="hp-cal" aria-hidden>
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i} className="h">{d}</div>)}
              {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
                <div key={d} className={`${EVENTS[d] ?? ""}${d === TODAY ? " today" : ""}`}>{d}</div>
              ))}
            </div>
            <div className="hp-row" style={{ marginTop: 16 }}>
              <BrandLogo slug="chatgpt" name="" />
              <div><div className="hp-nm">ChatGPT Plus</div><div className="hp-mt">Mon, 9 Nov · in 3 days</div></div>
              <span className="hp-pr">₹1,999</span>
            </div>
          </div>
          <div className="hp-tile t-tot">
            <h3>Your real monthly total</h3>
            <p>Monthly, quarterly and annual plans, all turned into one number.</p>
            <div className="hp-totline">
              <b>{inr(EXAMPLE_MONTHLY)}</b>
              <span>a month · {inr(EXAMPLE_YEARLY)} a year</span>
            </div>
            <div className="hp-cats" aria-hidden>
              <i style={{ flex: 65, background: "#1b5e54" }} />
              <i style={{ flex: 21, background: "#3a7fb0" }} />
              <i style={{ flex: 10, background: "#e08a3c" }} />
              <i style={{ flex: 4, background: "#8a6bb0" }} />
            </div>
            <div className="hp-legend">
              <span><i style={{ background: "#1b5e54" }} />AI tools 65%</span>
              <span><i style={{ background: "#3a7fb0" }} />Video 21%</span>
              <span><i style={{ background: "#e08a3c" }} />Music &amp; YouTube 10%</span>
              <span><i style={{ background: "#8a6bb0" }} />Storage 4%</span>
            </div>
          </div>
          <div className="hp-tile t-sav">
            <h3>Savings it finds for you</h3>
            <p>Unused plans, cheaper tiers, and duplicates like two music apps.</p>
            <div className="hp-savebig">₹1,668<span> / year</span></div>
            <div className="hp-note">Example: drop the unused Spotify plan (₹139 × 12)</div>
          </div>
          <div className="hp-tile t-sm"><h3>Trial alerts</h3><p>Know the day a free trial turns into a paid plan.</p></div>
          <div className="hp-tile t-sm"><h3>Price-change alerts</h3><p>Spot it when a plan quietly gets more expensive.</p></div>
          <div className="hp-tile t-sm">
            <h3>Reminders your way</h3>
            <p>Choose how and when you hear about a renewal.</p>
            <div className="hp-channels"><span>Push</span><span>Email</span><span>Alarm</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
