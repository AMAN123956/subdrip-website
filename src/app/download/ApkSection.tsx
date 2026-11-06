"use client";

import { track } from "@vercel/analytics";
import { APK } from "@/lib/beta";

const STEPS = [
  "Download the APK on your Android phone.",
  "Open it from your notifications or the Downloads folder.",
  "If Android asks, allow your browser to install apps (Settings → Install unknown apps).",
  "Tap Install, then open SubDrip and sign in.",
];

/** Direct APK download for people who'd rather skip the Play Store. Anchored at /download#apk. */
export default function ApkSection() {
  return (
    <section id="apk" className="apk">
      <div className="apk-head">
        <div>
          <h2>Install the APK directly</h2>
          <p>
            Skip the Play Store and tester list. Version {APK.version} · {APK.minAndroid}.
          </p>
        </div>
        <div className="apk-btns">
          <a className="apk-btn" href={APK.arm64.url} onClick={() => track("apk_download", { placement: "download", build: "arm64" })}>
            Download APK <span>{APK.arm64.size}</span>
          </a>
          <a className="apk-alt" href={APK.universal.url} onClick={() => track("apk_download", { placement: "download", build: "universal" })}>
            Older or unusual phone? Universal build ({APK.universal.size})
          </a>
        </div>
      </div>
      <ol className="apk-steps">
        {STEPS.map((s, i) => (
          <li key={s}>
            <span aria-hidden>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
      <p className="apk-note">
        The APK doesn&rsquo;t update itself, so check back here for new versions. It&rsquo;s signed differently from
        the Play Store build: to switch to the Play Store version later, uninstall the APK first.
      </p>
    </section>
  );
}
