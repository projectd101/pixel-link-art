import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import iconHome from "@/assets/icon-home.png";
import iconBrowse from "@/assets/icon-browse.png";
import iconSaved from "@/assets/icon-saved.png";
import iconProfile from "@/assets/icon-profile.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DPqR — aesthetic QR, gift & link cards" },
      { name: "description", content: "DPqR is a universal app for sharing links as aesthetic QR cards, gift cards, fan cards and link bundles." },
      { property: "og:title", content: "DPqR" },
      { property: "og:description", content: "Aesthetic QR cards, gift cards, fan cards and link bundles — all in one pixel-perfect app." },
    ],
  }),
  component: Index,
});

/* ---------- color palettes for aesthetic cards ---------- */

const QR_CARDS = [
  { name: "Cobalt",  top: "#1f7ad6", bot: "#0b3a78" },
  { name: "Ember",   top: "#ef3a2a", bot: "#b8210f" },
  { name: "Bone",    top: "#f6f4ef", bot: "#cfcbc1" },
  { name: "Clover",  top: "#22a05a", bot: "#0c5c30" },
  { name: "Tangerine", top: "#ff8a1f", bot: "#c2530a" },
  { name: "Bloom",   top: "#ee6aa1", bot: "#28a36f" },
  { name: "Violet",  top: "#7a4cff", bot: "#1a0b4a" },
  { name: "Sun",     top: "#ffd23f", bot: "#b88500" },
];

const GIFT_CARDS = [
  { name: "Mint",    bg: "linear-gradient(135deg,#1fc46a,#0a6b34)" },
  { name: "Indigo",  bg: "linear-gradient(135deg,#4031b8,#1a0f5e)" },
  { name: "Lagoon",  bg: "linear-gradient(135deg,#2cd4d4,#0a6b6b)" },
  { name: "Steel",   bg: "linear-gradient(135deg,#a8adb4,#3b3e44)" },
  { name: "Honey",   bg: "linear-gradient(135deg,#ffd33a,#a76b00)" },
  { name: "Rose",    bg: "linear-gradient(135deg,#ff7ec2,#6b1f4f)" },
];

const FAN_CARDS = [
  { name: "Standard Cards", bg: "#f6f4ef", fg: "#0a0a0a" },
  { name: "Members Card Bundle", bg: "#c79bff", fg: "#1a0c33" },
  { name: "Premium Card Bundle", bg: "#f6f4ef", fg: "#0a0a0a" },
  { name: "Loyalty Gift Card", bg: "#f6f4ef", fg: "#0a0a0a" },
  { name: "Founders Pass", bg: "#e7c98a", fg: "#2a1a00" },
];

const MOMENT_CARDS = [
  { name: "Birthday", bg: "linear-gradient(135deg,#ff6aa9,#b8166f)" },
  { name: "Wedding",  bg: "linear-gradient(135deg,#f6f4ef,#c9bfa6)" },
  { name: "Travel",   bg: "linear-gradient(135deg,#2cd4d4,#1a4d8a)" },
  { name: "Concert",  bg: "linear-gradient(135deg,#7a4cff,#0d0633)" },
  { name: "Graduation", bg: "linear-gradient(135deg,#ffd33a,#a76b00)" },
];

/* ---------- small primitives ---------- */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-5">
      <h2 className="font-display text-white text-[26px] leading-none">
        {children}
        <span className="text-white/80">&gt;</span>
      </h2>
      <button
        aria-label="Autoplay"
        className="grid place-items-center h-7 w-9 rounded-md border-2 border-[#39ff7a] text-[#39ff7a] hover:bg-[#39ff7a]/10 transition-colors"
      >
        <span className="block w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-[#39ff7a]" />
      </button>
    </div>
  );
}

