import { createFileRoute } from "@tanstack/react-router";
import { PhoneShell, TopBar } from "@/dpqr/Shell";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — DPqR" }] }),
  component: Notifs,
});

const ITEMS = [
  { t: "DROP LIVE", b: "Kairos · Freestyle 19 is live. 62 left.", w: "just now", urgent: true },
  { t: "TEASER",    b: "Aurora Wave teased Drop 04 — countdown started", w: "2h" },
  { t: "BATTLE",    b: "Your vote made AURORA take the lead", w: "5h" },
  { t: "REDEEM",    b: "Your backstage pass was redeemed at The Forum", w: "1d" },
  { t: "MARKETPLACE", b: "Floor on Sunset Sessions moved to $84", w: "2d" },
];

function Notifs() {
  return (
    <PhoneShell>
      <TopBar back="/home" title="ACTIVITY" />
      <div className="px-5 pt-4 flex flex-col gap-2 pb-8">
        {ITEMS.map((n,i)=>(
          <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${n.urgent?"bg-red-500 urgent":"bg-white/30"}`} />
              <span className="font-mono text-[10px] tracking-[0.3em]" style={{color: n.urgent?"#ff3d57":"var(--dpqr-accent)"}}>{n.t}</span>
              <span className="ml-auto font-mono text-[10px] text-white/40">{n.w}</span>
            </div>
            <div className="font-sans text-white text-[13px] mt-2">{n.b}</div>
          </div>
        ))}
      </div>
    </PhoneShell>
  );
}
