import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PhoneShell, TopBar, SectionLabel } from "@/dpqr/Shell";
import { Card3D } from "@/dpqr/Card3D";
import { DROPS, CARDS, formatCountdown } from "@/dpqr/data";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home — DPqR" }] }),
  component: Home,
});

function Home() {
  const next = DROPS.find(d => d.status === "teaser")!;
  const live = DROPS.find(d => d.status === "live")!;
  return (
    <PhoneShell>
      <TopBar right={<Link to="/notifications" aria-label="Notifications" className="h-9 w-9 grid place-items-center rounded-full border border-white/10">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0"/></svg>
      </Link>} />

      <div className="px-5 pt-4">
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">THE DROP FEED</div>
        <h1 className="font-display text-white text-[34px] leading-[1.05] mt-1">Today's<br/>moments.</h1>
      </div>

      <NextDropHero drop={next} />

      <SectionLabel>LIVE NOW</SectionLabel>
      <LiveDropCard drop={live} />

      <SectionLabel action={<Link to="/vault" className="font-mono text-[10px] tracking-[0.3em] text-white/60">VIEW ALL</Link>}>FROM ARTISTS YOU FOLLOW</SectionLabel>
      <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x px-5 mt-3 pb-2">
        {CARDS.map(c => (
          <Link to="/card/$id" params={{ id: c.id }} key={c.id} className="shrink-0">
            <Card3D card={c} width={180} height={260} interactive={false} />
            <div className="mt-2 font-mono text-[10px] tracking-[0.2em] text-white/50">{c.artist}</div>
            <div className="font-display text-white text-[15px] leading-tight">{c.title}</div>
          </Link>
        ))}
      </div>

      <SectionLabel>DAILY MYSTERY</SectionLabel>
      <div className="mx-5 mt-3 rounded-2xl p-5 relative overflow-hidden grain"
           style={{ background: "linear-gradient(135deg,#1a1208,#050505)", border: "1px solid var(--dpqr-line)" }}>
        <div className="font-display text-white text-[22px] leading-tight">Open today's<br/>mystery card.</div>
        <p className="font-sans text-white/55 text-[12px] mt-2 max-w-[240px]">Free claim resets in <span className="text-white">11h 24m</span>. Could be common. Could be mythic.</p>
        <button className="mt-4 h-10 px-5 rounded-full font-sans font-semibold text-[13px]" style={{ background: "var(--dpqr-accent)", color: "#0a0a0a" }}>Claim now</button>
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full" style={{ background: "radial-gradient(circle,#d4ad5a55,transparent 70%)" }} />
      </div>

      <SectionLabel>TRENDING BATTLES</SectionLabel>
      <div className="px-5 mt-3 flex flex-col gap-3 pb-6">
        {[["AURORA WAVE","KAIROS","62%"],["BLVCK NOVA","STORM ATLAS","48%"]].map(([a,b,p],i)=>(
          <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between">
              <div className="font-display text-white text-[18px]">{a} <span className="text-white/40">vs</span> {b}</div>
              <div className="font-mono text-[10px] text-white/50 tracking-[0.2em]">2H LEFT</div>
            </div>
            <div className="mt-3 h-1.5 rounded-full overflow-hidden bg-white/10">
              <div className="h-full" style={{ width: p, background: "var(--dpqr-accent)" }} />
            </div>
            <div className="mt-2 font-mono text-[10px] text-white/50 tracking-[0.2em]">{p} VOTE {a}</div>
          </div>
        ))}
      </div>
    </PhoneShell>
  );
}

function NextDropHero({ drop }: { drop: any }) {
  const [t, setT] = useState(formatCountdown(drop.startsAt));
  useEffect(()=>{ const i = setInterval(()=>setT(formatCountdown(drop.startsAt)),1000); return ()=>clearInterval(i); },[drop.startsAt]);
  return (
    <Link to="/drop/$id" params={{ id: drop.id }} className="mx-5 mt-5 rounded-3xl relative overflow-hidden grain block"
          style={{ background: `linear-gradient(160deg, ${drop.accent}33, #050505 65%)`, border: "1px solid var(--dpqr-line)" }}>
      <div className="p-5 flex gap-4">
        <div className="shrink-0">
          <Card3D card={drop.card} width={120} height={170} interactive={false} autoRotate />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">NEXT DROP · {drop.artist}</div>
          <div className="font-display text-white text-[22px] leading-tight mt-1">{drop.title}</div>
          <div className="font-sans text-white/55 text-[12px] mt-1">{drop.subtitle}</div>
          <div className="mt-4 flex gap-2">
            <Stat label="HRS" value={String(t.h).padStart(2,"0")} />
            <Stat label="MIN" value={String(t.m).padStart(2,"0")} />
            <Stat label="SEC" value={String(t.s).padStart(2,"0")} />
          </div>
        </div>
      </div>
    </Link>
  );
}

function LiveDropCard({ drop }: { drop: any }) {
  const pct = Math.round((drop.claimed / drop.supply) * 100);
  return (
    <Link to="/drop/$id" params={{ id: drop.id }} className="mx-5 mt-3 rounded-2xl block p-4 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${drop.accent}22, #0a0a0a)`, border: `1px solid ${drop.accent}44` }}>
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-red-500 urgent" />
        <span className="font-mono text-[10px] tracking-[0.3em]" style={{ color: drop.accent }}>LIVE</span>
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 ml-auto">{drop.supply - drop.claimed} LEFT</span>
      </div>
      <div className="font-display text-white text-[20px] leading-tight mt-2">{drop.title}</div>
      <div className="font-sans text-white/55 text-[12px]">{drop.artist}</div>
      <div className="mt-3 h-1 rounded-full overflow-hidden bg-white/10">
        <div className="h-full" style={{ width: `${pct}%`, background: drop.accent }} />
      </div>
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-black/40 border border-white/10 px-2.5 py-1.5">
      <div className="font-display text-white text-[18px] leading-none">{value}</div>
      <div className="font-mono text-[8px] tracking-[0.25em] text-white/40 mt-0.5">{label}</div>
    </div>
  );
}
