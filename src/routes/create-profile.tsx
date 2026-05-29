import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/create-profile")({ component: Create });

const ARTISTS = ["AURORA WAVE","KAIROS","LUNA DEL SOL","BLVCK NOVA","MARA","STORM ATLAS","SAGE LOREN","NEON HORIZON"];

function Create() {
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (a:string) => setPicked(p => p.includes(a) ? p.filter(x=>x!==a) : [...p, a]);
  return (
    <div className="min-h-screen w-full dpqr-shell">
      <main className="mx-auto max-w-[440px] px-6 pt-10 pb-10">
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">STEP 2 OF 2</div>
        <h1 className="font-display text-white text-[34px] leading-tight mt-3">Follow the artists you ride for.</h1>
        <p className="font-sans text-white/55 text-[13px] mt-2">Drops from these artists show up first in your feed.</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {ARTISTS.map(a => {
            const on = picked.includes(a);
            return (
              <button key={a} onClick={()=>toggle(a)}
                className="aspect-[4/3] rounded-2xl border text-left p-3 flex flex-col justify-between transition-all"
                style={{ borderColor: on ? "var(--dpqr-accent)" : "rgba(255,255,255,0.1)", background: on ? "rgba(212,173,90,0.08)" : "rgba(255,255,255,0.03)" }}>
                <div className="h-8 w-8 rounded-full" style={{ background: `conic-gradient(from 0deg, #${(a.length*123456).toString(16).slice(0,6)}, #0a0a0a)` }} />
                <div>
                  <div className="font-display text-white text-[16px] leading-tight">{a}</div>
                  <div className="font-mono text-[9px] text-white/40 tracking-[0.2em] mt-1">{on ? "FOLLOWING" : "TAP TO FOLLOW"}</div>
                </div>
              </button>
            );
          })}
        </div>

        <Link to="/home" className="mt-8 h-12 rounded-full grid place-items-center font-sans font-semibold"
              style={{ background: "var(--dpqr-accent)", color: "#0a0a0a" }}>
          Enter the app
        </Link>
      </main>
    </div>
  );
}
