import HeroPhone from "@/components/phone/HeroPhone";
import InlineSignup from "@/components/signup/InlineSignup";

export default function BetaBand() {
  return (
    <section className="hp-sec hp-sec-flush">
      <div className="hp-wrap">
        <div className="hp-band">
          <div className="hp-band-glow" aria-hidden />
          <div className="hp-band-copy">
            <div className="hp-eyebrow">Android beta · open now</div>
            <h2 className="hp-h2">Know what you&rsquo;re paying for, every month.</h2>
            <p>Free during beta. Android today, iPhone next. Join the waitlist and we&rsquo;ll email you the day it ships.</p>
            <InlineSignup placement="band" tone="dark" />
          </div>
          <div className="hp-band-phone" aria-hidden>
            <div className="hp-band-phone-crop">
              <HeroPhone variant="dashboard" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
