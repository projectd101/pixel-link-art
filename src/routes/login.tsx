import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <div className="min-h-screen w-full dpqr-shell">
      <main className="mx-auto max-w-[440px] px-6 pt-10 pb-10">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-white/40">← BACK</Link>
        <div className="mt-10">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">SIGN IN</div>
          <h1 className="font-display text-white text-[40px] leading-tight mt-2">Welcome back.</h1>
          <p className="font-sans text-white/55 text-[13px] mt-2">Your vault is waiting.</p>
        </div>

        <form className="mt-8 flex flex-col gap-4" onSubmit={(e)=>{e.preventDefault(); window.location.href="/home";}}>
          <Field label="Email or username" type="text" placeholder="you@dpqr.app" />
          <Field label="Password" type="password" placeholder="••••••••" />
          <div className="flex items-center justify-between text-[12px]">
            <label className="flex items-center gap-2 text-white/60"><input type="checkbox" className="accent-white" />Remember me</label>
            <Link to="/forgot-password" className="text-white/70 underline underline-offset-4">Forgot password?</Link>
          </div>
          <button className="mt-4 h-12 rounded-full font-sans font-semibold"
                  style={{ background: "var(--dpqr-accent)", color: "#0a0a0a" }}>Sign in</button>
        </form>

        <div className="my-8 flex items-center gap-3 text-white/30 text-[10px] tracking-[0.3em] font-mono">
          <div className="h-px flex-1 bg-white/10"/> OR <div className="h-px flex-1 bg-white/10"/>
        </div>

        <div className="flex flex-col gap-3">
          <SocialButton label="Continue with Apple" />
          <SocialButton label="Continue with Google" />
        </div>

        <p className="mt-10 text-center text-white/50 text-[13px]">
          New to DPqR? <Link to="/signup" className="text-white underline underline-offset-4">Create account</Link>
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

function SocialButton({ label }: { label: string }) {
  return <button className="h-12 rounded-full border border-white/15 text-white font-sans text-[14px]">{label}</button>;
}
