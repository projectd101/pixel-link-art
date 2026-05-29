import { useRef, useState, useEffect } from "react";
import type { DpqrCard } from "./data";

interface Props {
  card: DpqrCard;
  width?: number;     // px
  height?: number;    // px
  interactive?: boolean;
  autoRotate?: boolean;
}

/**
 * Premium 3D rotatable collectible card.
 * - Drag / touch to rotate 360° on Y
 * - Click (no drag) to flip to back face
 * - Holographic shimmer reacts to tilt
 */
export function Card3D({ card, width = 280, height = 400, interactive = true, autoRotate = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ry, setRy] = useState(0);
  const [rx, setRx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const drag = useRef<{ x: number; y: number; ry: number; rx: number; moved: boolean } | null>(null);

  useEffect(() => {
    if (!autoRotate) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last; last = t;
      setRy((r) => r + dt * 0.04);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoRotate]);

  const start = (x: number, y: number) => {
    drag.current = { x, y, ry, rx, moved: false };
  };
  const move = (x: number, y: number) => {
    if (!drag.current) return;
    const dx = x - drag.current.x;
    const dy = y - drag.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) drag.current.moved = true;
    setRy(drag.current.ry + dx * 0.6);
    setRx(Math.max(-25, Math.min(25, drag.current.rx - dy * 0.4)));
  };
  const end = () => {
    const wasDrag = drag.current?.moved;
    drag.current = null;
    if (!wasDrag && interactive) setFlipped((f) => !f);
    // ease rx back to 0
    setRx(0);
  };

  const totalY = ry + (flipped ? 180 : 0);
  const shimmerX = ((ry % 360) + 360) % 360;

  return (
    <div
      className="scene-3d select-none"
      style={{ width, height, touchAction: "none" }}
    >
      <div
        ref={ref}
        className="card-3d relative rounded-[20px]"
        style={{
          width, height,
          transform: `rotateX(${rx}deg) rotateY(${totalY}deg)`,
          cursor: interactive ? "grab" : "default",
        }}
        onPointerDown={interactive ? (e) => { (e.target as HTMLElement).setPointerCapture(e.pointerId); start(e.clientX, e.clientY); } : undefined}
        onPointerMove={interactive ? (e) => move(e.clientX, e.clientY) : undefined}
        onPointerUp={interactive ? end : undefined}
        onPointerCancel={interactive ? end : undefined}
      >
        {/* FRONT */}
        <div
          className="card-face grain vignette"
          style={{
            background: `linear-gradient(155deg, ${card.accent} 0%, ${card.accent2} 78%)`,
            boxShadow: `0 30px 60px -20px ${card.accent}55, 0 0 0 1px rgba(255,255,255,0.06) inset`,
            borderRadius: 20,
          }}
        >
          {/* Holo sweep */}
          {card.holo && (
            <div
              className="absolute inset-0 holo pointer-events-none"
              style={{ backgroundPositionX: `${shimmerX}%`, borderRadius: 20 }}
            />
          )}

          {/* Header */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
            <div>
              <div className="font-mono text-[9px] tracking-[0.25em] text-white/70">DPqR · {card.edition}</div>
              <div className="font-display text-white text-[22px] leading-[1.05] mt-2 max-w-[180px]">{card.title}</div>
            </div>
            <RarityBadge rarity={card.rarity} />
          </div>

          {/* Embossed artist mark */}
          <div className="absolute inset-0 grid place-items-center">
            <div
              className="font-display text-white/15 text-[64px] leading-none tracking-tight text-center px-4"
              style={{ textShadow: "0 2px 0 rgba(0,0,0,0.4)" }}
            >
              {card.artist.split(" ")[0]}
            </div>
          </div>

          {/* Chip */}
          <div className="absolute bottom-20 left-4 h-9 w-12 rounded-md"
               style={{ background: "linear-gradient(135deg,#e9d294,#7a5a1f 60%,#c8a14a)", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.4)" }} />

          {/* Footer */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <div className="font-mono text-[9px] tracking-[0.2em] text-white/60">ARTIST</div>
              <div className="font-sans text-white text-[13px] font-semibold tracking-wide">{card.artist}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[9px] tracking-[0.2em] text-white/60">SERIAL</div>
              <div className="font-mono text-white text-[12px]">{card.serial}</div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="card-face card-back grain"
          style={{
            background: `linear-gradient(200deg, ${card.accent2} 0%, #050505 70%)`,
            boxShadow: `0 30px 60px -20px ${card.accent}55, 0 0 0 1px rgba(255,255,255,0.06) inset`,
            borderRadius: 20,
          }}
        >
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="font-mono text-[9px] tracking-[0.25em] text-white/70">EMBEDDED MOMENT</div>
            <div className="h-2 w-2 rounded-full bg-red-500 urgent" />
          </div>

          <div className="absolute inset-0 grid place-items-center px-6">
            <div className="text-center">
              <div className="mx-auto h-14 w-14 rounded-full border border-white/30 grid place-items-center mb-4">
                <div className="h-0 w-0 border-y-[8px] border-y-transparent border-l-[12px] border-l-white ml-1" />
              </div>
              <div className="font-display text-white text-[20px] leading-tight">{card.videoLabel}</div>
              <div className="font-mono text-[10px] text-white/50 mt-2 tracking-widest">HOLD TO PLAY</div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="font-mono text-[9px] text-white/50 tracking-[0.2em] mb-1">PERK</div>
            <div className="font-sans text-white text-[12px]">{card.perk}</div>
            <div className="mt-3 flex items-center justify-between">
              <div className="font-mono text-[9px] text-white/40 tracking-[0.2em]">NFC · #{card.id.toUpperCase()}</div>
              <div className="font-mono text-[9px] text-white/40">DPqR // VERIFIED</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RarityBadge({ rarity }: { rarity: DpqrCard["rarity"] }) {
  const map: Record<string, string> = {
    Common: "#9aa0a6",
    Rare: "#2da4ff",
    Epic: "#a070ff",
    Legendary: "#f5c451",
    Mythic: "#ff3d57",
  };
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm border border-white/10">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: map[rarity] }} />
      <span className="font-mono text-[9px] tracking-[0.2em] text-white/90">{rarity.toUpperCase()}</span>
    </div>
  );
}
