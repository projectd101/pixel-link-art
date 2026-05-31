import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell, TopBar, GlassPanel, NeuButton, ClayCard, SectionLabel, LivePulse, CountdownBlock } from "@/narnia/ui";
import { DROPS, CARDS } from "@/narnia/data";

export const Route = createFileRoute("/pass")({
  head: () => ({ meta: [{ title: "Pass — Narnia Pass" }] }),
  component: Pass,
});

function Pass() {
  const next = DROPS.find(d => d.status === "teaser")!;
  const liveDrops = DROPS.filter(d => d.status === "live");
  return (
    <PhoneShell>
      <TopBar right={
        <Link to={"/notifications" as any} className="h-10 w-10 grid place-items-center rounded-full neu-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0"/></svg>
        </Link>}/>

      {/* Live status bar */}
      <GlassPanel className="mx-5 mt-3 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2"><LivePulse /><span className="font-mono text-[11px] text-white/80">3 DROPS LIVE</span></div>
        <div className="font-mono text-[11px] text-white/70">#247 GLOBAL</div>
      </GlassPanel>

      <div className="px-5 pt-5">
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">THE PASS · TODAY</div>
        <h1 className="font-display text-white text-[34px] leading-[1.05] mt-1">Living drops.</h1>
      </div>

      {/* Next drop hero */}
      <Link to={"/drop" as any} className="mx-5 mt-5 block">
        <GlassPanel className="p-5 relative overflow-hidden">
          <div className="flex gap-4">
            <div className="np-breathe shrink-0"><ClayCard card={next.card} size="md" interactive={false} /></div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">NEXT DROP · {next.artist.toUpperCase()}</div>
              <div className="font-display text-white text-[22px] leading-tight mt-1">{next.title}</div>
              <div className="font-sans text-white/55 text-[12px] mt-1">{next.supply} pieces only</div>
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <CountdownBlock target={next.startsAt} />
            <NeuButton className="!h-10 !px-4">Notify me</NeuButton>
          </div>
        </GlassPanel>
      </Link>

      {/* Daily mystery */}
      <SectionLabel>Daily Drop</SectionLabel>
      <GlassPanel className="mx-5 p-5">
        <div className="flex items-center gap-4">
          <div className="np-breathe"><ClayCard card={CARDS[7]} size="sm" interactive={false} /></div>
          <div className="flex-1">
            <div className="font-display text-white text-[18px]">Open today's<br/>mystery card.</div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-white/50 mt-2">FREE · 847 LEFT · RESETS 11:24</div>
          </div>
        </div>
        <NeuButton className="mt-4 w-full" style={{ background: "linear-gradient(160deg,#8B0000,#CC0000)" }}>Claim now</NeuButton>
      </GlassPanel>

      <SectionLabel action={<Link to={"/world" as any} className="font-mono text-[10px] tracking-[0.2em] text-white/50">SEE ALL ›</Link>}>Dropping now</SectionLabel>
      <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-2">
        {liveDrops.map(d => (
          <Link to={"/card/$id" as any} params={{ id: d.card.id }} key={d.id} className="shrink-0">
            <div className="np-breathe"><ClayCard card={d.card} size="md" interactive={false} /></div>
            <GlassPanel className="mt-2 px-2 py-1 inline-block">
              <span className="font-mono text-[10px] text-white/80">${d.price} · {d.supply - d.claimed} left</span>
            </GlassPanel>
          </Link>
        ))}
      </div>

      <SectionLabel>Battles live</SectionLabel>
      <div className="px-5 flex flex-col gap-3">
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-display text-white text-[16px]">Speed <span className="text-white/40">vs</span> Travis</div>
            <span className="font-mono text-[10px] text-white/50 tracking-[0.2em]">2H LEFT</span>
          </div>
          <div className="flex items-center gap-3">
            <ClayCard card={CARDS[0]} size="sm" interactive={false} />
            <span className="font-display text-[18px] text-white/50">vs</span>
            <ClayCard card={CARDS[1]} size="sm" interactive={false} />
          </div>
          <div className="mt-3 h-1.5 rounded-full overflow-hidden neu-inset">
            <div className="h-full" style={{ width: "62%", background: "linear-gradient(90deg,#8B0000,#CC0000)" }} />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-white/60">
            <span>62% SPEED</span><span>38% TRAVIS</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <NeuButton className="!h-10">Vote Speed</NeuButton>
            <NeuButton className="!h-10">Vote Travis</NeuButton>
          </div>
        </GlassPanel>
      </div>

      <SectionLabel>Just revealed</SectionLabel>
      <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-2">
        {CARDS.slice(2,6).map(c => (
          <Link to={"/card/$id" as any} params={{ id: c.id }} key={c.id} className="shrink-0">
            <ClayCard card={c} size="md" interactive={false} />
            <div className="mt-2 font-mono text-[10px] text-white/50">4,201 wanted · 200 got</div>
          </Link>
        ))}
      </div>

      {/* The Hunt */}
      <GlassPanel className="mx-5 mt-6 p-5 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full" style={{ background: "radial-gradient(circle,#FF222244,transparent 70%)" }} />
        <div className="font-mono text-[10px] tracking-[0.3em] text-red-400">THE HUNT · DAY 3</div>
        <div className="font-display text-white text-[20px] mt-1">A card is hidden somewhere.</div>
        <NeuButton className="mt-4">Hunt now</NeuButton>
      </GlassPanel>
    </PhoneShell>
  );
}
