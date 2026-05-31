import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneShell, TopBar, GlassPanel, NeuPill, NeuButton, ClayCard, SectionLabel, CountdownBlock, LivePulse } from "@/narnia/ui";
import { DROPS, CARDS } from "@/narnia/data";

export const Route = createFileRoute("/drop")({
  head: () => ({ meta: [{ title: "Drop — Narnia Pass" }] }),
  component: Drop,
});

function Drop() {
  const [tab, setTab] = useState<"artist"|"brand"|"community">("artist");
  const featured = DROPS.find(d => d.status === "live")!;

  return (
    <PhoneShell>
      <TopBar />
      <div className="px-5 pt-4">
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">THE DROP FLOOR</div>
        <h1 className="font-display text-white text-[34px] leading-[1.05] mt-1">Drops.</h1>
      </div>

      {/* Featured hero */}
      <GlassPanel className="mx-5 mt-5 p-5 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full"
             style={{ background: "radial-gradient(circle, rgba(255,34,34,0.3), transparent 70%)" }} />
        <div className="flex items-center gap-2 mb-3"><LivePulse /><span className="font-mono text-[10px] text-white/60">{featured.supply - featured.claimed} LEFT OF {featured.supply}</span></div>
        <div className="grid place-items-center my-4 np-breathe">
          <ClayCard card={featured.card} size="lg" />
        </div>
        <div className="font-display text-white text-[24px]">{featured.title}</div>
        <div className="font-sans text-white/55 text-[13px]">{featured.artist} · {featured.card.rarity}</div>
        <div className="font-mono text-[11px] text-red-300 mt-2">Perk · {featured.card.perk}</div>
        <div className="flex items-end justify-between mt-4">
          <GlassPanel className="px-3 py-2"><span className="font-display text-white text-[20px]">${featured.price}</span></GlassPanel>
          <CountdownBlock target={featured.startsAt + 1000*60*60*4} />
        </div>
        <NeuButton className="w-full mt-4" style={{ background: "linear-gradient(160deg,#8B0000,#CC0000)" }}>Buy this drop</NeuButton>
      </GlassPanel>

      {/* Card type tabs */}
      <div className="px-5 mt-5 flex gap-2 overflow-x-auto no-scrollbar">
        <NeuPill active={tab==="artist"} onClick={()=>setTab("artist")}>ARTIST CARDS</NeuPill>
        <NeuPill active={tab==="brand"} onClick={()=>setTab("brand")}>BRAND COLLABS</NeuPill>
        <NeuPill active={tab==="community"} onClick={()=>setTab("community")}>COMMUNITY</NeuPill>
      </div>

      <SectionLabel>All active drops</SectionLabel>
      <div className="px-5 flex flex-col gap-3 pb-6">
        {DROPS.filter(d => d.status !== "ended").map(d => {
          const pct = Math.round((d.claimed / d.supply) * 100);
          return (
            <GlassPanel key={d.id} className="p-4 flex gap-4">
              <ClayCard card={d.card} size="sm" interactive={false} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="font-display text-white text-[16px] truncate">{d.title}</div>
                  <span className="font-mono text-[11px] text-white/80">${d.price}</span>
                </div>
                <div className="font-mono text-[10px] text-white/50 mt-0.5">{d.artist} · {d.supply - d.claimed}/{d.supply} left</div>
                <div className="mt-2 h-1 rounded-full neu-inset overflow-hidden">
                  <div className="h-full" style={{ width: `${pct}%`, background: d.card.signatureHue }} />
                </div>
                <NeuButton className="!h-9 mt-3 w-full">Buy</NeuButton>
              </div>
            </GlassPanel>
          );
        })}
      </div>

      <SectionLabel>Use a card for discount</SectionLabel>
      <GlassPanel className="mx-5 p-4 mb-8">
        <div className="font-mono text-[10px] text-white/50 tracking-[0.2em]">CONCERT · ASTRO TOUR · NYC</div>
        <div className="font-display text-white text-[18px] mt-1">Apply your card</div>
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
          {CARDS.slice(0,4).map(c => <ClayCard key={c.id} card={c} size="sm" interactive={false} />)}
        </div>
        <div className="mt-3 font-sans text-[13px] text-white">
          Your <span style={{color:"#D4AD5A"}}>Travis Mythic</span> saves you <span className="font-display text-[18px]">$47.20</span>
        </div>
        <NeuButton className="w-full mt-3" style={{ background: "linear-gradient(160deg,#8B0000,#CC0000)" }}>Apply discount</NeuButton>
      </GlassPanel>
    </PhoneShell>
  );
}
