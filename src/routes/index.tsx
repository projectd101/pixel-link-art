import { createFileRoute, Link } from "@tanstack/react-router";
import { Card3D } from "@/dpqr/Card3D";
import { CARDS } from "@/dpqr/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DPqR — Collectible fan cards from your favorite artists" },
      { name: "description", content: "DPqR is the physical-digital fan card platform. Drops, vaults, NFC-chipped collectibles." },
    ],
  }),
  component: Splash,
});

function Splash() {
  return (
    <div className="min-h-screen w-full dpqr-shell relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
           style={{ background: "radial-gradient(60% 40% at 50% 20%, rgba(212,173,90,0.18), transparent 70%)" }} />
      <main className="mx-auto flex min-h-screen max-w-[440px] flex-col px-6 pt-12 pb-10 relative">
        <div className="font-display text-[28px]">DPqR<span style={{color:"var(--dpqr-accent)"}}>.</span></div>
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/50 mt-1">PHYSICAL · DIGITAL · COLLECTIBLE</div>

        <div className="flex-1 grid place-items-center my-8">
          <div className="flex flex-col items-center">
            <Card3D card={CARDS[0]} autoRotate width={240} height={340} />
          </div>
        </div>

        <h1 className="font-display text-white text-[40px] leading-[1.02]">
          Hold something<br/>nobody else has.
        </h1>
        <p className="font-sans text-white/60 text-[14px] mt-3 leading-relaxed">
          Limited fan cards from the artists you love.
          Chipped, holographic, redeemable for real-world access.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link to="/onboarding" className="h-12 rounded-full grid place-items-center font-sans font-semibold"
                style={{ background: "var(--dpqr-accent)", color: "#0a0a0a" }}>
            Get started
          </Link>
          <Link to="/login" className="h-12 rounded-full grid place-items-center font-sans border border-white/15 text-white/90">
            I already have an account
          </Link>
        </div>

        <div className="font-mono text-[9px] tracking-[0.25em] text-white/30 text-center mt-6">
          v1.0 · MADE FOR SUPERFANS
        </div>
      </main>
    </div>
  );
}
