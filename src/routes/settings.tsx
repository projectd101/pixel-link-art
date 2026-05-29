import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell, TopBar } from "@/dpqr/Shell";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — DPqR" }] }),
  component: Settings,
});

function Settings() {
  return (
    <PhoneShell>
      <TopBar back="/profile" title="SETTINGS" />
      <div className="px-5 pt-5 pb-8">
        <Group title="ACCOUNT">
          <Row label="Username" value="@tasha.r" />
          <Row label="Email" value="tasha@dpqr.app" />
          <Row label="Phone" value="+1 ··· 4821" />
          <Row label="Change password" linkTo="/forgot-password" />
        </Group>

        <Group title="PREFERENCES">
          <Toggle label="Drop reminders" on />
          <Toggle label="Battle results" on />
          <Toggle label="Marketing emails" />
          <Toggle label="Haptic feedback" on />
        </Group>

        <Group title="WALLET">
          <Row label="Payment method" value="Apple Pay" />
          <Row label="Trade currency" value="USD" />
          <Row label="Shipping address" value="LA, CA" />
        </Group>

        <Group title="LEGAL">
          <Row label="Terms of service" linkTo="/terms" />
          <Row label="Privacy policy" linkTo="/privacy" />
          <Row label="Community guidelines" linkTo="/terms" />
          <Row label="Help center" />
        </Group>

        <Group title="DANGER">
          <Link to="/login" className="block px-4 py-3 font-sans text-[14px] text-white/80">Sign out</Link>
          <button className="block w-full text-left px-4 py-3 font-sans text-[14px]" style={{color:"#ef4444"}}>Delete account</button>
        </Group>

        <div className="text-center font-mono text-[9px] tracking-[0.3em] text-white/30 mt-6">DPqR · v1.0.0</div>
      </div>
    </PhoneShell>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 first:mt-0">
      <div className="font-mono text-[10px] tracking-[0.3em] text-white/50 mb-2">{title}</div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] divide-y divide-white/5">{children}</div>
    </div>
  );
}
function Row({ label, value, linkTo }: { label: string; value?: string; linkTo?: string }) {
  const inner = (
    <div className="px-4 py-3 flex items-center justify-between">
      <span className="font-sans text-white text-[14px]">{label}</span>
      <span className="font-mono text-[11px] text-white/50">{value ?? "›"}</span>
    </div>
  );
  return linkTo ? <Link to={linkTo}>{inner}</Link> : <div>{inner}</div>;
}
function Toggle({ label, on }: { label: string; on?: boolean }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between">
      <span className="font-sans text-white text-[14px]">{label}</span>
      <span className="h-6 w-10 rounded-full p-0.5 flex items-center" style={{ background: on ? "var(--dpqr-accent)" : "rgba(255,255,255,0.15)" }}>
        <span className="h-5 w-5 rounded-full bg-white transition-transform" style={{ transform: on?"translateX(16px)":"translateX(0)" }} />
      </span>
    </div>
  );
}
