export const formatPrice = (price: number): string => {
  if (price >= 1) {
    return `$${price.toFixed(2)}`;
  } else if (price >= 0.01) {
    return `$${price.toFixed(4)}`;
  } else {
    return `$${price.toFixed(6)}`;
  }
};

export const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else if (marketCap >= 1e3) {
    return `$${(marketCap / 1e3).toFixed(2)}K`;
  } else {
    return `$${marketCap.toFixed(2)}`;
  }
};

export const getCryptoIcon = (symbol: string): string => {
  const iconMap: Record<string, string> = {
    BTC: '₿',
    ETH: 'Ξ',
    USDT: '₮',
    USDC: '💵',
    BNB: '🟡',
    XRP: '✖',
    ADA: '₳',
    SOL: '◎',
    DOT: '●',
    DOGE: '🐕',
    AVAX: '❄',
    MATIC: '🔷',
    LINK: '🔗',
    UNI: '🦄',
    LTC: 'Ł',
    BCH: '₿',
    XLM: '⭐',
    VET: '🔷',
    FIL: '📁',
    ATOM: '⚛',
  };

  return iconMap[symbol.toUpperCase()] || '🪙';
};
