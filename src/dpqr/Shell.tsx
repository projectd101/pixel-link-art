import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PhoneShell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="min-h-screen w-full dpqr-shell">
      <main className="mx-auto flex min-h-screen max-w-[440px] flex-col relative">
        {children}
        {!hideNav && <BottomNav />}
      </main>
    </div>
  );
}

export function TopBar({
  title,
  back,
  right,
  accent,
}: {
  title?: string;
  back?: boolean | string;
  right?: ReactNode;
  accent?: string;
}) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 backdrop-blur"
      style={{ background: "rgba(5,5,5,0.7)", borderBottom: "1px solid var(--dpqr-line)" }}
    >
      <div className="flex items-center gap-3 min-w-0">
        {back ? (
          <Link
            to={typeof back === "string" ? back : "/home"}
            className="h-9 w-9 grid place-items-center rounded-full border border-white/10 hover:bg-white/5"
            aria-label="Back"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </Link>
        ) : (
          <Link to="/home" className="font-display text-[20px]" style={{ color: accent ?? "var(--dpqr-text)" }}>
            DPqR<span style={{ color: "var(--dpqr-accent)" }}>.</span>
          </Link>
        )}
        {title && <div className="font-mono text-[10px] tracking-[0.3em] text-white/60 truncate">{title}</div>}
      </div>
      <div className="flex items-center gap-2">{right}</div>
    </header>
  );
}

function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const items = [
    { to: "/home", label: "Home", icon: <HomeIcon /> },
    { to: "/vault", label: "Vault", icon: <VaultIcon /> },
    { to: "/scan", label: "Scan", icon: <ScanIcon />, primary: true },
    { to: "/profile", label: "Profile", icon: <ProfileIcon /> },
  ];
  return (
    <nav
      className="sticky bottom-0 z-30 w-full"
      style={{ background: "linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0.95) 35%)", paddingBottom: "max(env(safe-area-inset-bottom), 12px)" }}
    >
      <ul className="mx-3 mb-2 grid grid-cols-4 rounded-2xl border border-white/10 bg-black/70 backdrop-blur px-2 py-2">
        {items.map((it) => {
          const active = path === it.to;
          return (
            <li key={it.to}>
              <Link
                to={it.to}
                className="flex flex-col items-center gap-1 py-1.5 transition-colors"
                style={{ color: active ? "var(--dpqr-accent)" : "rgba(245,245,245,0.55)" }}
              >
                {it.primary ? (
                  <span className="h-9 w-9 -mt-4 grid place-items-center rounded-full"
                        style={{ background: "var(--dpqr-accent)", color: "#0a0a0a", boxShadow: "0 8px 24px -4px var(--dpqr-accent)" }}>
                    {it.icon}
                  </span>
                ) : it.icon}
                <span className="font-mono text-[9px] tracking-[0.2em]">{it.label.toUpperCase()}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function HomeIcon() { return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z"/></svg>); }
function VaultIcon() { return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M7 6V4h10v2M3 11h18"/></svg>); }
function ScanIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7V5a1 1 0 0 1 1-1h2M20 7V5a1 1 0 0 0-1-1h-2M4 17v2a1 1 0 0 0 1 1h2M20 17v2a1 1 0 0 1-1 1h-2M3 12h18"/></svg>); }
function ProfileIcon() { return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>); }

export function SectionLabel({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between px-5">
      <div className="font-mono text-[10px] tracking-[0.3em] text-white/50">{children}</div>
      {action}
    </div>
  );
}

export function Divider() { return <div className="h-px w-full" style={{ background: "var(--dpqr-line)" }} />; }
