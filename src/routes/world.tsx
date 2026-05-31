import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneShell, TopBar, GlassPanel, NeuPill, NeuButton, ClayCard, SectionLabel, NeuInput } from "@/narnia/ui";
import { ARTISTS, CARDS } from "@/narnia/data";

export const Route = createFileRoute("/world")({
  head: () => ({ meta: [{ title: "World — Narnia Pass" }] }),
  component: World,
});

function World() {
  const [tab, setTab] = useState<"global"|"artist"|"legendary"|"battles">("global");

  return (
    <PhoneShell>
      <TopBar />
      <div className="px-5 pt-4">
        <div className="glass rounded-2xl px-3 py-1 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input placeholder="Search artists, cards, drops..." className="flex-1 bg-transparent outline-none text-[14px] text-white placeholder:text-white/30 h-10" />
        </div>
      </div>

      <SectionLabel>Artist neighborhoods</SectionLabel>
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2">
        {ARTISTS.map(a => (
          <Link key={a.id} to={"/artist/$id" as any} params={{ id: a.id } as any} className="shrink-0">
            <GlassPanel className="w-44 h-32 p-4 relative overflow-hidden">
              <div className="absolute inset-0" style={{ background: `radial-gradient(120% 80% at 30% 0%, ${a.hue}55, transparent 70%)` }} />
              <div className="relative">
                <div className="font-display text-white text-[20px]">{a.name}</div>
                <div className="font-mono text-[10px] text-white/60 mt-1">{(a.fans/1000).toFixed(1)}K fans</div>
                <div className="mt-3 font-mono text-[10px] tracking-[0.2em]" style={{ color: a.hue }}>ENTER ›</div>
              </div>
            </GlassPanel>
          </Link>
        ))}
      </div>

      <SectionLabel>The reveal feed</SectionLabel>
      <div className="px-5 flex flex-col gap-4">
        {CARDS.slice(1,4).map(c => (
          <GlassPanel key={c.id} className="p-4 flex items-center gap-4">
            <ClayCard card={c} size="sm" interactive={false} />
            <div className="flex-1 min-w-0">
              <div className="font-display text-white text-[16px]">{c.series}</div>
              <div className="font-mono text-[10px] text-white/55 mt-0.5">Just revealed · 4m ago</div>
              <GlassPanel className="inline-block px-2 py-0.5 mt-2"><span className="font-mono text-[10px] text-white/80">SOLD · $2,400</span></GlassPanel>
            </div>
          </GlassPanel>
        ))}
      </div>

      <SectionLabel>Trade floor</SectionLabel>
      <GlassPanel className="mx-5 p-4">
        {[
          { c: "Speed #001",     price: "$2,400", state: "sold",  ago: "4m" },
          { c: "Travis #047",    price: "$1,180", state: "bid",   ago: "8m" },
          { c: "Taylor #201",    price: "$340",   state: "listed",ago: "12m" },
          { c: "Kairos #008",    price: "$890",   state: "sold",  ago: "18m" },
        ].map((r,i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <div>
              <div className="font-display text-white text-[14px]">{r.c}</div>
              <div className="font-mono text-[10px] text-white/40">{r.ago} ago</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[12px]" style={{ color: r.state==="sold"?"#FF2222": r.state==="bid"?"#D4AD5A":"#00E0A4" }}>{r.price}</div>
              <div className="font-mono text-[9px] tracking-[0.2em] text-white/50">{r.state.toUpperCase()}</div>
            </div>
          </div>
        ))}
      </GlassPanel>

      <SectionLabel>Leaderboard</SectionLabel>
      <div className="px-5 flex gap-2 overflow-x-auto no-scrollbar mb-3">
        {(["global","artist","legendary","battles"] as const).map(t => (
          <NeuPill key={t} active={tab===t} onClick={()=>setTab(t)}>{t.toUpperCase()}</NeuPill>
        ))}
      </div>
      <GlassPanel className="mx-5 p-4 mb-6">
        {["zarya.x","raulito","kairo.fan","mxnight","blvckveil"].map((u,i) => (
          <div key={u} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <div className="flex items-center gap-3">
              <div className="font-display text-white/70 text-[16px] w-6">{i+1}</div>
              <div className="font-sans text-white text-[14px]">@{u}</div>
            </div>
            <div className="font-mono text-[11px] text-white/60">{(5000 - i*420)} pts</div>
          </div>
        ))}
      </GlassPanel>

      <SectionLabel>Community cards</SectionLabel>
      <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-8">
        {CARDS.slice(4,7).map(c => (
          <div key={c.id} className="shrink-0">
            <ClayCard card={c} size="md" interactive={false} />
            <GlassPanel className="mt-2 px-2 py-1 inline-block">
              <span className="font-mono text-[10px] text-white/80">★ 4.8 · 1.2K likes</span>
            </GlassPanel>
            <div className="mt-1"><NeuButton className="!h-8 !px-3 !text-[11px]">Rate</NeuButton></div>
          </div>
        ))}
      </div>
    </PhoneShell>
  );
}
