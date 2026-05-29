import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneShell, TopBar } from "@/dpqr/Shell";

export const Route = createFileRoute("/scan")({
  head: () => ({ meta: [{ title: "Scan — DPqR" }] }),
  component: Scan,
});

function Scan() {
  const [state, setState] = useState<"idle"|"valid"|"invalid">("idle");
  return (
    <PhoneShell>
      <TopBar title="OFFLINE MODE READY" right={
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/60 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> ONLINE
        </span>
      } />

      <div className="px-5 pt-5">
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">SCAN & REDEEM</div>
        <h1 className="font-display text-white text-[30px] leading-tight mt-1">Tap NFC or scan a card.</h1>
      </div>

      <div className="px-5 mt-6">
        <div className="relative aspect-square rounded-3xl border border-white/10 grid place-items-center overflow-hidden"
             style={{ background: "linear-gradient(180deg,#0a0a0a,#000)" }}>
          {/* viewfinder */}
          <div className="absolute inset-8 rounded-2xl border-2 border-white/20" />
          <Corner cls="top-6 left-6 rotate-0"/><Corner cls="top-6 right-6 rotate-90"/>
          <Corner cls="bottom-6 right-6 rotate-180"/><Corner cls="bottom-6 left-6 -rotate-90"/>
          <div className="absolute left-8 right-8 h-px bg-[var(--dpqr-accent)] urgent" style={{ top: "50%" }} />
          <div className="relative text-center">
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">HOLD CARD STEADY</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button onClick={()=>setState("valid")} className="h-12 rounded-full font-sans font-semibold text-[13px]" style={{ background: "var(--dpqr-accent)", color: "#0a0a0a" }}>Simulate tap</button>
          <button onClick={()=>setState("invalid")} className="h-12 rounded-full border border-white/15 text-white text-[13px]">Test invalid</button>
        </div>
      </div>

      {state === "valid" && (
        <Result ok title="VALID" lines={[["Owner","Tasha Reyes"],["Access","Backstage · Tier A"],["Remaining uses","1 of 1"],["Card","Midnight Acoustic · 012/500"]]} onClose={()=>setState("idle")} />
      )}
      {state === "invalid" && (
        <Result ok={false} title="INVALID" lines={[["Reason","Already redeemed"],["When","May 22, 21:14"],["Venue","The Forum, LA"]]} onClose={()=>setState("idle")} />
      )}

      <div className="h-12" />
    </PhoneShell>
  );
}

function Result({ ok, title, lines, onClose }: { ok: boolean; title: string; lines: [string,string][]; onClose: ()=>void }) {
  return (
    <div className="mx-5 mt-6 rounded-2xl border p-5"
      style={{ borderColor: ok ? "#34d399" : "#ef4444", background: ok ? "rgba(52,211,153,0.08)" : "rgba(239,68,68,0.08)" }}>
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: ok ? "#34d399" : "#ef4444" }} />
        <span className="font-mono text-[11px] tracking-[0.3em]" style={{ color: ok ? "#34d399" : "#ef4444" }}>{title}</span>
      </div>
      <div className="mt-4 divide-y divide-white/5">
        {lines.map(([k,v])=>(
          <div key={k} className="py-2.5 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/40">{k.toUpperCase()}</span>
            <span className="font-sans text-white text-[13px]">{v}</span>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="mt-3 h-10 w-full rounded-full border border-white/15 text-white text-[13px]">Done</button>
    </div>
  );
}
function Corner({ cls }: { cls: string }) {
  return <span className={`absolute h-5 w-5 border-l-2 border-t-2 ${cls}`} style={{ borderColor: "var(--dpqr-accent)" }} />;
}
