import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/forgot-password")({ component: Forgot });

function Forgot() {
  return (
    <div className="min-h-screen w-full dpqr-shell">
      <main className="mx-auto max-w-[440px] px-6 pt-10">
        <Link to="/login" className="font-mono text-[10px] tracking-[0.3em] text-white/40">← BACK</Link>
        <h1 className="font-display text-white text-[36px] leading-tight mt-10">Reset password</h1>
        <p className="font-sans text-white/55 text-[13px] mt-2">We'll send you a recovery link.</p>
        <form className="mt-8 flex flex-col gap-4" onSubmit={(e)=>{e.preventDefault(); alert("Recovery link sent");}}>
          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/40">EMAIL</span>
            <input type="email" required className="h-12 rounded-xl bg-white/[0.04] border border-white/10 px-4 text-white placeholder:text-white/30 outline-none focus:border-white/40" />
          </label>
          <button className="mt-2 h-12 rounded-full font-sans font-semibold" style={{ background: "var(--dpqr-accent)", color: "#0a0a0a" }}>Send link</button>
        </form>
      </main>
    </div>
  );
}
