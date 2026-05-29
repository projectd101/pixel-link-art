import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card3D } from "@/dpqr/Card3D";
import { CARDS } from "@/dpqr/data";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

const STEPS = [
  { tag: "01 · COLLECT", title: "Real cards.\nReal moments.", body: "Every drop is a chipped, holographic card with an embedded exclusive moment from your artist.", card: CARDS[0] },
  { tag: "02 · UNLOCK",  title: "Access\nthat means something.", body: "Cards are keys — concert priority, meet & greets, merch drops, backstage passes.", card: CARDS[3] },
  { tag: "03 · RARE",    title: "Limited\nby design.", body: "Day One stamps. Mythic 1-of-100s. Once they're gone, they're gone.", card: CARDS[1] },
];

function Onboarding() {
  const [i, setI] = useState(0);
  const step = STEPS[i];
  const last = i === STEPS.length - 1;
  return (
    <div className="min-h-screen w-full dpqr-shell relative overflow-hidden">
      <main className="mx-auto flex min-h-screen max-w-[440px] flex-col px-6 pt-8 pb-10 relative">
        <div className="flex items-center justify-between">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">{step.tag}</div>
          <Link to="/signup" className="font-mono text-[10px] tracking-[0.3em] text-white/40">SKIP</Link>
        </div>

        <div className="flex-1 grid place-items-center my-6">
          <Card3D card={step.card} autoRotate width={240} height={340} />
        </div>

        <h1 className="font-display text-white text-[36px] leading-[1.05] whitespace-pre-line">{step.title}</h1>
        <p className="font-sans text-white/60 text-[14px] mt-3 leading-relaxed">{step.body}</p>

        <div className="flex gap-1.5 mt-6">
          {STEPS.map((_, k) => (
            <span key={k} className="h-1 flex-1 rounded-full"
                  style={{ background: k <= i ? "var(--dpqr-accent)" : "rgba(255,255,255,0.12)" }} />
          ))}
        </div>

        <div className="mt-6">
          {last ? (
            <Link to="/signup" className="h-12 rounded-full grid place-items-center font-sans font-semibold"
                  style={{ background: "var(--dpqr-accent)", color: "#0a0a0a" }}>Create my account</Link>
          ) : (
            <button onClick={() => setI(i + 1)} className="w-full h-12 rounded-full font-sans font-semibold"
                    style={{ background: "var(--dpqr-accent)", color: "#0a0a0a" }}>Continue</button>
          )}
        </div>
      </main>
    </div>
  );
}
