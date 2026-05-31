import { Link, useRouterState } from "@tanstack/react-router";
import { useRef, useState, type ReactNode, type CSSProperties } from "react";
import type { NarniaCard } from "./data";
import { rarityClass, edgeClass, rarityDot } from "./data";

/* ─── Brand mark ─────────────────────────────────────────── */
export function ShieldLogo({ size = 28, glow = false }: { size?: number; glow?: boolean }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 64 70" fill="none"
         style={{ filter: glow ? "drop-shadow(0 0 10px rgba(255,34,34,0.6))" : undefined }}>
      <defs>
        <linearGradient id="np-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CC0000" />
          <stop offset="100%" stopColor="#8B0000" />
        </linearGradient>
        <linearGradient id="np-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#888" />
        </linearGradient>
      </defs>
      {/* Shield body */}
      <path d="M32 2 L60 12 V36 C60 52 48 62 32 68 C16 62 4 52 4 36 V12 Z" fill="url(#np-shield)" />
      {/* Angular cut of light */}
      <path d="M14 14 L48 22 L42 30 L8 22 Z" fill="rgba(255,255,255,0.18)" />
      {/* Chrome grillz */}
      <g transform="translate(16,46)">
        {[0,7,14,21,28].map(x => (
          <rect key={x} x={x} y="0" width="6" height="10" rx="1.5" fill="url(#np-chrome)" />
        ))}
        <path d="M2 10 L34 10 L30 16 L6 16 Z" fill="url(#np-chrome)" opacity="0.85" />
      </g>
    </svg>
  );
}

/* ─── Phone shell ────────────────────────────────────────── */
export function PhoneShell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="np-shell w-full">
      <main className="mx-auto flex min-h-screen max-w-[440px] flex-col relative pb-28">
        {children}
        {!hideNav && <BottomNav />}
      </main>
    </div>
  );
}

export function TopBar({ title, back, right }: { title?: string; back?: boolean | string; right?: ReactNode }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 glass-strong">
      <div className="flex items-center gap-3 min-w-0">
        {back ? (
          <Link to={typeof back === "string" ? back : "/pass"} className="h-10 w-10 grid place-items-center rounded-full neu-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </Link>
        ) : (
          <Link to="/pass" className="flex items-center gap-2">
            <ShieldLogo size={22} />
            <span className="font-display text-[18px] tracking-tight">Narnia Pass</span>
          </Link>
        )}
        {title && <div className="font-mono text-[10px] tracking-[0.3em] text-white/60 truncate ml-2">{title}</div>}
      </div>
      <div className="flex items-center gap-2">{right}</div>
    </header>
  );
}

