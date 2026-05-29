import { createFileRoute } from "@tanstack/react-router";
import { PhoneShell, TopBar } from "@/dpqr/Shell";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service — DPqR" }] }),
  component: Terms,
});

function Terms() {
  return (
    <PhoneShell>
      <TopBar back title="LEGAL" />
      <article className="px-5 pt-5 pb-10 prose-invert">
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">EFFECTIVE MAY 29, 2026</div>
        <h1 className="font-display text-white text-[34px] leading-tight mt-2">Terms of Service</h1>

        {SECTIONS.map(([h,b],i)=>(
          <section key={i} className="mt-8">
            <h2 className="font-display text-white text-[18px] leading-tight">{i+1}. {h}</h2>
            <p className="font-sans text-white/65 text-[13px] leading-relaxed mt-2 whitespace-pre-line">{b}</p>
          </section>
        ))}

        <div className="mt-10 font-mono text-[10px] tracking-[0.3em] text-white/40">DPqR INC · 2026</div>
      </article>
    </PhoneShell>
  );
}

const SECTIONS: [string,string][] = [
  ["Acceptance of Terms", "By creating a DPqR account or claiming a card, you agree to these Terms. If you do not agree, do not use the app."],
  ["Cards & Collectibles", "DPqR cards are limited collectible items combining a physical, NFC-chipped object and a digital twin stored in your Vault. Cards may grant access to perks defined by the issuing artist. Perks are subject to availability and may expire."],
  ["Drops & Releases", "Drops are time-limited. Quantities, pricing, and Day One eligibility are determined by the artist. All sales are final unless the drop is cancelled by the artist or DPqR."],
  ["Trading & Marketplace", "You may list owned cards for trade or sale on the DPqR marketplace. DPqR charges a 5% transaction fee. The artist may receive royalties on secondary sales. Fraudulent or manipulated activity is grounds for account termination."],
  ["Redemption", "Perks redeemable through Scan & Redeem are subject to the venue's policies and the card's specified terms. DPqR is not responsible for venue refusal or event changes."],
  ["User Conduct", "You may not impersonate artists, harass others, exploit bugs, or use automated tools to claim drops. Violations may result in card forfeiture."],
  ["Intellectual Property", "Artists retain rights to their content. DPqR receives a limited license to distribute content via cards. You receive a personal, non-transferable license to enjoy the embedded moment for as long as you own the card."],
  ["Payments & Refunds", "Payments are processed by our payment provider. Cards are non-refundable except where required by law. Shipping for physical cards is calculated at checkout."],
  ["Termination", "We may suspend or close accounts that violate these Terms. Cards in a closed account may be revoked at DPqR's discretion."],
  ["Disclaimers", "DPqR is provided as-is. We do not guarantee perk availability, marketplace prices, or uninterrupted access."],
  ["Governing Law", "These Terms are governed by the laws of California, USA. Disputes will be resolved by binding arbitration in Los Angeles County."],
  ["Contact", "Questions? legal@dpqr.app"],
];
