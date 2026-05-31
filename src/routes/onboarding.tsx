import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldLogo, NeuButton, ClayCard, GlassPanel } from "@/narnia/ui";
import { CARDS, ARTISTS } from "@/narnia/data";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Welcome — Narnia Pass" }] }),
  component: Onboarding,
});

function Onboarding() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);

  return (
    <div className="np-shell">
      <main className="mx-auto max-w-[440px] min-h-screen px-6 pt-14 pb-10 flex flex-col">
        <div className="flex items-center justify-between">
          <ShieldLogo size={26} glow />
          <div className="font-mono text-[10px] text-white/40">{step+1} / 4</div>
        </div>

        {step === 0 && (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 grid place-items-center">
              <div className="text-center">
                <div className="grid place-items-center mb-6"><ShieldLogo size={120} glow /></div>
                <div className="font-display text-[40px] leading-[1.05]">Your pass into<br/>another world.</div>
                <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mt-4">NARNIA PASS</div>
              </div>
            </div>
            <NeuButton onClick={()=>setStep(1)} style={{ background: "linear-gradient(160deg,#8B0000,#CC0000)" }}>Continue</NeuButton>
          </div>
        )}

        {step === 1 && (
          <div className="flex-1 flex flex-col mt-6">
            <div className="font-display text-[28px] leading-tight">What's your world?</div>
            <div className="font-sans text-white/60 text-[13px] mt-2">Pick at least one. These are your worlds.</div>
            <div className="mt-5 grid grid-cols-2 gap-3 flex-1 content-start">
              {ARTISTS.map(a => {
                const on = picked.includes(a.id);
                return (
                  <button key={a.id} onClick={()=>setPicked(p => on ? p.filter(x=>x!==a.id) : [...p, a.id])}
                    className={`rounded-2xl p-4 ${on ? "neu-inset" : "neu-sm"} text-left`}>
                    <div className="h-12 w-12 rounded-full" style={{ background: `radial-gradient(circle, ${a.hue}, transparent 70%)` }} />
                    <div className="font-display text-white text-[16px] mt-3">{a.name}</div>
                    <div className="font-mono text-[10px] text-white/50">{(a.fans/1000).toFixed(0)}K fans</div>
                  </button>
                );
              })}
            </div>
            <NeuButton onClick={()=>picked.length && setStep(2)} style={{ background: picked.length ? "linear-gradient(160deg,#8B0000,#CC0000)" : undefined, opacity: picked.length ? 1 : 0.5 }}>Continue</NeuButton>
          </div>
        )}

        {step === 2 && (
          <div className="flex-1 flex flex-col mt-6">
            <div className="font-display text-[28px] leading-tight">Your first pass.</div>
            <div className="font-sans text-white/60 text-[13px] mt-2">A free Common card. This is yours. Forever.</div>
            <div className="flex-1 grid place-items-center my-6">
              <ClayCard card={CARDS[7]} size="lg" autoRotate interactive={false} />
            </div>
            <NeuButton onClick={()=>setStep(3)} style={{ background: "linear-gradient(160deg,#8B0000,#CC0000)" }}>Claim & continue</NeuButton>
          </div>
        )}

        {step === 3 && (
          <div className="flex-1 flex flex-col mt-6">
            <div className="font-display text-[28px] leading-tight">Create account</div>
            <GlassPanel className="p-5 mt-5">
              <div className="font-mono text-[10px] text-white/50 tracking-[0.2em]">STARTER PASS</div>
              <div className="font-display text-white text-[28px] mt-1">$2.99 <span className="text-white/40 text-[14px]">one-time</span></div>
              <div className="font-sans text-white/60 text-[12px] mt-1">Unlocks everything. Your entry.</div>
            </GlassPanel>
            <div className="mt-4 flex flex-col gap-2">
              <NeuButton onClick={()=>nav({ to: "/signup" })}>Continue with email</NeuButton>
              <NeuButton>Continue with Apple</NeuButton>
              <NeuButton>Continue with Google</NeuButton>
            </div>
            <div className="mt-auto">
              <NeuButton onClick={()=>nav({ to: "/pass" as any })} style={{ background: "linear-gradient(160deg,#8B0000,#CC0000)" }}>Pay & enter</NeuButton>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
