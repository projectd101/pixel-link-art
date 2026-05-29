import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneShell, TopBar } from "@/dpqr/Shell";
import { Card3D } from "@/dpqr/Card3D";
import { CARDS } from "@/dpqr/data";

export const Route = createFileRoute("/vault")({
  head: () => ({ meta: [{ title: "Vault — DPqR" }] }),
  component: Vault,
});

function Vault() {
  const [tab, setTab] = useState<"all"|"physical"|"digital"|"history">("all");
  return (
    <PhoneShell>
      <TopBar />
      <div className="px-5 pt-4">
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">THE VAULT</div>
        <h1 className="font-display text-white text-[34px] leading-[1.05] mt-1">Your collection.</h1>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <Stat n="14" l="OWNED" />
          <Stat n="2" l="MYTHIC" />
          <Stat n="3,420" l="RARITY" />
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto no-scrollbar">
          {(["all","physical","digital","history"] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} className="px-4 h-8 rounded-full border text-[12px] font-mono tracking-[0.2em]"
              style={{ borderColor: tab===t?"var(--dpqr-accent)":"rgba(255,255,255,0.1)", color: tab===t?"var(--dpqr-accent)":"rgba(255,255,255,0.6)" }}>
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {tab === "history" ? <History /> : <Deck />}
    </PhoneShell>
  );
}

function Deck() {
  return (
    <div className="px-5 mt-6 grid grid-cols-2 gap-x-4 gap-y-7 pb-8">
      {CARDS.map((c, i) => (
        <Link key={c.id} to="/card/$id" params={{ id: c.id }} className="flex flex-col items-center">
          <div className="relative">
            {/* Stack depth */}
            <div className="absolute inset-0 translate-y-1.5 translate-x-1 rounded-[16px]" style={{ background: c.accent2, opacity: 0.5 }} />
            <div className="absolute inset-0 translate-y-3 translate-x-2 rounded-[16px]" style={{ background: "#000", opacity: 0.4 }} />
            <Card3D card={c} width={140} height={200} interactive={false} />
          </div>
          <div className="mt-3 text-center">
            <div className="font-display text-white text-[14px] leading-tight">{c.title}</div>
            <div className="font-mono text-[9px] tracking-[0.2em] text-white/40 mt-1">
              {c.serial} · {i % 2 === 0 ? "PHYSICAL" : "DIGITAL"}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function History() {
  const rows = [
    { t: "REDEEMED", what: "Backstage pass · AURORA WAVE", when: "2 days ago" },
    { t: "CLAIMED",  what: "Daily mystery — Common",       when: "3 days ago" },
    { t: "TRADED",   what: "Sunset Sessions 204/1000",      when: "1 week ago" },
    { t: "MINTED",   what: "Freestyle 19 · Day One",        when: "2 weeks ago" },
  ];
  return (
    <div className="px-5 mt-6 flex flex-col gap-3 pb-8">
      {rows.map((r,i)=>(
        <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex items-center justify-between">
          <div>
            <div className="font-mono text-[10px] tracking-[0.25em]" style={{ color: "var(--dpqr-accent)" }}>{r.t}</div>
            <div className="font-sans text-white text-[14px] mt-1">{r.what}</div>
          </div>
          <div className="font-mono text-[10px] text-white/40">{r.when}</div>
        </div>
      ))}
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <div className="font-display text-white text-[22px] leading-none">{n}</div>
      <div className="font-mono text-[9px] tracking-[0.2em] text-white/40 mt-1">{l}</div>
    </div>
  );
}
