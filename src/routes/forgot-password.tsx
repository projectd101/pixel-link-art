import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldLogo, NeuButton, NeuInput } from "@/narnia/ui";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — Narnia Pass" }] }),
  component: Forgot,
});

function Forgot() {
  return (
    <div className="np-shell">
      <main className="mx-auto max-w-[440px] min-h-screen px-6 pt-14 pb-10 flex flex-col">
        <div className="flex items-center gap-3"><ShieldLogo size={28} glow /><div className="font-display text-[20px]">Narnia Pass</div></div>
        <div className="font-display text-[32px] leading-tight mt-10">Reset access.</div>
        <div className="font-sans text-white/60 text-[13px] mt-2">We'll send you a magic link.</div>
        <form className="mt-6 flex flex-col gap-3">
          <NeuInput type="email" placeholder="Email" />
          <NeuButton type="submit" style={{ background: "linear-gradient(160deg,#8B0000,#CC0000)" }}>Send link</NeuButton>
        </form>
        <div className="mt-auto text-center">
          <Link to="/login" className="font-mono text-[11px] text-white/70">‹ BACK TO SIGN IN</Link>
        </div>
      </main>
    </div>
  );
}
