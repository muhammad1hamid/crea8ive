const SPAM_TERMS = [
  "andar-bahar",
  "baccarat",
  "bank-holiday",
  "best-online-slot",
  "bingo",
  "blackjack",
  "bookmaker",
  "casino",
  "cash-spins",
  "casperspins",
  "craps",
  "deposit-bonus",
  "dream-catcher",
  "easy-online-casino",
  "ezugi",
  "flash-roulette",
  "flexepin",
  "free-spins",
  "fruit-machine",
  "gambl",
  "gamblor",
  "goodman",
  "jackpot",
  "keno",
  "kong-casino",
  "low-volatility",
  "megaways",
  "neosurf",
  "no-deposit",
  "online-bonus",
  "online-casino",
  "online-slot",
  "pay-by-mobile",
  "payid",
  "paysafe",
  "paysafecard",
  "phone-casino",
  "poker",
  "real-money",
  "roulette",
  "scratch-cards",
  "sic-bo",
  "slot-machine",
  "slots",
  "sportsbook",
  "spin-palace",
  "trustly",
  "turbonino",
  "unlimluck",
  "vicibet",
  "vulkanvegas",
  "wager",
  "wirecard",
  "withdrawal",
  "zimpler",
  "zoome",
] as const;

const SPAM_PATH_PATTERN = new RegExp(
  SPAM_TERMS.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
  "i"
);

export function normalizePathForCleanup(value: string) {
  const withoutOrigin = value.replace(/^https?:\/\/(?:www\.)?crea8ivmedia\.com/i, "");
  const withoutQuery = withoutOrigin.split(/[?#]/)[0] || "/";

  try {
    return decodeURIComponent(withoutQuery).toLowerCase();
  } catch {
    return withoutQuery.toLowerCase();
  }
}

export function isSpamPath(value: string) {
  return SPAM_PATH_PATTERN.test(normalizePathForCleanup(value));
}

