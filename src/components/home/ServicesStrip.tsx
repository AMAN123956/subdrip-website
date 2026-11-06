import BrandLogo from "@/components/home/BrandLogo";
import { STRIP_BRANDS } from "@/lib/homeData";

export default function ServicesStrip() {
  // Rendered twice so the CSS marquee loops seamlessly; the second copy is hidden from screen readers.
  return (
    <div className="hp-strip">
      <div className="hp-wrap hp-strip-in">
        <p>Knows the plans and prices of the services you actually pay for</p>
        <div className="hp-marquee">
          <ul className="hp-track">
            {[0, 1].map((copy) =>
              STRIP_BRANDS.map((b) => (
                <li key={`${copy}-${b.slug}`} className="hp-svc" aria-hidden={copy === 1 || undefined}>
                  <BrandLogo slug={b.slug} name="" className="hp-svc-logo" />
                  {b.name}
                </li>
              )),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
