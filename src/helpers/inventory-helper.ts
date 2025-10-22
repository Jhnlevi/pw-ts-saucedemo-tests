// Returns a boolean for each sorting value
export const sortItems = (
  value: string,
  order: string[],
  prices: string[]
): boolean => {
  switch (value) {
    case "az": {
      return (
        JSON.stringify(order) ===
        JSON.stringify([...order].sort((a, b) => a.localeCompare(b)))
      );
    }
    case "za": {
      return (
        JSON.stringify(order) ===
        JSON.stringify([...order].sort((a, b) => b.localeCompare(a)))
      );
    }
    case "lohi": {
      const pricesLoHi = prices.map((p) => parseFloat(p.replace("$", "")));
      return (
        JSON.stringify(pricesLoHi) ===
        JSON.stringify([...pricesLoHi].sort((a, b) => a - b))
      );
    }
    case "hilo": {
      const pricesHiLo = prices.map((p) => parseFloat(p.replace("$", "")));
      return (
        JSON.stringify(pricesHiLo) ===
        JSON.stringify([...pricesHiLo].sort((a, b) => b - a))
      );
    }
    default:
      return false;
  }
};