function AestheticCard({
  top,
  bot,
  className = "",
}: {
  top: string;
  bot: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[14px] grain spray-bottom ${className}`}
      style={{
        background: `linear-gradient(180deg, ${top} 0%, ${top} 55%, ${bot} 100%)`,
        boxShadow: "0 6px 20px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      {/* spray splash bottom */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-1/2 w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`g-${top}-${bot}`} cx="50%" cy="100%" r="80%">
            <stop offset="0%" stopColor={bot} stopOpacity="1" />
            <stop offset="60%" stopColor={bot} stopOpacity="0.45" />
            <stop offset="100%" stopColor={bot} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#g-${top}-${bot})`} />
      </svg>
    </div>
  );
}

function GiftCard({ bg }: { bg: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-[14px] grain"
      style={{
        background: bg,
        boxShadow: "0 6px 20px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.08)",
      }}
    >
      <div className="absolute top-3 right-3 font-pixel text-[8px] text-white/90 tracking-wider">
        1234 5678 9876 5432
      </div>
      <div className="absolute bottom-6 left-3 font-pixel text-[7px] text-white/85">
        ··/··/··
      </div>
      <div className="absolute bottom-3 left-3 font-pixel text-[7px] text-white/85">
        SUSAN SMITH
      </div>
      <div className="absolute bottom-3 right-3 h-5 w-7 rounded-[2px] bg-gradient-to-br from-yellow-200 to-yellow-500/70 opacity-90" />
    </div>
  );
}

function FanCard({ name, bg, fg }: { name: string; bg: string; fg: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-[10px] grid place-items-center px-3"
      style={{
        background: bg,
        color: fg,
        boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
      }}
    >
      <span className="text-center text-[13px] leading-tight font-display italic">
        {name}
        <span className="not-italic">&gt;</span>
      </span>
    </div>
  );
}

function CustomBlock({ label }: { label: string }) {
  return (
    <div className="mx-5 mt-2 grid grid-cols-[auto_1px_1fr] items-center gap-4">
      <div className="font-display text-white text-[22px] leading-[1.05] max-w-[120px] whitespace-pre-line">
        {label}
      </div>
      <div className="h-20 w-px bg-[#39ff7a]" />
      <button
        aria-label="Create new card"
        className="h-24 rounded-[14px] bg-white grid place-items-center active:scale-[0.98] transition-transform"
      >
        <div className="h-14 w-14 rounded-full bg-black grid place-items-center">
          <span className="text-white text-3xl leading-none font-light">+</span>
        </div>
      </button>
    </div>
  );
}

/* ---------- bottom nav ---------- */

type Tab = "home" | "browse" | "saved" | "profile";

