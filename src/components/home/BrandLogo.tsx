/* eslint-disable @next/next/no-img-element -- tiny pinned CDN icons; next/image would need remotePatterns + adds no value at 24–30px */
import { logo } from "@/lib/homeData";

/** A catalog brand icon (pinned jsDelivr), sized by the caller's class. */
export default function BrandLogo({ slug, name, className = "hp-logo" }: { slug: string; name: string; className?: string }) {
  return <img src={logo(slug)} alt={name} className={className} width={30} height={30} loading="lazy" decoding="async" />;
}
