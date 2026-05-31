import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldLogo, NeuButton, NeuInput, GlassPanel } from "@/narnia/ui";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Narnia Pass" }] }),
  component: Signup,
});

function Signup() {
  const nav = useNavigate();
  return (
    <div className="np-shell">
      <main className="mx-auto max-w-[440px] min-h-screen px-6 pt-14 pb-10 flex flex-col">
        <div className="flex items-center gap-3"><ShieldLogo size={28} glow /><div className="font-display text-[20px]">Narnia Pass</div></div>
        <div className="font-display text-[34px] leading-tight mt-8">Claim your<br/>identity.</div>

        <form className="mt-6 flex flex-col gap-3" onSubmit={(e)=>{e.preventDefault(); nav({to:"/onboarding" as any});}}>
          <NeuInput placeholder="Username" />
          <NeuInput type="email" placeholder="Email" />
          <NeuInput type="password" placeholder="Password (min 8)" />
          <GlassPanel className="p-3">
            <div className="font-mono text-[10px] text-white/50 tracking-[0.2em]">STARTER PASS</div>
            <div className="font-sans text-white text-[13px] mt-1">$2.99 — one-time, unlocks everything.</div>
          </GlassPanel>
          <NeuButton type="submit" style={{ background: "linear-gradient(160deg,#8B0000,#CC0000)" }}>Create account</NeuButton>
        </form>

        <div className="font-mono text-[10px] text-white/40 mt-4 leading-relaxed">
          By continuing you agree to the <Link to={"/terms" as any} className="text-white/70">Terms</Link> and <Link to={"/privacy" as any} className="text-white/70">Privacy Policy</Link>.
        </div>

        <div className="mt-auto text-center">
          <Link to="/login" className="font-mono text-[11px] text-white/70">Have an account? <span className="text-red-400">SIGN IN ›</span></Link>
        </div>
      </main>
    </div>
  );
}
