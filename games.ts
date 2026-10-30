export interface GameEntry {
  id: number;
  name: string;
  emoji: string;
  cat: string;
  catColor: string;
  catBg: string;
  btnFrom: string;
  btnTo: string;
  glow: string;
  desc: string;
  script: string;
  image: string;
}

const FALLBACK_IMAGE =
  "https://images.pexels.com/photos/33930731/pexels-photo-33930731.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=400";

export { FALLBACK_IMAGE };

export const games: GameEntry[] = [
  {
    id: 1,
    name: "Blox Fruits",
    emoji: "🎃",
    cat: "ADVENTURE",
    catColor: "#ffb020",
    catBg: "rgba(255,176,32,0.16)",
    btnFrom: "#ff7518",
    btnTo: "#ff9d2e",
    glow: "rgba(255,117,24,0.45)",
    desc: "Auto farm, auto quest, fruit sniper, fruit spawner and cursed combat features for every haunted sea.",
    script: `loadstring(game:HttpGet("https://example-scripts.dev/kurumi/blox-fruits.lua"))()`,
    image:
      "https://tr.rbxcdn.com/180DAY-14dc1d72bd47522ee8f9d42ab0fef712/768/432/Image/Webp/noFilter",
  },
  {
    id: 2,
    name: "Grow A Garden 2",
    emoji: "🕸️",
    cat: "SIMULATOR",
    catColor: "#7cff8f",
    catBg: "rgba(124,255,143,0.16)",
    btnFrom: "#1f9d55",
    btnTo: "#39e37a",
    glow: "rgba(57,227,122,0.45)",
    desc: "Auto farm, auto collect, speed hack, spawner, and other eerie powerful tools for your garden.",
    script: `loadstring(game:HttpGet("https://example-scripts.dev/kurumi/grow-a-garden.lua"))()`,
    image:
      "https://tr.rbxcdn.com/180DAY-4d023b36ace24ced73efbaadcb66b37c/768/432/Image/Webp/noFilter",
  },
  {
    id: 3,
    name: "Murder Mystery 2",
    emoji: "🔪",
    cat: "MYSTERY",
    catColor: "#b58bff",
    catBg: "rgba(181,139,255,0.16)",
    btnFrom: "#7c3aed",
    btnTo: "#a78bfa",
    glow: "rgba(167,139,250,0.45)",
    desc: "ESP, aimbot, godmode, knife & gun spawner — haunted cheats for Murderer and Sheriff alike.",
    script: `loadstring(game:HttpGet("https://example-scripts.dev/kurumi/mm2.lua"))()`,
    image:
      "https://tr.rbxcdn.com/180DAY-fe7335c3ad752e84323cd81ae38de69a/768/432/Image/Webp/noFilter",
  },
  {
    id: 4,
    name: "Steal A Brainrot",
    emoji: "🧠",
    cat: "TYCOON",
    catColor: "#ff5c7a",
    catBg: "rgba(255,92,122,0.16)",
    btnFrom: "#c81e3a",
    btnTo: "#ff4d6d",
    glow: "rgba(255,77,109,0.45)",
    desc: "Auto trade, auto steal, dupe items, and a monstrously strong real spawner.",
    script: `loadstring(game:HttpGet("https://example-scripts.dev/kurumi/steal-a-brainrot.lua"))()`,
    image:
      "https://tr.rbxcdn.com/180DAY-e9f65602f6682ba50ca16b282e6d6e95/768/432/Image/Webp/noFilter",
  },
  {
    id: 5,
    name: "Adopt Me",
    emoji: "🐾",
    cat: "SIMULATOR",
    catColor: "#7cff8f",
    catBg: "rgba(124,255,143,0.16)",
    btnFrom: "#1f9d55",
    btnTo: "#39e37a",
    glow: "rgba(57,227,122,0.45)",
    desc: "Auto hatch, auto farm, dupe pets, spawner, and unlock secret crypts instantly.",
    script: `loadstring(game:HttpGet("https://example-scripts.dev/kurumi/adopt-me.lua"))()`,
    image:
      "https://tr.rbxcdn.com/180DAY-405b7968b4449da3a0e5f54ed0ef1456/768/432/Image/Webp/noFilter",
  },
  {
    id: 6,
    name: "Coming More Soon",
    emoji: "👻",
    cat: "ON GOING",
    catColor: "#6fc8ff",
    catBg: "rgba(111,200,255,0.16)",
    btnFrom: "#1d6fa8",
    btnTo: "#4fb3ff",
    glow: "rgba(79,179,255,0.45)",
    desc: "More haunted scripts are brewing in the cauldron. Join our server to stay updated!",
    script: `-- 🎃 New script rising from the graveyard soon...\n-- Join the Discord to be notified first!`,
    image: FALLBACK_IMAGE,
  },
];
