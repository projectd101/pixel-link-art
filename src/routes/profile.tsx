import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell, TopBar } from "@/dpqr/Shell";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — DPqR" }] }),
  component: Profile,
});

function Profile() {
  return (
    <PhoneShell>
      <TopBar right={
        <Link to="/settings" className="h-9 w-9 grid place-items-center rounded-full border border-white/10" aria-label="Settings">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 7 5.3l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>
        </Link>
      } />

      <div className="px-5 pt-4">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full grid place-items-center"
               style={{ background: "conic-gradient(from 0deg,#d4ad5a,#ff3d57,#7c5cff,#d4ad5a)" }}>
            <div className="h-[72px] w-[72px] rounded-full bg-black grid place-items-center font-display text-white text-[28px]">T</div>
          </div>
          <div>
            <div className="font-display text-white text-[24px] leading-tight">@tasha.r</div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 mt-1">DAY ONE · SINCE 2025</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-2">
          <Stat n="14" l="OWNED" />
          <Stat n="3,420" l="RARITY" />
          <Stat n="9" l="SHOWS" />
          <Stat n="6" l="ARTISTS" />
        </div>

        <div className="mt-6">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">DAY ONE BADGES</div>
          <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {["AURORA","KAIROS","NOVA","STORM","LUNA"].map((n,i)=>(
              <div key={n} className="shrink-0 w-20 text-center">
                <div className="h-20 w-20 rounded-2xl border border-white/10 grid place-items-center" style={{ background: `linear-gradient(135deg, hsl(${i*60} 60% 25%), #0a0a0a)` }}>
                  <span className="font-display text-white text-[20px]">{n[0]}</span>
                </div>
                <div className="font-mono text-[9px] tracking-[0.2em] text-white/40 mt-2">{n}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">ACTIVITY</div>
          <div className="mt-3 rounded-2xl border border-white/10 divide-y divide-white/5 bg-white/[0.02]">
            {[
              ["Attended","AURORA WAVE · The Forum"],
              ["Voted in battle","AURORA vs KAIROS"],
              ["Followed","BLVCK NOVA"],
              ["Redeemed","Backstage pass · Tier A"],
            ].map(([k,v],i)=>(
              <div key={i} className="px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] text-white/40">{k.toUpperCase()}</div>
                  <div className="font-sans text-white text-[13px] mt-0.5">{v}</div>
                </div>
                <span className="font-mono text-[10px] text-white/30">{i+1}d</span>
              </div>
            ))}
          </div>
        </div>

        <Link to="/studio" className="mt-6 mb-8 block rounded-2xl border border-white/10 p-4 bg-gradient-to-br from-white/[0.05] to-transparent">
          <div className="font-mono text-[10px] tracking-[0.3em]" style={{ color: "var(--dpqr-accent)" }}>FOR ARTISTS</div>
          <div className="font-display text-white text-[18px] mt-1">Open Artist Studio →</div>
          <div className="font-sans text-white/55 text-[12px] mt-1">Design drops, manage campaigns, view superfan data.</div>
        </Link>
      </div>
    </PhoneShell>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
      <div className="font-display text-white text-[18px] leading-none">{n}</div>
      <div className="font-mono text-[9px] tracking-[0.2em] text-white/40 mt-1">{l}</div>
    </div>
  );
}
