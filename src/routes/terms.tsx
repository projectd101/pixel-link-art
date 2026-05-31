import { createFileRoute } from "@tanstack/react-router";
import { PhoneShell, TopBar, GlassPanel } from "@/narnia/ui";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms — Narnia Pass" }] }),
  component: Terms,
});

function Terms() {
  return (
    <PhoneShell>
      <TopBar title="TERMS" back />
      <div className="px-5 mt-4 pb-10">
        <div className="font-display text-white text-[28px]">Terms of Service</div>
        <div className="font-mono text-[10px] text-white/40 mt-1">Updated · May 2026</div>
        <GlassPanel className="p-5 mt-5 font-sans text-white/75 text-[13px] leading-relaxed space-y-4">
          <Section title="1. The Pass">
            Narnia Pass is a physical-digital collectible platform. The $2.99 Starter Pass grants you a personal vault and access to the drop ecosystem.
          </Section>
          <Section title="2. Cards & Ownership">
            Cards purchased via Narnia Pass are licensed digital collectibles. Physical cards include an NFC chip and ship to the address on file. Possession of a card grants the perks listed on the card at the time of purchase.
          </Section>
          <Section title="3. Drops">
            Drops are time-limited and supply-limited. All sales are final. Edition sizes are fixed at drop creation and cannot be increased.
          </Section>
          <Section title="4. Resale & Trade Floor">
            You may resell or trade cards through the in-app Trade Floor. Narnia Pass takes a 5% platform fee on secondary sales.
          </Section>
          <Section title="5. Creators">
            Creator accounts are invitation-only. Creators retain ownership of their content and grant Narnia Pass a non-exclusive license to distribute it through the platform.
          </Section>
          <Section title="6. Conduct">
            No fraud, no impersonation, no scraping, no exploit of drop windows. Violations result in card forfeiture and account termination.
          </Section>
          <Section title="7. Refunds">
            Defective physical cards may be replaced within 30 days of delivery. Digital purchases are non-refundable.
          </Section>
          <Section title="8. Liability">
            Narnia Pass is provided as-is. We do not guarantee secondary market value of any card.
          </Section>
          <Section title="9. Changes">
            We may update these terms. Material changes will be announced in-app.
          </Section>
        </GlassPanel>
      </div>
    </PhoneShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-display text-white text-[15px] mb-1">{title}</div>
      <div>{children}</div>
    </div>
  );
}
