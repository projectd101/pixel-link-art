import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneShell, TopBar, GlassPanel, NeuPill, NeuButton, ClayCard, SectionLabel, ShieldLogo } from "@/narnia/ui";
import { CARDS, ARTISTS } from "@/narnia/data";

export const Route = createFileRoute("/vault")({
  head: () => ({ meta: [{ title: "Vault — Narnia Pass" }] }),
  component: Vault,
});

function Vault() {
  const [tab, setTab] = useState<"all"|"physical"|"digital"|"legendary"|"trading">("all");
  const filtered = CARDS.filter(c => {
    if (tab === "physical") return c.kind === "physical";
    if (tab === "digital")  return c.kind === "digital";
    if (tab === "legendary") return c.rarity === "Legendary" || c.rarity === "Mythic";
    if (tab === "trading")  return true;
    return true;
  });

  return (
    <PhoneShell>
      <TopBar />
      <div className="px-5 pt-4">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-full neu grid place-items-center">
            <ShieldLogo size={22} />
          </div>
          <div>
            <div className="font-display text-white text-[22px] leading-tight">@superfan_42</div>
            <div className="flex gap-1 mt-1 flex-wrap">
              {ARTISTS.slice(0,3).map(a => (
                <GlassPanel key={a.id} className="px-2 py-0.5">
                  <span className="font-mono text-[9px] text-white/70">{a.name} #{Math.floor(Math.random()*999)}</span>
                </GlassPanel>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mt-5">
          <Stat n="14" l="OWNED" />
          <Stat n="2" l="MYTHIC" />
          <Stat n="$3.4K" l="VALUE" />
          <Stat n="7" l="BATTLES" />
        </div>

        {/* Filter pills */}
        <div className="mt-5 flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5">
          {(["all","physical","digital","legendary","trading"] as const).map(t => (
            <NeuPill key={t} active={tab===t} onClick={()=>setTab(t)}>{t.toUpperCase()}</NeuPill>
          ))}
        </div>
      </div>

      <SectionLabel>The deck</SectionLabel>
      <div className="px-5 grid grid-cols-2 gap-x-3 gap-y-6 pb-6">
        {filtered.map(c => (
          <Link to={"/card/$id" as any} params={{ id: c.id }} key={c.id} className="flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 translate-y-2 translate-x-1 rounded-[30px]"
                   style={{ background: "rgba(0,0,0,0.5)", filter: "blur(2px)" }} />
              <ClayCard card={c} size="md" interactive={false} />
              <div className="absolute top-2 right-2 h-2 w-2 rounded-full"
                   style={{ background: c.kind === "physical" ? "#C0C0C0" : c.signatureHue }} />
            </div>
            <div className="mt-2 text-center">
              <div className="font-display text-white text-[14px]">{c.series}</div>
              <div className="font-mono text-[9px] text-white/40">{c.serial} · {c.kind.toUpperCase()}</div>
            </div>
          </Link>
        ))}
      </div>

      <SectionLabel>Your standing</SectionLabel>
      <div className="px-5 flex flex-col gap-2 pb-6">
        {ARTISTS.slice(0,3).map(a => (
          <GlassPanel key={a.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-white text-[16px]">{a.name}</div>
                <div className="font-mono text-[10px] text-white/50">Inner Circle · Top 10</div>
              </div>
              <div className="font-display text-white text-[22px]" style={{ color: a.hue }}>#{Math.floor(Math.random()*99)+1}</div>
            </div>
            <div className="mt-3 h-1.5 rounded-full neu-inset overflow-hidden">
              <div className="h-full" style={{ width: "68%", background: a.hue }} />
            </div>
          </GlassPanel>
        ))}
      </div>

      <SectionLabel>Public showcase</SectionLabel>
      <GlassPanel className="mx-5 p-4 mb-8">
        <div className="font-mono text-[10px] text-white/50 tracking-[0.2em]">YOUR LINK</div>
        <div className="font-mono text-[12px] text-white mt-1">narniapass.app/v/superfan_42</div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <NeuButton className="!h-10">Copy</NeuButton>
          <NeuButton className="!h-10">Share</NeuButton>
        </div>
      </GlassPanel>
    </PhoneShell>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <GlassPanel className="p-3">
      <div className="font-display text-white text-[18px] leading-none">{n}</div>
      <div className="font-mono text-[8px] tracking-[0.2em] text-white/50 mt-1">{l}</div>
    </GlassPanel>
  );
}
