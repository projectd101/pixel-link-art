import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell, TopBar, GlassPanel, NeuButton, ClayCard, SectionLabel, ShieldLogo } from "@/narnia/ui";
import { CARDS, ARTISTS } from "@/narnia/data";

export const Route = createFileRoute("/me")({
  head: () => ({ meta: [{ title: "Me — Narnia Pass" }] }),
  component: Me,
});

function Me() {
  return (
    <PhoneShell>
      <TopBar right={
        <Link to={"/settings" as any} className="h-10 w-10 grid place-items-center rounded-full neu-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>
        </Link>
      }/>
      <div className="px-5 pt-4 flex items-center gap-4">
        <Link to={"/card/$id" as any} params={{ id: CARDS[1].id }}>
          <ClayCard card={CARDS[1]} size="sm" interactive={false} />
        </Link>
        <div>
          <div className="font-display text-white text-[24px] leading-tight">@superfan_42</div>
          <div className="font-mono text-[10px] text-white/50 mt-1">Member since · 2024 · Genesis</div>
        </div>
      </div>

      {/* Identity strip */}
      <SectionLabel>Identity</SectionLabel>
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-5 pb-2">
        {["Genesis Member","Day One · Speed S1","Battle Champion","Inner Circle · Travis","Hunt Winner"].map(b => (
          <GlassPanel key={b} className="px-3 py-2 shrink-0">
            <span className="font-mono text-[10px] text-white/85 tracking-[0.15em]">{b.toUpperCase()}</span>
          </GlassPanel>
        ))}
      </div>

      {/* Stats grid */}
      <SectionLabel>Stats</SectionLabel>
      <div className="grid grid-cols-2 gap-2 px-5">
        {[["14","CARDS OWNED"],["3","CONCERTS"],["7","BATTLES WON"],["12","TRADES"]].map(([n,l]) => (
          <GlassPanel key={l} className="p-4">
            <div className="font-display text-white text-[26px] leading-none">{n}</div>
            <div className="font-mono text-[9px] tracking-[0.2em] text-white/50 mt-2">{l}</div>
          </GlassPanel>
        ))}
      </div>

      {/* Fan ranks */}
      <SectionLabel>Fan ranks</SectionLabel>
      <div className="px-5 flex flex-col gap-2">
        {ARTISTS.slice(0,4).map(a => (
          <GlassPanel key={a.id} className="p-4 relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: `radial-gradient(80% 80% at 100% 0%, ${a.hue}30, transparent 70%)` }} />
            <div className="relative flex items-center justify-between">
              <div>
                <div className="font-display text-white text-[16px]">{a.name}</div>
                <div className="font-mono text-[10px] text-white/50">Inner Circle · 12 cards</div>
              </div>
              <div className="font-display text-[20px]" style={{ color: a.hue }}>#{Math.floor(Math.random()*99)+1}</div>
            </div>
            <div className="relative mt-3 h-1.5 rounded-full neu-inset overflow-hidden">
              <div className="h-full" style={{ width: `${40+Math.random()*55}%`, background: a.hue }} />
            </div>
          </GlassPanel>
        ))}
      </div>

      <SectionLabel>Trade history</SectionLabel>
      <GlassPanel className="mx-5 p-4">
        {[
          { t: "BOUGHT",  c: "Speed Genesis #003",  p: "$29", v: "$420", pos: true },
          { t: "SOLD",    c: "Travis Astro #099",   p: "$79", v: "$340", pos: false },
          { t: "RECEIVED",c: "Kairos Freestyle #012",p: "—",  v: "$210", pos: true },
        ].map((r,i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <div>
              <div className="font-mono text-[9px] tracking-[0.2em] text-red-300">{r.t}</div>
              <div className="font-sans text-white text-[13px] mt-0.5">{r.c}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[12px] text-white">{r.v}</div>
              <div className="font-mono text-[10px] text-white/40">paid {r.p}</div>
            </div>
          </div>
        ))}
      </GlassPanel>

      {/* Settings list */}
      <SectionLabel>Settings</SectionLabel>
      <div className="px-5 flex flex-col gap-2 pb-8">
        {[
          ["Account","/settings"],
          ["Notifications","/notifications"],
          ["Privacy","/privacy"],
          ["Physical card delivery","/settings"],
          ["Apply to become a Creator","/settings"],
          ["Terms","/terms"],
          ["Support","/settings"],
        ].map(([label,to]) => (
          <Link key={label} to={to as any} className="neu-sm rounded-2xl px-4 h-14 flex items-center justify-between">
            <span className="font-sans text-white text-[14px]">{label}</span>
            <span className="text-white/40">›</span>
          </Link>
        ))}
        <NeuButton className="mt-3" style={{ background: "linear-gradient(160deg,#8B0000,#CC0000)" }}>Apply as a Creator</NeuButton>
      </div>
    </PhoneShell>
  );
}
