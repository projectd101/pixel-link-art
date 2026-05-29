import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PhoneShell, TopBar } from "@/dpqr/Shell";
import { Card3D } from "@/dpqr/Card3D";
import { CARDS } from "@/dpqr/data";

export const Route = createFileRoute("/card/$id")({
  loader: ({ params }) => {
    const card = CARDS.find(c => c.id === params.id);
    if (!card) throw notFound();
    return { card };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.card.title} — ${loaderData?.card.artist} · DPqR` },
    ],
  }),
  component: CardPage,
});

function CardPage() {
  const { card } = Route.useLoaderData();
  return (
    <div style={{ ["--dpqr-accent" as any]: card.accent }}>
      <PhoneShell>
        <TopBar back="/vault" accent={card.accent} right={
          <button className="h-9 w-9 grid place-items-center rounded-full border border-white/10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v14"/></svg>
          </button>
        } />

        <div className="relative h-[460px] overflow-hidden">
          <div className="absolute inset-0" style={{ background: `radial-gradient(60% 60% at 50% 30%, ${card.accent}55, transparent 70%)` }} />
          <div className="absolute inset-0 grain" />
          <div className="relative h-full grid place-items-center">
            <Card3D card={card} width={280} height={400} />
          </div>
          <div className="absolute bottom-3 left-0 right-0 text-center font-mono text-[9px] tracking-[0.3em] text-white/40">
            DRAG TO ROTATE · TAP TO FLIP · HOLD TO PLAY
          </div>
        </div>

        <div className="px-5 mt-2">
          <div className="font-mono text-[10px] tracking-[0.3em]" style={{ color: card.accent }}>{card.artist}</div>
          <h1 className="font-display text-white text-[34px] leading-[1.02] mt-1">{card.title}</h1>
        </div>

        <div className="px-5 mt-5 grid grid-cols-3 gap-2">
          <Cell l="SERIAL" v={card.serial} />
          <Cell l="RARITY" v={card.rarity} />
          <Cell l="EDITION" v={card.edition} />
        </div>

        <div className="px-5 mt-6">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">REDEEM</div>
          <div className="mt-3 rounded-2xl border border-white/10 p-4 bg-white/[0.02]">
            <div className="font-sans text-white text-[14px]">{card.perk}</div>
            <button className="mt-3 h-10 px-5 rounded-full font-sans font-semibold text-[13px]" style={{ background: card.accent, color: "#0a0a0a" }}>Redeem at venue</button>
          </div>
        </div>

        <div className="px-5 mt-6">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">OWNER HISTORY</div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.02] divide-y divide-white/5">
            {[
              ["You","Owned","since Day One"],
              ["@maverick.k","Traded","3 weeks ago"],
              ["@jen.real","Minted","6 weeks ago"],
            ].map(([who,act,when],i)=>(
              <div key={i} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="font-sans text-white text-[13px]">{who}</div>
                  <div className="font-mono text-[10px] text-white/40 tracking-[0.2em]">{act.toUpperCase()}</div>
                </div>
                <div className="font-mono text-[10px] text-white/40">{when}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 mt-6 grid grid-cols-2 gap-2 pb-8">
          <button className="h-12 rounded-full border border-white/15 text-white text-[13px] font-sans">List for trade</button>
          <button className="h-12 rounded-full text-[13px] font-sans font-semibold" style={{ background: card.accent, color: "#0a0a0a" }}>Send as gift</button>
        </div>

        <div className="px-5 pb-6">
          <Link to="/vault" className="font-mono text-[10px] tracking-[0.3em] text-white/40">← BACK TO VAULT</Link>
        </div>
      </PhoneShell>
    </div>
  );
}

function Cell({ l, v }: { l:string; v:string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <div className="font-mono text-[9px] tracking-[0.2em] text-white/40">{l}</div>
      <div className="font-display text-white text-[15px] mt-1">{v}</div>
    </div>
  );
}
