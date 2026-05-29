import { createFileRoute } from "@tanstack/react-router";
import { PhoneShell, TopBar } from "@/dpqr/Shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — DPqR" }] }),
  component: Privacy,
});

function Privacy() {
  return (
    <PhoneShell>
      <TopBar back title="LEGAL" />
      <article className="px-5 pt-5 pb-10">
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">EFFECTIVE MAY 29, 2026</div>
        <h1 className="font-display text-white text-[34px] leading-tight mt-2">Privacy Policy</h1>

        {SECTIONS.map(([h,b],i)=>(
          <section key={i} className="mt-8">
            <h2 className="font-display text-white text-[18px] leading-tight">{i+1}. {h}</h2>
            <p className="font-sans text-white/65 text-[13px] leading-relaxed mt-2 whitespace-pre-line">{b}</p>
          </section>
        ))}

        <div className="mt-10 font-mono text-[10px] tracking-[0.3em] text-white/40">privacy@dpqr.app · DPqR INC</div>
      </article>
    </PhoneShell>
  );
}

const SECTIONS: [string,string][] = [
  ["What We Collect", "Account info (email, username), card transactions, redemption logs, device identifiers, and analytics about how you use the app."],
  ["How We Use It", "To deliver drops, verify card ownership, enable trading, prevent fraud, personalize your feed, and improve DPqR."],
  ["Sharing", "We share order data with payment processors and shipping carriers, and aggregate fan data with artists you follow. We never sell your personal information."],
  ["Artists & Holder Data", "Artists you collect can see anonymized holder counts and aggregated stats. Personally identifying data is only shared if you opt in to direct messaging."],
  ["Cookies & Tracking", "We use first-party cookies for sessions and a small set of analytics events. You can opt out of marketing analytics in Settings → Preferences."],
  ["Security", "Cards are bound to your account via NFC unique IDs and encrypted server records. Tampering with NFC chips is detectable and voids the card."],
  ["Your Rights", "You can request a copy or deletion of your data at privacy@dpqr.app. EU/UK/CA residents have additional rights under GDPR/CCPA."],
  ["Children", "DPqR is not directed at users under 13. We delete any data found to belong to a child."],
  ["Changes", "We will notify you of material changes via in-app notification at least 14 days before they take effect."],
];
