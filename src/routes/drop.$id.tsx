import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PhoneShell, TopBar } from "@/dpqr/Shell";
import { Card3D } from "@/dpqr/Card3D";
import { DROPS, formatCountdown } from "@/dpqr/data";

export const Route = createFileRoute("/drop/$id")({
  loader: ({ params }) => {
    const drop = DROPS.find(d => d.id === params.id);
    if (!drop) throw notFound();
    return { drop };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.drop.title} — ${loaderData?.drop.artist} · DPqR` },
      { name: "description", content: loaderData?.drop.subtitle },
    ],
  }),
  component: DropPage,
});

function DropPage() {
  const { drop } = Route.useLoaderData();
  const [t, setT] = useState(formatCountdown(drop.startsAt));
  useEffect(()=>{ const i = setInterval(()=>setT(formatCountdown(drop.startsAt)),1000); return ()=>clearInterval(i); },[drop.startsAt]);

  const phase = drop.status === "live" ? "RELEASE DAY" : drop.status === "teaser" ? "TEASER" : "POST-DROP";
  const pct = Math.round((drop.claimed/drop.supply)*100);

  return (
    <div style={{ ["--dpqr-accent" as any]: drop.accent }}>
      <PhoneShell>
        <TopBar back="/home" title={`${drop.artist} · ${phase}`} accent={drop.accent} />

        <div className="relative h-[420px] overflow-hidden">
          <div className="absolute inset-0" style={{ background: `radial-gradient(60% 60% at 50% 20%, ${drop.accent}55, transparent 70%)` }} />
          <div className="absolute inset-0 grain" />
          <div className="relative h-full grid place-items-center">
            <Card3D card={drop.card} autoRotate={drop.status!=="live"} width={240} height={340} />
          </div>
        </div>

        <div className="px-5 -mt-2">
          <div className="font-mono text-[10px] tracking-[0.3em]" style={{ color: drop.accent }}>{drop.artist}</div>
          <h1 className="font-display text-white text-[36px] leading-[1.02] mt-1">{drop.title}</h1>
          <p className="font-sans text-white/55 text-[13px] mt-2">{drop.subtitle}</p>
        </div>

        {drop.status === "teaser" && (
          <div className="mx-5 mt-5 rounded-2xl border p-5" style={{ borderColor: `${drop.accent}55`, background: `${drop.accent}11` }}>
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/60">DROPS IN</div>
            <div className="font-display text-white text-[44px] leading-none mt-1">{String(t.h).padStart(2,"0")}:{String(t.m).padStart(2,"0")}:{String(t.s).padStart(2,"0")}</div>
            <p className="font-sans text-white/55 text-[12px] mt-3">First 500 collectors get the <span className="text-white">Day One</span> serial stamp.</p>
            <button className="mt-4 h-12 w-full rounded-full font-sans font-semibold" style={{ background: drop.accent, color: "#0a0a0a" }}>Set drop reminder</button>
          </div>
        )}

        {drop.status === "live" && (
          <div className="mx-5 mt-5 rounded-2xl border p-5" style={{ borderColor: drop.accent, background: `${drop.accent}11` }}>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 urgent" />
              <div className="font-mono text-[10px] tracking-[0.3em]" style={{ color: drop.accent }}>LIVE NOW · CLOSES SOON</div>
            </div>
            <div className="mt-3 h-1.5 rounded-full overflow-hidden bg-white/10">
              <div className="h-full" style={{ width: `${pct}%`, background: drop.accent }} />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-white/50 tracking-[0.2em]">
              <span>{drop.claimed} CLAIMED</span><span>{drop.supply - drop.claimed} LEFT</span>
            </div>
            <button className="mt-4 h-12 w-full rounded-full font-sans font-semibold" style={{ background: drop.accent, color: "#0a0a0a" }}>Claim card — $24</button>
          </div>
        )}

        {drop.status === "ended" && (
          <div className="mx-5 mt-5 rounded-2xl border border-white/10 p-5 bg-white/[0.02]">
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">SOLD OUT</div>
            <div className="font-display text-white text-[20px] mt-1">Now trading on the floor.</div>
            <div className="mt-3 flex items-end justify-between">
              <div><div className="font-mono text-[9px] text-white/40 tracking-[0.2em]">FLOOR</div><div className="font-display text-white text-[20px]">$84</div></div>
              <div><div className="font-mono text-[9px] text-white/40 tracking-[0.2em]">LAST SALE</div><div className="font-display text-white text-[20px]">$92</div></div>
            </div>
            <button className="mt-4 h-12 w-full rounded-full font-sans font-semibold border border-white/15 text-white">View on marketplace</button>
          </div>
        )}

        <Section title="CAMPAIGN TIMELINE">
          <Phase done label="Teaser — blurred reveal" date="May 22" />
          <Phase active={drop.status==="live"} done={drop.status==="ended"} label="Release day — card unlocks" date="May 29" />
          <Phase done={drop.status==="ended"} label="Post-drop — battle voting" date="May 31" />
          <Phase label="Acoustic exclusive · holders only" date="Jun 04" />
        </Section>

        <Section title="WHAT THIS CARD UNLOCKS">
          <Perk text={drop.card.perk} />
          <Perk text="Embedded video moment — hold to play" />
          <Perk text="Trade & list on DPqR marketplace" />
          <Perk text="Holder-only chat with the artist" />
        </Section>

        <Section title="THE ARTIST">
          <Link to="/profile" className="flex items-center gap-3 px-1 py-2">
            <div className="h-12 w-12 rounded-full" style={{ background: `conic-gradient(${drop.accent}, ${drop.accent2})` }} />
            <div>
              <div className="font-display text-white text-[16px]">{drop.artist}</div>
              <div className="font-mono text-[10px] text-white/40 tracking-[0.2em]">128K FANS · 12 DROPS</div>
            </div>
            <span className="ml-auto h-8 px-4 rounded-full grid place-items-center text-[12px] font-sans" style={{ background: drop.accent, color: "#0a0a0a" }}>Follow</span>
          </Link>
        </Section>

        <div className="h-10" />
      </PhoneShell>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-7 px-5">
      <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">{title}</div>
      <div className="mt-3 flex flex-col gap-2">{children}</div>
    </div>
  );
}
function Phase({ label, date, active, done }: { label: string; date: string; active?: boolean; done?: boolean }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="h-2 w-2 rounded-full" style={{ background: done ? "var(--dpqr-accent)" : active ? "#fff" : "rgba(255,255,255,0.2)" }} />
      <div className="font-sans text-white/85 text-[13px] flex-1">{label}</div>
      <div className="font-mono text-[10px] text-white/40">{date}</div>
    </div>
  );
}
function Perk({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-white/5">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--dpqr-accent)" }} />
      <span className="font-sans text-white/85 text-[13px]">{text}</span>
    </div>
  );
}