function BottomNav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const items: { id: Tab; label: string; src: string }[] = [
    { id: "home", label: "Home", src: iconHome },
    { id: "browse", label: "Browse", src: iconBrowse },
    { id: "saved", label: "Saved", src: iconSaved },
    { id: "profile", label: "Profile", src: iconProfile },
  ];
  return (
    <nav
      className="sticky bottom-0 z-30 w-full border-t border-white/10"
      style={{
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(8px)",
      }}
    >
      <ul className="grid grid-cols-4 px-3 pt-2 pb-3">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <li key={it.id}>
              <button
                onClick={() => onChange(it.id)}
                className="w-full flex flex-col items-center gap-1 select-none"
                aria-current={isActive ? "page" : undefined}
              >
                <img
                  src={it.src}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  className="pixelated h-9 w-9 object-contain"
                />
                <span
                  className="font-display text-[13px] leading-none"
                  style={{ color: isActive ? "#39ff7a" : "#0a0a0a", textShadow: isActive ? "none" : "0 0 0 transparent" }}
                >
                  <span
                    className="px-1 rounded"
                    style={{
                      background: isActive ? "transparent" : "#ffffff",
                      color: isActive ? "#39ff7a" : "#0a0a0a",
                    }}
                  >
                    {it.label}
                  </span>
                </span>
                <span
                  className="h-[3px] w-6 rounded-full"
                  style={{ background: isActive ? "#39ff7a" : "transparent" }}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ---------- page ---------- */

function Index() {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <main className="mx-auto flex min-h-screen max-w-[440px] flex-col bg-black">
        {/* Header */}
        <header className="sticky top-0 z-20 flex items-center gap-3 bg-black/90 px-5 pt-5 pb-3 backdrop-blur">
          <h1
            className="font-pixel text-[22px] leading-none"
            style={{
              color: "#39ff7a",
              textShadow: "0 0 8px rgba(57,255,122,0.45)",
            }}
          >
            DPqR
          </h1>
          <label className="ml-auto flex h-9 w-[62%] items-center gap-2 rounded-full border border-white/40 bg-transparent px-3">
            <input
              type="search"
              placeholder=""
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/40"
              aria-label="Search DPqR"
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </label>
        </header>

        <div className="flex-1 pb-6">
          {/* QR Cards rail */}
          <section className="mt-4">
            <SectionTitle>QR Cards for you</SectionTitle>
            <div className="snap-rail no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5 pb-1">
              {QR_CARDS.map((c) => (
                <AestheticCard
                  key={c.name}
                  top={c.top}
                  bot={c.bot}
                  className="h-[150px] w-[100px] shrink-0"
                />
              ))}
            </div>
          </section>

          {/* Gift Cards rail */}
          <section className="mt-6">
            <SectionTitle>Gift Cards for you</SectionTitle>
            <div className="snap-rail no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5 pb-1">
              {GIFT_CARDS.map((g) => (
                <div key={g.name} className="h-[120px] w-[180px] shrink-0">
                  <GiftCard bg={g.bg} />
                </div>
              ))}
            </div>
          </section>

          {/* Customize your own card */}
          <section className="mt-6">
            <CustomBlock label={"Customize\nYour Own\nCard"} />
          </section>

          {/* Fan Cards rail */}
          <section className="mt-6">
            <SectionTitle>Fan Cards for you</SectionTitle>
            <div className="snap-rail no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5 pb-1">
              {FAN_CARDS.map((f) => (
                <div key={f.name} className="h-[78px] w-[160px] shrink-0">
                  <FanCard {...f} />
                </div>
              ))}
            </div>
          </section>

          {/* Link Bundle Card */}
          <section className="mt-6">
            <SectionTitle>Link Bundle Card</SectionTitle>
            <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5 pb-1">
              <LinkBundle count="50+" />
              <LinkBundle count="20+" tint="#2cd4d4" />
              <LinkBundle count="10+" tint="#ff7ec2" />
            </div>
          </section>

          {/* Moment Cards rail */}
          <section className="mt-6">
            <SectionTitle>Moment Cards for you</SectionTitle>
            <div className="snap-rail no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5 pb-1">
              {MOMENT_CARDS.map((m) => (
                <div key={m.name} className="h-[150px] w-[100px] shrink-0">
                  <GiftCard bg={m.bg} />
                </div>
              ))}
            </div>
          </section>

          {/* Make your own nifty card */}
          <section className="mt-6">
            <CustomBlock label={"Make\nYour Own\nNifty\nCard>"} />
          </section>
        </div>

        <BottomNav active={tab} onChange={setTab} />
      </main>
    </div>
  );
}

function LinkBundle({ count, tint = "#ffd33a" }: { count: string; tint?: string }) {
  return (
    <div className="relative h-[70px] w-[110px] shrink-0">
      {/* fan of card edges */}
      <div className="absolute inset-y-1 left-0 w-3 rounded-l-md bg-[#ef3a2a]" />
      <div className="absolute inset-y-1 left-3 w-3 bg-[#22a05a]" />
      <div className="absolute inset-y-1 left-6 w-3 bg-[#1f7ad6]" />
      <div className="absolute inset-y-1 left-9 w-3 bg-[#0a0a0a]" />
      <div
        className="absolute inset-y-0 left-[52px] right-0 rounded-md grid place-items-center font-pixel text-[12px] text-black"
        style={{ background: tint, boxShadow: "0 4px 14px rgba(0,0,0,0.4)" }}
      >
        {count}
      </div>
    </div>
  );
}
