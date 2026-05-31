export type Rarity = "Common" | "Rare" | "Epic" | "Legendary" | "Mythic";
export type CardKind = "physical" | "digital";

export interface NarniaCard {
  id: string;
  artist: string;
  artistInitial: string;
  series: string;
  serial: string;        // e.g. "012/500"
  rarity: Rarity;
  kind: CardKind;
  perk: string;
  videoLabel: string;
  brand?: string;        // brand collab (Zara, Nike...)
  ticket?: { event: string; date: string; venue: string; access: string };
  signatureHue: string;  // accent color (CSS color)
  imageGradient: string; // gradient string for the artist image area
}

export interface Drop {
  id: string;
  artist: string;
  title: string;
  subtitle: string;
  startsAt: number;
  status: "teaser" | "live" | "ended";
  supply: number;
  claimed: number;
  price: number;
  card: NarniaCard;
}

const now = Date.now();

export const ARTISTS = [
  { id: "speed",  name: "Speed",       hue: "#FF2222", fans: 184_220 },
  { id: "travis", name: "Travis",      hue: "#D4AD5A", fans: 422_900 },
  { id: "taylor", name: "Taylor",      hue: "#A070FF", fans: 612_080 },
  { id: "kairos", name: "Kairos",      hue: "#2DA4FF", fans:  88_140 },
  { id: "aurora", name: "Aurora Wave", hue: "#00E0A4", fans:  42_500 },
  { id: "blvck",  name: "Blvck Nova",  hue: "#E8E8E8", fans:  19_900 },
];

export const CARDS: NarniaCard[] = [
  { id: "n1", artist: "Speed",   artistInitial: "S", series: "Genesis · S1", serial: "003/500",  rarity: "Legendary", kind: "physical", perk: "Concert access · Tour 26", videoLabel: "Locker Room — 0:42", signatureHue: "#FF2222", imageGradient: "linear-gradient(160deg,#330000,#8B0000 60%,#CC0000)" },
  { id: "n2", artist: "Travis",  artistInitial: "T", series: "Astro · Drop 04", serial: "047/250", rarity: "Mythic",   kind: "physical", perk: "Meet & greet keycard", videoLabel: "Studio — 2:11", signatureHue: "#D4AD5A", brand: "Nike", imageGradient: "linear-gradient(160deg,#1a1208,#D4AD5A 70%,#7a5a1f)" },
  { id: "n3", artist: "Taylor",  artistInitial: "T", series: "Eras Vault",     serial: "201/1000",rarity: "Rare",     kind: "digital",  perk: "Early ticket window",  videoLabel: "Backstage — 1:47", signatureHue: "#A070FF", imageGradient: "linear-gradient(160deg,#1A0A2E,#A070FF 80%,#5a3c9c)" },
  { id: "n4", artist: "Kairos",  artistInitial: "K", series: "Freestyle 19",   serial: "008/100", rarity: "Epic",     kind: "physical", perk: "Voice DM reply", videoLabel: "Freestyle — 2:11", signatureHue: "#2DA4FF", imageGradient: "linear-gradient(160deg,#04101a,#2DA4FF 80%,#0a4a7a)" },
  { id: "n5", artist: "Aurora Wave", artistInitial: "A", series: "Midnight Acoustic", serial: "120/500", rarity: "Common", kind: "digital", perk: "Merch 10% off", videoLabel: "Acoustic — 3:24", signatureHue: "#00E0A4", imageGradient: "linear-gradient(160deg,#04181a,#00E0A4 80%,#0a5e4a)" },
  { id: "n6", artist: "Blvck Nova", artistInitial: "B", series: "Underground Cut", serial: "001/100", rarity: "Mythic", kind: "physical", perk: "Front-row · Stadium Encore", videoLabel: "Live — 4:02", signatureHue: "#E8E8E8", ticket: { event: "Underground Cut Tour", date: "Aug 14 · 2026", venue: "Brooklyn Mirage", access: "GA" }, imageGradient: "linear-gradient(160deg,#0a0a0a,#E8E8E8 90%,#888)" },
  { id: "n7", artist: "Travis", artistInitial: "T", series: "Zara x Astro", serial: "044/300", rarity: "Epic", kind: "physical", perk: "Unlocks hoodie drop", videoLabel: "Fitting — 0:55", signatureHue: "#D4AD5A", brand: "Zara", imageGradient: "linear-gradient(160deg,#111,#D4AD5A 80%,#3a2a08)" },
  { id: "n8", artist: "Speed",  artistInitial: "S", series: "Match Day",   serial: "999/9999", rarity: "Common", kind: "digital", perk: "Stream perk · Highlights", videoLabel: "Goal — 0:18", signatureHue: "#FF2222", imageGradient: "linear-gradient(160deg,#1A0408,#FF2222 80%,#600)" },
];

export const DROPS: Drop[] = [
  { id: "d1", artist: "Speed",   title: "Genesis · S1",     subtitle: "Tour 26 announcement",     startsAt: now + 1000*60*60*5 + 1000*60*12,  status: "teaser", supply: 500,  claimed: 0,    price: 29, card: CARDS[0] },
  { id: "d2", artist: "Travis",  title: "Astro · Drop 04",  subtitle: "Live · closing soon",       startsAt: now - 1000*60*30,                  status: "live",   supply: 250,  claimed: 188,  price: 79, card: CARDS[1] },
  { id: "d3", artist: "Kairos",  title: "Freestyle 19",     subtitle: "Live now",                  startsAt: now - 1000*60*12,                  status: "live",   supply: 100,  claimed: 41,   price: 49, card: CARDS[3] },
  { id: "d4", artist: "Blvck Nova", title: "Underground Cut", subtitle: "Mythic · 1 of 100",       startsAt: now + 1000*60*60*38,                status: "teaser", supply: 100,  claimed: 0,    price: 199, card: CARDS[5] },
  { id: "d5", artist: "Aurora Wave", title: "Sunset Sessions", subtitle: "EP companion",           startsAt: now - 1000*60*60*18,                status: "ended",  supply: 1000, claimed: 1000, price: 19, card: CARDS[4] },
  { id: "d6", artist: "Taylor", title: "Eras Vault",        subtitle: "Live now",                  startsAt: now - 1000*60*60*1,                 status: "live",   supply: 1000, claimed: 612,  price: 39, card: CARDS[2] },
];

export function formatCountdown(target: number) {
  const diff = Math.max(0, target - Date.now());
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { h, m, s, total: diff };
}

export function rarityClass(r: Rarity) {
  return {
    Common: "",
    Rare: "clay-rare",
    Epic: "clay-epic",
    Legendary: "clay-legendary",
    Mythic: "clay-mythic",
  }[r];
}

export function edgeClass(r: Rarity) {
  return {
    Common: "",
    Rare: "edge-rare",
    Epic: "edge-epic",
    Legendary: "edge-legendary",
    Mythic: "edge-mythic",
  }[r];
}

export function rarityDot(r: Rarity) {
  return {
    Common: "#9aa0a6",
    Rare: "#2DA4FF",
    Epic: "#A070FF",
    Legendary: "#D4AD5A",
    Mythic: "#FF2222",
  }[r];
}

export function findCard(id: string) {
  return CARDS.find(c => c.id === id);
}
export function findDrop(id: string) {
  return DROPS.find(d => d.id === id);
}
export function findArtist(id: string) {
  return ARTISTS.find(a => a.id === id);
}