import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  const [agree, setAgree] = useState(false);
  return (
    <div className="min-h-screen w-full dpqr-shell">
      <main className="mx-auto max-w-[440px] px-6 pt-10 pb-10">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-white/40">← BACK</Link>
        <div className="mt-10">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">CREATE ACCOUNT</div>
          <h1 className="font-display text-white text-[40px] leading-tight mt-2">Claim your<br/>fan identity.</h1>
        </div>

        <form className="mt-8 flex flex-col gap-4" onSubmit={(e)=>{e.preventDefault(); window.location.href="/create-profile";}}>
          <Field label="Email" type="email" placeholder="you@dpqr.app" required />
          <Field label="Username" type="text" placeholder="@yourname" required />
          <Field label="Password" type="password" placeholder="At least 8 characters" required minLength={8} />

          <label className="flex items-start gap-3 mt-2 text-white/60 text-[12px] leading-relaxed">
            <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} className="mt-0.5 accent-white" />
            <span>I agree to the <Link to="/terms" className="text-white underline underline-offset-4">Terms</Link> and <Link to="/privacy" className="text-white underline underline-offset-4">Privacy Policy</Link>.</span>
          </label>

          <button disabled={!agree} className="mt-4 h-12 rounded-full font-sans font-semibold disabled:opacity-40"
                  style={{ background: "var(--dpqr-accent)", color: "#0a0a0a" }}>Create account</button>
        </form>

        <p className="mt-10 text-center text-white/50 text-[13px]">
          Already a collector? <Link to="/login" className="text-white underline underline-offset-4">Sign in</Link>
        </p>
      </main>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10px] tracking-[0.25em] text-white/40">{label.toUpperCase()}</span>
      <input {...props} className="h-12 rounded-xl bg-white/[0.04] border border-white/10 px-4 text-white placeholder:text-white/30 focus:border-white/40 outline-none" />
    </label>
  );
}
