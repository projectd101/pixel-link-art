import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneShell, TopBar, GlassPanel, NeuButton } from "@/narnia/ui";

export const Route = createFileRoute("/scan")({
  head: () => ({ meta: [{ title: "Scan — Narnia Pass" }] }),
  component: Scan,
});

function Scan() {
  const [state, setState] = useState<"idle"|"ok"|"fail">("idle");
  return (
    <PhoneShell>
      <TopBar title="VERIFY" back />
      <div className="px-5 pt-6">
        <div className="font-display text-white text-[28px] leading-tight">Hold NFC card<br/>or scan QR.</div>
        <div className="font-mono text-[11px] text-white/50 mt-2">Validates in under 2 seconds.</div>
      </div>

      {/* Viewfinder */}
      <div className="mx-5 mt-6 aspect-square rounded-3xl neu-inset relative overflow-hidden grid place-items-center">
        {state === "idle" && (
          <>
            <div className="absolute inset-6 rounded-2xl border border-red-500/40" />
            {[["top-6 left-6","tl"],["top-6 right-6","tr"],["bottom-6 left-6","bl"],["bottom-6 right-6","br"]].map(([cls,k])=>(
              <div key={k} className={`absolute ${cls} h-6 w-6 border-red-500`} style={{
                borderTopWidth: cls.includes("top")?2:0,
                borderBottomWidth: cls.includes("bottom")?2:0,
                borderLeftWidth: cls.includes("left")?2:0,
                borderRightWidth: cls.includes("right")?2:0,
              }} />
            ))}
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/60">SCANNING…</div>
          </>
        )}
        {state === "ok" && (
          <div className="text-center">
            <div className="h-20 w-20 rounded-full mx-auto grid place-items-center" style={{ background: "#0d3", boxShadow: "0 0 40px #0d3" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg>
            </div>
            <div className="font-display text-white text-[22px] mt-4">VALID</div>
            <div className="font-mono text-[11px] text-white/60 mt-1">Travis · Astro Tour · GA</div>
          </div>
        )}
        {state === "fail" && (
          <div className="text-center">
            <div className="h-20 w-20 rounded-full mx-auto grid place-items-center" style={{ background: "#c00", boxShadow: "0 0 40px #c00" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M6 6l12 12M18 6L6 18"/></svg>
            </div>
            <div className="font-display text-white text-[22px] mt-4">REJECTED</div>
            <div className="font-mono text-[11px] text-white/60 mt-1">Card not recognized</div>
          </div>
        )}
      </div>

      <div className="px-5 mt-5 grid grid-cols-2 gap-2">
        <NeuButton onClick={()=>setState("ok")} style={{ background: "linear-gradient(160deg,#005000,#0d3)" }}>Simulate OK</NeuButton>
        <NeuButton onClick={()=>setState("fail")}>Simulate fail</NeuButton>
      </div>
      <NeuButton className="mx-5 mt-2" onClick={()=>setState("idle")}>Reset</NeuButton>

      <GlassPanel className="mx-5 mt-6 p-4 mb-8">
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">TIP</div>
        <div className="font-sans text-white text-[13px] mt-1">Hold the back of your phone against the card's NFC chip, or center the QR in the frame.</div>
      </GlassPanel>
    </PhoneShell>
  );
}
