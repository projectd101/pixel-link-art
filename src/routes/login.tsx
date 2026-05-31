import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldLogo, NeuButton, NeuInput } from "@/narnia/ui";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — Narnia Pass" }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  return (
    <div className="np-shell">
      <main className="mx-auto max-w-[440px] min-h-screen px-6 pt-14 pb-10 flex flex-col">
        <div className="flex items-center gap-3"><ShieldLogo size={28} glow /><div className="font-display text-[20px]">Narnia Pass</div></div>
        <div className="font-display text-[34px] leading-tight mt-10">Welcome<br/>back.</div>
        <div className="font-sans text-white/55 text-[13px] mt-2">Sign in to your vault.</div>

        <form className="mt-8 flex flex-col gap-3" onSubmit={(e)=>{e.preventDefault(); nav({to:"/pass" as any});}}>
          <NeuInput type="email" placeholder="Email" />
          <NeuInput type="password" placeholder="Password" />
          <Link to={"/forgot-password" as any} className="font-mono text-[10px] text-white/50 self-end">FORGOT PASSWORD ›</Link>
          <NeuButton type="submit" style={{ background: "linear-gradient(160deg,#8B0000,#CC0000)" }}>Sign in</NeuButton>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10" /><span className="font-mono text-[10px] text-white/40">OR</span><div className="flex-1 h-px bg-white/10" />
        </div>
        <div className="flex flex-col gap-2">
          <NeuButton>Continue with Apple</NeuButton>
          <NeuButton>Continue with Google</NeuButton>
        </div>

        <div className="mt-auto text-center">
          <Link to="/signup" className="font-mono text-[11px] text-white/70">No account? <span className="text-red-400">CREATE ONE ›</span></Link>
        </div>
      </main>
    </div>
  );
}
