import { createFileRoute } from "@tanstack/react-router";
import { PhoneShell, TopBar } from "@/dpqr/Shell";
import { Card3D } from "@/dpqr/Card3D";
import { CARDS } from "@/dpqr/data";

export const Route = createFileRoute("/studio")({
  head: () => ({ meta: [{ title: "Artist Studio — DPqR" }] }),
  component: Studio,
});

function Studio() {
  return (
    <PhoneShell>
      <TopBar back="/profile" title="ARTIST STUDIO" />
      <div className="px-5 pt-4">
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">AURORA WAVE</div>
        <h1 className="font-display text-white text-[30px] leading-tight mt-1">Campaign control.</h1>
      </div>

      <div className="px-5 mt-5 grid grid-cols-2 gap-2">
        <Big n="128,420" l="FANS" />
        <Big n="$48,210" l="MTD REVENUE" />
        <Big n="12" l="ACTIVE DROPS" />
        <Big n="3,420" l="SUPERFANS" />
      </div>

      <div className="px-5 mt-6">
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">UPCOMING DROP</div>
        <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex gap-4">
          <Card3D card={CARDS[0]} width={100} height={140} interactive={false} />
          <div className="flex-1">
            <div className="font-display text-white text-[18px] leading-tight">Midnight Acoustic</div>
            <div className="font-mono text-[10px] text-white/40 tracking-[0.2em] mt-1">DROP 04 · 500 SUPPLY</div>
            <div className="mt-3 flex flex-col gap-1.5 text-[12px]">
              <Row k="Schedule" v="May 30 · 8:00 PM" />
              <Row k="Print order" v="500 / approved" />
              <Row k="NFC programmed" v="412 / 500" />
            </div>
            <button className="mt-3 h-9 px-4 rounded-full text-[12px] font-semibold" style={{ background: "var(--dpqr-accent)", color: "#0a0a0a" }}>Edit campaign</button>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6">
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">QUICK ACTIONS</div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            ["Design new card","Open builder"],
            ["Schedule release","Calendar"],
            ["Ticket sales","Manage"],
            ["Message holders","Send drop"],
            ["Order physical prints","Vendor"],
            ["Superfan analytics","Insights"],
          ].map(([t,s])=>(
            <button key={t} className="text-left p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="font-sans text-white text-[14px]">{t}</div>
              <div className="font-mono text-[10px] text-white/40 tracking-[0.2em] mt-1">{s.toUpperCase()}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mt-6 pb-8">
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">RECENT</div>
        <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.02] divide-y divide-white/5">
          {[
            ["DROP COMPLETED","Freestyle 19 — 250/250 sold","2d"],
            ["MESSAGE SENT","Tour 26 announcement to 3,420 holders","4d"],
            ["MERCH DROP","Vinyl deluxe — 1,200 sold","1w"],
          ].map(([t,b,w])=>(
            <div key={t} className="px-4 py-3">
              <div className="font-mono text-[10px] tracking-[0.2em]" style={{color:"var(--dpqr-accent)"}}>{t}</div>
              <div className="font-sans text-white text-[13px] mt-1">{b}</div>
              <div className="font-mono text-[10px] text-white/40 mt-1">{w} ago</div>
            </div>
          ))}
        </div>
      </div>
    </PhoneShell>
  );
}

function Big({ n, l }: { n:string; l:string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="font-display text-white text-[22px] leading-none">{n}</div>
      <div className="font-mono text-[9px] tracking-[0.2em] text-white/40 mt-2">{l}</div>
    </div>
  );
}
function Row({ k, v }: { k:string; v:string }) {
  return <div className="flex justify-between"><span className="font-mono text-[10px] tracking-[0.2em] text-white/40">{k.toUpperCase()}</span><span className="font-sans text-white/80">{v}</span></div>;
}
