import { createFileRoute } from "@tanstack/react-router";
import { PhoneShell, TopBar, GlassPanel } from "@/narnia/ui";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Narnia Pass" }] }),
  component: Notifs,
});

function Notifs() {
  const items = [
    { tag: "DROP LIVE", text: "Travis · Astro · Drop 04 is live now.", ago: "2m" },
    { tag: "BATTLE", text: "Your Speed card won the battle vs Travis.", ago: "1h" },
    { tag: "OFFER", text: "Someone bid $1,180 on your Kairos #008.", ago: "3h" },
    { tag: "HUNT", text: "A mythic is hidden somewhere. Day 3 unfound.", ago: "yesterday" },
    { tag: "TICKET", text: "Your Blvck Nova GA ticket is now in your vault.", ago: "2d" },
  ];
  return (
    <PhoneShell>
      <TopBar title="NOTIFICATIONS" back />
      <div className="px-5 mt-4 flex flex-col gap-2 pb-8">
        {items.map((n,i)=>(
          <GlassPanel key={i} className="p-4">
            <div className="font-mono text-[10px] tracking-[0.2em] text-red-400">{n.tag}</div>
            <div className="font-sans text-white text-[13px] mt-1">{n.text}</div>
            <div className="font-mono text-[10px] text-white/40 mt-2">{n.ago} ago</div>
          </GlassPanel>
        ))}
      </div>
    </PhoneShell>
  );
}
