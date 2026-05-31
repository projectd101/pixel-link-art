import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell, TopBar, GlassPanel, NeuButton } from "@/narnia/ui";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Narnia Pass" }] }),
  component: Settings,
});

function Settings() {
  return (
    <PhoneShell>
      <TopBar title="SETTINGS" back="/me" />
      <div className="px-5 mt-4 flex flex-col gap-2 pb-8">
        {[
          ["Account","Update email, username, password"],
          ["Notifications","Drops, battles, bids, hunts"],
          ["Privacy","Public vault, showcase, analytics"],
          ["Physical card delivery","Shipping address & preferences"],
          ["Wallet","Apple Pay · Google Pay · Cards"],
          ["Apply to become a Creator","Invite-only access"],
          ["Invite a Creator","Send a Genesis invite"],
          ["Support","Get help, contact us"],
        ].map(([t,d]) => (
          <GlassPanel key={t} className="p-4">
            <div className="font-display text-white text-[16px]">{t}</div>
            <div className="font-sans text-white/55 text-[12px] mt-0.5">{d}</div>
          </GlassPanel>
        ))}
        <Link to={"/terms" as any} className="font-mono text-[11px] text-white/60 text-center mt-4">TERMS</Link>
        <Link to={"/privacy" as any} className="font-mono text-[11px] text-white/60 text-center">PRIVACY</Link>
        <NeuButton className="mt-4">Log out</NeuButton>
      </div>
    </PhoneShell>
  );
}
