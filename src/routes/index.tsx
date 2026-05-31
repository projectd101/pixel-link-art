import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldLogo, NeuButton, ClayCard } from "@/narnia/ui";
import { CARDS } from "@/narnia/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Narnia Pass — Your pass into another world" },
      { name: "description", content: "Narnia Pass — physical-digital fan collectibles. Cards from the artists you live for." },
    ],
  }),
  component: Splash,
});

function Splash() {
  return (
    <div className="np-shell relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
           style={{ background: "radial-gradient(60% 40% at 50% 20%, rgba(204,0,0,0.18), transparent 70%)" }} />
      <main className="mx-auto flex min-h-screen max-w-[440px] flex-col px-6 pt-14 pb-10 relative">
        <div className="flex items-center gap-3">
          <ShieldLogo size={32} glow />
          <div>
            <div className="font-display text-[22px] leading-none">Narnia Pass</div>
            <div className="font-mono text-[9px] tracking-[0.3em] text-white/40 mt-1">PHYSICAL · DIGITAL · COLLECTIBLE</div>
          </div>
        </div>

        <div className="flex-1 grid place-items-center my-8">
          <ClayCard card={CARDS[1]} size="lg" autoRotate interactive={false} />
        </div>

        <h1 className="font-display text-white text-[42px] leading-[1.02]">
          Your pass into<br/>another world.
        </h1>
        <p className="font-sans text-white/60 text-[14px] mt-3 leading-relaxed">
          Limited cards from the artists you live for. NFC-chipped, holographic, redeemable for real-world access.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <NeuButton to="/onboarding" style={{ background: "linear-gradient(160deg,#8B0000,#CC0000)" }}>Get started</NeuButton>
          <NeuButton to="/login">I already have an account</NeuButton>
        </div>

        <div className="font-mono text-[9px] tracking-[0.25em] text-white/30 text-center mt-6">v1.0 · MADE FOR SUPERFANS</div>
      </main>
    </div>
  );
}
