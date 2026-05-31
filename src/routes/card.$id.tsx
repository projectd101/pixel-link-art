import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { PhoneShell, TopBar, GlassPanel, NeuButton, ClayCard, SectionLabel } from "@/narnia/ui";
import { findCard, CARDS } from "@/narnia/data";

export const Route = createFileRoute("/card/$id")({
  head: () => ({ meta: [{ title: "Card — Narnia Pass" }] }),
  component: CardView,
});

function CardView() {
  const { id } = useParams({ from: "/card/$id" });
  const card = findCard(id) ?? CARDS[0];
  return (
    <PhoneShell>
      <TopBar title="CARD" back />
      <div className="grid place-items-center mt-6">
        <ClayCard card={card} size="xl" />
      </div>
      <div className="px-5 mt-6">
        <div className="font-mono text-[10px] text-white/50 tracking-[0.2em]">{card.rarity.toUpperCase()} · {card.kind.toUpperCase()}</div>
        <div className="font-display text-white text-[28px] mt-1">{card.series}</div>
        <div className="font-sans text-white/60 text-[13px]">{card.artist} · {card.serial}</div>
      </div>

      <GlassPanel className="mx-5 mt-5 p-4">
        <div className="font-mono text-[10px] tracking-[0.2em] text-white/50">PERK UNLOCKED</div>
        <div className="font-display text-white text-[18px] mt-1">{card.perk}</div>
      </GlassPanel>

      {card.ticket && (
        <GlassPanel className="mx-5 mt-3 p-4 relative overflow-hidden">
          <div className="absolute inset-0 holo-sweep" />
          <div className="relative">
            <div className="font-mono text-[10px] tracking-[0.2em] text-red-400">TICKET ACTIVE</div>
            <div className="font-display text-white text-[20px] mt-1">{card.ticket.event}</div>
            <div className="font-sans text-white/70 text-[13px]">{card.ticket.venue} · {card.ticket.date}</div>
            <div className="font-mono text-[10px] text-white/50 mt-1">ACCESS · {card.ticket.access}</div>
          </div>
        </GlassPanel>
      )}

      {card.brand && (
        <GlassPanel className="mx-5 mt-3 p-4">
          <div className="font-mono text-[10px] tracking-[0.2em] text-white/50">BRAND COLLAB · {card.brand.toUpperCase()}</div>
          <div className="font-display text-white text-[18px] mt-1">Unlocks physical product</div>
          <div className="font-sans text-white/60 text-[12px] mt-1">Ships with your physical card.</div>
        </GlassPanel>
      )}

      <SectionLabel>Owner history</SectionLabel>
      <GlassPanel className="mx-5 p-4">
        {["@you · today","@blvckveil · 2 weeks ago","@drop_pioneer · genesis day"].map((r,i)=>(
          <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <div className="font-sans text-white text-[13px]">{r}</div>
            <div className="font-mono text-[10px] text-white/40">#{i+1}</div>
          </div>
        ))}
      </GlassPanel>

      <div className="px-5 mt-6 grid grid-cols-2 gap-2 pb-8">
        <NeuButton>Share</NeuButton>
        <NeuButton style={{ background: "linear-gradient(160deg,#8B0000,#CC0000)" }}>Redeem perk</NeuButton>
      </div>
    </PhoneShell>
  );
}
