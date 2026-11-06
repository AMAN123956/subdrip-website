import InlineSignup from "@/components/signup/InlineSignup";
import { HERO_SIGNUP_ID } from "@/components/signup/JoinBetaButton";
import BrandLogo from "@/components/home/BrandLogo";
import { EXAMPLE_MONTHLY, EXAMPLE_YEARLY, inr } from "@/lib/homeData";

const UP_NEXT = [
  { slug: "netflix", name: "Netflix", meta: "Standard · Sun", due: "2 days" },
  { slug: "chatgpt", name: "ChatGPT", meta: "Plus · Mon", amount: 1999 },
  { slug: "youtube-premium", name: "YouTube Premium", meta: "Individual · 18 Nov", amount: 149 },
  { slug: "spotify", name: "Spotify", meta: "Premium · 21 Nov", amount: 139 },
];

export default function HeroSection() {
  return (
    <section className="hp-hero">
      <div className="hp-wrap hp-hero-grid">
        <div>
          <span className="hp-livepill">
            <span className="hp-live" aria-hidden>
              <i />
            </span>
            Android beta is open · iPhone waitlist
          </span>
          <h1 className="hp-h1">
            Find the subscriptions you <em>forgot</em> you&rsquo;re paying for.
          </h1>
          <p className="hp-lead">
            SubDrip finds every recurring charge, adds them into one monthly total, and warns you <b>before</b> the
            money leaves your account. Connect Gmail read-only, or add plans by hand in two taps.
          </p>
          <InlineSignup id={HERO_SIGNUP_ID} placement="hero" showApk />
          <ul className="hp-trust">
            <li><span className="hp-tick" aria-hidden>✓</span>Read-only Gmail</li>
            <li><span className="hp-tick" aria-hidden>✓</span>No bank login, ever</li>
            <li><span className="hp-tick" aria-hidden>✓</span>Delete your data anytime</li>
          </ul>
        </div>

        <div className="hp-visual" aria-hidden>
          <div className="hp-drip hp-d1">
            <BrandLogo slug="netflix" name="Netflix" />
            <div><b>Netflix renews Sunday</b><span>₹499 · reminder set</span></div>
          </div>
          <div className="hp-drip hp-d2">
            <BrandLogo slug="chatgpt" name="ChatGPT" />
            <div><b>ChatGPT Plus</b><span>₹1,999 · renews in 3 days</span></div>
          </div>
          <div className="hp-drip hp-d3">
            <span className="hp-logo hp-logo-save">₹</span>
            <div><b>₹139 could be saved</b><span>Spotify, unused 6 weeks</span></div>
          </div>
          <div className="hp-phone">
            <div className="hp-screen">
              <div className="hp-notch" />
              <div className="hp-sc-hi">Good evening</div>
              <div className="hp-sc-title">Your subscriptions</div>
              <div className="hp-total">
                <small>This month</small>
                <div className="hp-amt">{inr(EXAMPLE_MONTHLY)}</div>
                <div className="hp-yr">6 active · {inr(EXAMPLE_YEARLY)} a year</div>
                <div className="hp-bars">
                  {[52, 58, 55, 70, 66, 100].map((h, i) => (
                    <i key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="hp-sc-label">Up next <span>this week</span></div>
              {UP_NEXT.map((r) => (
                <div key={r.name} className="hp-row">
                  <BrandLogo slug={r.slug} name={r.name} />
                  <div>
                    <div className="hp-nm">{r.name}</div>
                    <div className="hp-mt">{r.meta}</div>
                  </div>
                  {r.due ? <span className="hp-due">{r.due}</span> : <span className="hp-pr">{inr(r.amount!)}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