/* ─── Bottom nav ─────────────────────────────────────────── */
function BottomNav() {
  const path = useRouterState({ select: s => s.location.pathname });
  const items: { to: string; label: string; icon: ReactNode; center?: boolean }[] = [
    { to: "/pass",  label: "Pass",  icon: <IconPass /> },
    { to: "/vault", label: "Vault", icon: <IconVault /> },
    { to: "/drop",  label: "Drop",  icon: <IconBolt />, center: true },
    { to: "/world", label: "World", icon: <IconWorld /> },
    { to: "/me",    label: "Me",    icon: <IconMe /> },
  ];
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 mx-auto max-w-[440px] px-4"
         style={{ paddingBottom: "max(env(safe-area-inset-bottom), 16px)" }}>
      <ul className="relative h-[72px] rounded-[36px] neu flex items-center justify-around px-3">
        {items.map(it => {
          const active = path === it.to || (it.to === "/pass" && path === "/");
          if (it.center) {
            return (
              <li key={it.to} className="-mt-10">
                <Link to={it.to as any} aria-label={it.label}
                      className="h-14 w-14 rounded-full grid place-items-center neu np-glow"
                      style={{ background: "linear-gradient(160deg,#8B0000,#CC0000)" }}>
                  <ShieldLogo size={22} />
                </Link>
              </li>
            );
          }
          return (
            <li key={it.to} className="relative">
              {active && <span className="absolute inset-0 -m-1 rounded-2xl glass" />}
              <Link to={it.to as any} className="relative flex flex-col items-center gap-1 px-3 py-1"
                    style={{ color: active ? "#F0F0F0" : "#666" }}>
                {it.icon}
                {active && <span className="font-mono text-[8px] tracking-[0.2em]">{it.label.toUpperCase()}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ─── Neumorphic primitives ──────────────────────────────── */
export function NeuButton({ children, className = "", style, onClick, type = "button", href, to }:
  { children: ReactNode; className?: string; style?: CSSProperties; onClick?: () => void; type?: "button" | "submit"; href?: string; to?: string }) {
  const cls = `neu rounded-[14px] px-5 h-12 font-sans font-semibold text-[14px] text-white grid place-items-center active:translate-y-[1px] ${className}`;
  if (to) return <Link to={to as any} className={cls} style={style}>{children}</Link>;
  if (href) return <a href={href} className={cls} style={style}>{children}</a>;
  return <button type={type} onClick={onClick} className={cls} style={style}>{children}</button>;
}

export function NeuPill({ active, children, onClick }: { active?: boolean; children: ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick}
            className={`h-9 px-4 rounded-full font-mono text-[10px] tracking-[0.2em] ${active ? "neu-inset text-white" : "neu-sm text-white/60"}`}>
      {children}
    </button>
  );
}

export function NeuInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props}
      className={`neu-inset rounded-[14px] h-12 w-full px-4 text-[14px] text-white placeholder:text-white/30 outline-none ${props.className ?? ""}`} />
  );
}

/* ─── Glass primitives ───────────────────────────────────── */
export function GlassPanel({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return <div className={`glass rounded-2xl ${className}`} style={style}>{children}</div>;
}

export function SectionLabel({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between px-5 mt-6 mb-3">
      <div className="font-display text-white text-[18px]">{children}</div>
      {action}
    </div>
  );
}

/* ─── Clay card (the hero object) ────────────────────────── */
export function ClayCard({
  card, size = "md", interactive = true, autoRotate = false, onClick,
}: {
  card: NarniaCard;
  size?: "sm" | "md" | "lg" | "xl";
  interactive?: boolean;
  autoRotate?: boolean;
  onClick?: () => void;
}) {
  const dims = {
    sm: { w: 140, h: 88 },
    md: { w: 240, h: 150 },
    lg: { w: 300, h: 188 },
    xl: { w: 340, h: 212 },
  }[size];

  const [ry, setRy] = useState(0);
  const [rx, setRx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const drag = useRef<{ x: number; y: number; ry: number; rx: number; moved: boolean } | null>(null);

  if (!interactive && !autoRotate) {
    return <ClayFront card={card} w={dims.w} h={dims.h} onClick={onClick} />;
  }

  const totalY = ry + (flipped ? 180 : 0);

  return (
    <div className="scene-3d select-none" style={{ width: dims.w, height: dims.h, touchAction: "none" }}>
      <div className="card-3d relative" style={{
        width: dims.w, height: dims.h,
        transform: `rotateX(${rx}deg) rotateY(${totalY}deg)`,
        cursor: interactive ? "grab" : "default",
        animation: autoRotate ? "np-autorot 22s linear infinite" : undefined,
      }}
        onPointerDown={interactive ? (e) => { (e.target as HTMLElement).setPointerCapture(e.pointerId); drag.current = { x: e.clientX, y: e.clientY, ry, rx, moved: false }; } : undefined}
        onPointerMove={interactive ? (e) => {
          if (!drag.current) return;
          const dx = e.clientX - drag.current.x;
          const dy = e.clientY - drag.current.y;
          if (Math.abs(dx) + Math.abs(dy) > 4) drag.current.moved = true;
          setRy(drag.current.ry + dx * 0.6);
          setRx(Math.max(-20, Math.min(20, drag.current.rx - dy * 0.4)));
        } : undefined}
        onPointerUp={interactive ? () => { const wasDrag = drag.current?.moved; drag.current = null; if (!wasDrag) setFlipped(f => !f); setRx(0); } : undefined}
      >
        <div className="card-face">
          <ClayFront card={card} w={dims.w} h={dims.h} />
        </div>
        <div className="card-face card-back">
          <ClayBack card={card} w={dims.w} h={dims.h} />
        </div>
      </div>
      <style>{`@keyframes np-autorot { 0% { transform: rotateY(0deg);} 100% { transform: rotateY(360deg);} }`}</style>
    </div>
  );
}

function ClayFront({ card, w, h, onClick }: { card: NarniaCard; w: number; h: number; onClick?: () => void }) {
  const isMini = w < 200;
  return (
    <div onClick={onClick}
         className={`clay ${rarityClass(card.rarity)} ${edgeClass(card.rarity)} relative`}
         style={{ width: w, height: h }}>
      {/* Holo sweep for legendary/mythic */}
      {(card.rarity === "Legendary" || card.rarity === "Mythic") && (
        <div className="absolute inset-0 holo-sweep rounded-[30px]" />
      )}

      {/* Header */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full glass">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: rarityDot(card.rarity) }} />
          <span className="font-mono text-[8px] tracking-[0.2em] text-white/90">{card.rarity.toUpperCase()}</span>
        </div>
        <div className="font-mono text-[8px] tracking-[0.2em] text-white/60">NFC ●</div>
      </div>

      {/* Artist image area (1:1 inset) */}
      {!isMini && (
        <div className="absolute"
             style={{ top: h * 0.22, left: 14, width: h * 0.5, height: h * 0.5,
                      borderRadius: 16, background: card.imageGradient,
                      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 -8px 16px rgba(0,0,0,0.4)" }}>
            <div className="absolute inset-0 grid place-items-center font-display text-white/85"
                 style={{ fontSize: h * 0.28 }}>{card.artistInitial}</div>
        </div>
      )}
      {isMini && (
        <div className="absolute inset-3 rounded-2xl grid place-items-center font-display text-white/85"
             style={{ background: card.imageGradient, fontSize: h * 0.35 }}>{card.artistInitial}</div>
      )}

      {/* Right column text */}
      {!isMini && (
        <div className="absolute right-3" style={{ top: h * 0.24, left: 14 + h * 0.5 + 10 }}>
          <div className="font-mono text-[8px] tracking-[0.25em] text-white/50">ARTIST</div>
          <div className="font-display text-white text-[16px] leading-tight mt-0.5">{card.artist}</div>
          <div className="font-mono text-[9px] tracking-[0.2em] text-white/55 mt-2">{card.series}</div>
          <div className="font-mono text-[8px] text-white/40 mt-3">{card.serial}</div>
        </div>
      )}

      {/* Footer: chip + QR + signature stamp */}
      {!isMini && (
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="h-5 w-8 rounded-[3px]" style={{ background: "linear-gradient(135deg,#E8E8E8,#888 70%,#C0C0C0)", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.4)" }} />
          <div className="h-7 w-7 rounded-[4px] grid grid-cols-3 gap-px overflow-hidden" style={{ background: "#000" }}>
            {Array.from({length:9}).map((_,i) => <span key={i} style={{ background: i % 2 === 0 ? "#fff" : "#000" }} />)}
          </div>
        </div>
      )}

      {/* Brand tag */}
      {card.brand && !isMini && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 glass px-2 py-0.5 rounded-full">
          <span className="font-mono text-[8px] tracking-[0.2em] text-white/80">× {card.brand.toUpperCase()}</span>
        </div>
      )}
    </div>
  );
}

function ClayBack({ card, w, h }: { card: NarniaCard; w: number; h: number }) {
  return (
    <div className={`clay ${rarityClass(card.rarity)} ${edgeClass(card.rarity)} relative`} style={{ width: w, height: h }}>
      <div className="absolute inset-0 grid place-items-center">
        <ShieldLogo size={Math.min(w, h) * 0.32} glow />
      </div>
      {/* Microtext border */}
      <div className="absolute inset-2 rounded-[24px] pointer-events-none"
           style={{ border: "1px dashed rgba(255,255,255,0.07)" }} />
      {/* Holo square */}
      <div className="absolute top-3 right-3 h-7 w-7 rounded-md holo-sweep" style={{ background: "rgba(255,255,255,0.06)" }} />
      {/* NFC ring */}
      <div className="absolute bottom-3 left-3 h-8 w-8 rounded-full border border-white/15 grid place-items-center">
        <div className="h-3 w-3 rounded-full border border-white/40" />
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[8px] tracking-[0.2em] text-white/60">TAP TO VERIFY</div>
      <div className="absolute top-3 left-3 font-mono text-[8px] tracking-[0.2em] text-white/50">{card.serial}</div>
    </div>
  );
}

/* ─── Tiny icons ─────────────────────────────────────────── */
function IconPass()  { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 2 L20 6 V14 C20 18 16 22 12 22 C8 22 4 18 4 14 V6 Z"/></svg>); }
function IconVault() { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M12 7v2M12 15v2M7 12h2M15 12h2"/></svg>); }
function IconBolt()  { return (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 L4 14 H11 L10 22 L20 9 H13 Z"/></svg>); }
function IconWorld() { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>); }
function IconMe()    { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>); }

/* ─── Reusable bits ──────────────────────────────────────── */
export function CountdownBlock({ target }: { target: number }) {
  const { h, m, s } = useCountdown(target);
  const urgent = (target - Date.now()) < 60*60*1000;
  return (
    <div className="flex gap-2">
      <Tile label="HRS" value={String(h).padStart(2,"0")} urgent={urgent} />
      <Tile label="MIN" value={String(m).padStart(2,"0")} urgent={urgent} />
      <Tile label="SEC" value={String(s).padStart(2,"0")} urgent={urgent} />
    </div>
  );
}
function Tile({ label, value, urgent }: { label: string; value: string; urgent: boolean }) {
  return (
    <div className="neu-inset rounded-xl px-3 py-2 min-w-[58px]">
      <div className="font-display text-[22px] leading-none" style={{ color: urgent ? "#FF2222" : "#F0F0F0" }}>{value}</div>
      <div className="font-mono text-[8px] tracking-[0.25em] text-white/40 mt-1">{label}</div>
    </div>
  );
}

import { useEffect } from "react";
export function useCountdown(target: number) {
  const [, force] = useState(0);
  useEffect(() => { const i = setInterval(() => force(x => x + 1), 1000); return () => clearInterval(i); }, []);
  const diff = Math.max(0, target - Date.now());
  return {
    h: Math.floor(diff / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1000),
    total: diff,
  };
}

export function LivePulse() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-red-500 np-pulse" />
      <span className="font-mono text-[10px] tracking-[0.25em] text-red-400">LIVE</span>
    </span>
  );
}