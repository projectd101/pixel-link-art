export type Rarity = "Common" | "Rare" | "Epic" | "Legendary" | "Mythic";

export interface DpqrCard {
  id: string;
  artist: string;
  title: string;
  edition: string;
  serial: string;
  rarity: Rarity;
  accent: string;        // hex accent
  accent2: string;       // secondary
  holo?: boolean;
  perk: string;
  videoLabel: string;
}

export interface Drop {
  id: string;
  artist: string;
  title: string;
  subtitle: string;
  accent: string;
  accent2: string;
  startsAt: number;      // epoch ms
  status: "teaser" | "live" | "ended";
  supply: number;
  claimed: number;
  card: DpqrCard;
}

const now = Date.now();

export const CARDS: DpqrCard[] = [
  { id: "c1", artist: "AURORA WAVE", title: "Midnight Acoustic",  edition: "Drop 04", serial: "012/500", rarity: "Legendary", accent: "#d4ad5a", accent2: "#1a1208", holo: true,  perk: "Backstage pass · Tour 26", videoLabel: "Acoustic — 3:24" },
  { id: "c2", artist: "KAIROS",      title: "Freestyle 19",       edition: "Drop 02", serial: "077/250", rarity: "Mythic",    accent: "#ff3d57", accent2: "#1a0408", holo: true,  perk: "Front row priority", videoLabel: "Freestyle — 2:11" },
  { id: "c3", artist: "LUNA DEL SOL",title: "Sunset Sessions",    edition: "Drop 01", serial: "204/1000",rarity: "Rare",      accent: "#7c5cff", accent2: "#0b0820",            perk: "Merch early access",     videoLabel: "Studio — 1:47" },
  { id: "c4", artist: "BLVCK NOVA",  title: "Underground Cut",    edition: "Drop 07", serial: "001/100", rarity: "Mythic",    accent: "#00e0a4", accent2: "#04181a", holo: true,  perk: "Meet & greet keycard",   videoLabel: "Live — 4:02" },
  { id: "c5", artist: "MARA",        title: "Letter to a Fan",    edition: "Personal",serial: "—/—",     rarity: "Epic",      accent: "#f0e6d2", accent2: "#1a1714",            perk: "Voice DM reply",         videoLabel: "Personal — 0:48" },
  { id: "c6", artist: "STORM ATLAS", title: "Stadium Encore",     edition: "Drop 03", serial: "318/2500",rarity: "Common",    accent: "#2da4ff", accent2: "#04101a",            perk: "Ticket discount 15%",    videoLabel: "Encore — 5:32" },
];

export const DROPS: Drop[] = [
  { id: "d1", artist: "AURORA WAVE", title: "Midnight Acoustic",     subtitle: "Tour 26 announcement",    accent: "#d4ad5a", accent2: "#1a1208", startsAt: now + 1000 * 60 * 60 * 6 + 1000 * 60 * 12,  status: "teaser", supply: 500,  claimed: 0,    card: CARDS[0] },
  { id: "d2", artist: "KAIROS",      title: "Freestyle 19",          subtitle: "Live drop — closing soon",accent: "#ff3d57", accent2: "#1a0408", startsAt: now - 1000 * 60 * 30,                       status: "live",   supply: 250,  claimed: 188,  card: CARDS[1] },
  { id: "d3", artist: "BLVCK NOVA",  title: "Underground Cut",       subtitle: "Mythic 1 of 100",         accent: "#00e0a4", accent2: "#04181a", startsAt: now + 1000 * 60 * 60 * 38,                  status: "teaser", supply: 100,  claimed: 0,    card: CARDS[3] },
  { id: "d4", artist: "LUNA DEL SOL",title: "Sunset Sessions",       subtitle: "EP companion drop",       accent: "#7c5cff", accent2: "#0b0820", startsAt: now - 1000 * 60 * 60 * 18,                  status: "ended",  supply: 1000, claimed: 1000, card: CARDS[2] },
];

export function formatCountdown(target: number) {
  const diff = Math.max(0, target - Date.now());
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { h, m, s, total: diff };
}
