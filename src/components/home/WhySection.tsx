import BrandLogo from "@/components/home/BrandLogo";
import { EXAMPLE_MONTH, EXAMPLE_MONTHLY, EXAMPLE_YEARLY, inr } from "@/lib/homeData";

export default function WhySection() {
  return (
    <section className="hp-sec">
      <div className="hp-wrap">
        <div className="hp-why-head">
          <div>
            <div className="hp-eyebrow">Why it matters</div>
            <h2 className="hp-h2">Each charge looks small. Together they cost a lot.</h2>
          </div>
          <p className="hp-lead">
            Subscriptions are designed to be forgettable. They renew quietly, creep up in price, and live in six
            different inboxes. SubDrip puts all of them in one place, before they cost you.
          </p>
        </div>

        <div className="hp-why-grid">
          <div className="hp-receipt">
            <h3>
              One ordinary month <span className="hp-note">Example account · catalog prices</span>
            </h3>
            <ul>
              {EXAMPLE_MONTH.map((r) => (
                <li key={r.name} className="hp-rline">
                  <span>
                    <BrandLogo slug={r.slug} name={r.name} />
                    {r.name}
                    <small>{r.plan}</small>
                  </span>
                  <b>{inr(r.amount)}</b>
                </li>
              ))}
            </ul>
            <div className="hp-rsum">
              <span>Every month</span>
              <b>{inr(EXAMPLE_MONTHLY)}</b>
            </div>
            <div className="hp-ryear">
              <span>What that adds up to over a year</span>
              <b>{inr(EXAMPLE_YEARLY)}</b>
            </div>
          </div>

          <div className="hp-probs">
            <div className="hp-prob">
              <div>
                <h3>Forgotten subscriptions</h3>
                <p>You stop using a service. It never stops charging you.</p>
                <div className="hp-fix">Flags the ones you barely use</div>
              </div>
              <div className="hp-mini">
                <div className="hp-mrow">
                  <BrandLogo slug="spotify" name="Spotify" />
                  <div><div className="hp-nm">Spotify Premium</div><div className="hp-mt">Not opened in 6 weeks</div></div>
                  <span className="hp-chip red">₹139/mo</span>
                </div>
              </div>
            </div>
            <div className="hp-prob">
              <div>
                <h3>Surprise renewals</h3>
                <p>Free trials turn paid, and annual plans renew at the worst moment.</p>
                <div className="hp-fix">A reminder before every renewal, an alarm for the big ones</div>
              </div>
              <div className="hp-mini">
                <div className="hp-mrow">
                  <BrandLogo slug="chatgpt" name="ChatGPT" />
                  <div><div className="hp-nm">ChatGPT Plus</div><div className="hp-mt">Renews Mon · ₹1,999</div></div>
                  <span className="hp-chip amber">in 3 days</span>
                </div>
                <div className="hp-tl" aria-hidden><i className="on" /><i className="on" /><i className="on" /><i /><i /></div>
                <div className="hp-tl-l"><span>Reminder sent</span><span>Charge day</span></div>
              </div>
            </div>
            <div className="hp-prob">
              <div>
                <h3>Quiet price hikes</h3>
                <p>Plans get more expensive and nobody tells you.</p>
                <div className="hp-fix">Alerts you when a price changes</div>
              </div>
              <div className="hp-mini">
                <div className="hp-mrow">
                  <BrandLogo slug="netflix" name="Netflix" />
                  <div><div className="hp-nm">Netflix Standard</div><div className="hp-mt">Price changed at renewal · example</div></div>
                  <span className="hp-chip red"><s>₹449</s> ₹499</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
