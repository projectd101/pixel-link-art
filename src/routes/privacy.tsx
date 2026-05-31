import { createFileRoute } from "@tanstack/react-router";
import { PhoneShell, TopBar, GlassPanel } from "@/narnia/ui";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy — Narnia Pass" }] }),
  component: Privacy,
});

function Privacy() {
  return (
    <PhoneShell>
      <TopBar title="PRIVACY" back />
      <div className="px-5 mt-4 pb-10">
        <div className="font-display text-white text-[28px]">Privacy Policy</div>
        <div className="font-mono text-[10px] text-white/40 mt-1">Updated · May 2026</div>
        <GlassPanel className="p-5 mt-5 font-sans text-white/75 text-[13px] leading-relaxed space-y-4">
          <S t="What we collect">Account info (email, username), payment metadata (via Stripe), shipping address for physical cards, and product analytics.</S>
          <S t="What we don't">No location tracking. No selling of data. No third-party ad networks.</S>
          <S t="Public vault">Your public showcase URL shows cards you own and rank. You can hide individual cards from the showcase at any time.</S>
          <S t="Creator access">Creators see aggregate fan stats only — never your personal info.</S>
          <S t="Data rights">You can export or delete your data from Settings · Account.</S>
          <S t="Cookies">We use functional cookies only — no tracking pixels.</S>
          <S t="Contact">privacy@narniapass.app</S>
        </GlassPanel>
      </div>
    </PhoneShell>
  );
}

function S({ t, children }: { t: string; children: React.ReactNode }) {
  return (<div><div className="font-display text-white text-[15px] mb-1">{t}</div><div>{children}</div></div>);
}
