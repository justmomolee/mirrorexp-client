export const formatMarkets = (markets: string[] = [], fallback = "") => {
  const normalizedMarkets = markets
    .map((market) => market.trim())
    .filter(Boolean);

  if (normalizedMarkets.length) {
    return normalizedMarkets.join(", ");
  }

  return fallback || "No market";
};

export const getTraderInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part.trim()[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
