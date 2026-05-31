import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { PhoneShell, TopBar, GlassPanel, NeuButton, ClayCard, SectionLabel } from "@/narnia/ui";
import { findArtist, ARTISTS, CARDS } from "@/narnia/data";

export const Route = createFileRoute("/artist/$id")({
  head: () => ({ meta: [{ title: "Artist — Narnia Pass" }] }),
  component: Artist,
});

function Artist() {
  const { id } = useParams({ from: "/artist/$id" });
  const a = findArtist(id) ?? ARTISTS[0];
  const cards = CARDS.filter(c => c.artist.toLowerCase().includes(a.name.toLowerCase()));
  return (
    <PhoneShell>
      <TopBar title={a.name.toUpperCase()} back="/world" />
      <div className="relative">
        <div className="absolute inset-0" style={{ background: `radial-gradient(60% 40% at 50% 0%, ${a.hue}33, transparent 70%)` }} />
        <div className="px-5 pt-4 relative">
          <div className="font-display text-white text-[36px]">{a.name}</div>
          <div className="font-mono text-[11px] text-white/60 mt-1">{(a.fans/1000).toFixed(1)}K fans · neighborhood</div>
        </div>
      </div>

      <div className="grid place-items-center mt-4">
        {cards[0] && <ClayCard card={cards[0]} size="lg" />}
      </div>

      <SectionLabel>Drops</SectionLabel>
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2">
        {(cards.length ? cards : CARDS.slice(0,3)).map(c => (
          <Link key={c.id} to={"/card/$id" as any} params={{ id: c.id }} className="shrink-0">
            <ClayCard card={c} size="md" interactive={false} />
          </Link>
        ))}
      </div>

      <SectionLabel>Top 10 fans</SectionLabel>
      <GlassPanel className="mx-5 p-4">
        {["zarya.x","raulito","mxnight","kairo.fan","blvckveil"].map((u,i)=>(
          <div key={u} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <div className="flex items-center gap-3">
              <div className="font-display text-white/70 w-6">{i+1}</div>
              <div className="font-sans text-white text-[14px]">@{u}</div>
            </div>
            <div className="font-mono text-[11px]" style={{ color: a.hue }}>{(4200 - i*380)} pts</div>
          </div>
        ))}
      </GlassPanel>

      <SectionLabel>Trade floor</SectionLabel>
      <GlassPanel className="mx-5 p-4 mb-8">
        <div className="font-mono text-[10px] tracking-[0.2em] text-white/50">LIVE PRICES</div>
        {[["#001","$2,400"],["#012","$1,180"],["#044","$640"]].map(([k,v])=>(
          <div key={k} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <div className="font-sans text-white">{a.name} {k}</div>
            <div className="font-mono text-[12px]" style={{ color: a.hue }}>{v}</div>
          </div>
        ))}
      </GlassPanel>
    </PhoneShell>
  );
}
