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

/**
 * Gets the vector icon name for a cryptocurrency symbol
 * @param symbol - The cryptocurrency symbol (e.g., 'BTC', 'ETH')
 * @returns The icon name for react-native-vector-icons
 * @example getCryptoIconName('BTC') // 'bitcoin'
 */
export const getCryptoIconName = (symbol: string): string => {
  const iconMap: Record<string, string> = {
    // Major cryptocurrencies with specific icons
    BTC: 'bitcoin',
    ETH: 'ethereum',
    BCH: 'bitcoin',
    LTC: 'circle',

    // Stablecoins
    USDT: 'dollar-sign',
    USDC: 'dollar-sign',
    DAI: 'dollar-sign',

    // Platform tokens
    BNB: 'circle',
    XRP: 'circle',
    ADA: 'circle',
    SOL: 'circle',
    DOT: 'circle',
    AVAX: 'circle',
    MATIC: 'circle',
    LINK: 'link',
    UNI: 'circle',
    ATOM: 'circle',
    NEAR: 'circle',
    FTM: 'circle',
    ICP: 'circle',
    CRO: 'circle',
    HBAR: 'circle',
    CELO: 'circle',
    FLOW: 'circle',
    KSM: 'circle',
    ALGO: 'circle',

    // Gaming and metaverse tokens
    MANA: 'circle',
    SAND: 'circle',
    AXS: 'circle',
    GALA: 'circle',
    ENJ: 'circle',
    CHZ: 'circle',

    // DeFi tokens
    COMP: 'circle',
    MKR: 'circle',
    SNX: 'circle',
    YFI: 'circle',
    AAVE: 'circle',
    SUSHI: 'circle',
    CRV: 'circle',
    BAL: 'circle',
    REN: 'circle',
    KNC: 'circle',
    ZRX: 'circle',
    BAT: 'circle',
    OMG: 'circle',
    REP: 'circle',
    GNT: 'circle',
    MLN: 'circle',

    // Other popular tokens
    DOGE: 'circle',
    SHIB: 'circle',
    TRX: 'circle',
    LEO: 'circle',
    EOS: 'circle',
    XTZ: 'circle',
    VET: 'circle',
    THETA: 'circle',
    XLM: 'star',
    ZIL: 'circle',
    IOTA: 'circle',
    NEO: 'circle',
    QTUM: 'circle',
    ZEC: 'circle',
    DASH: 'circle',
    XMR: 'circle',
    ETC: 'circle',
    BTT: 'circle',
    WAVES: 'circle',
    RVN: 'circle',
    HNT: 'circle',
    ONE: 'circle',
    ZEN: 'circle',
    VGX: 'circle',
    STORJ: 'folder',
    OXT: 'circle',
    ALPHA: 'circle',
    BAND: 'circle',
    NMR: 'circle',
    RLC: 'circle',
    CVC: 'circle',
    DNT: 'circle',
    LOOM: 'circle',
    FUN: 'circle',
    HOT: 'circle',
    POLY: 'circle',
    AION: 'circle',
    REQ: 'circle',
    WINGS: 'circle',
    TRST: 'circle',
    GUP: 'circle',
    EVX: 'circle',
    PART: 'circle',
    QSP: 'circle',
    BTS: 'circle',
    XZC: 'circle',
    ARK: 'circle',
    IOTX: 'circle',
    DOCK: 'circle',
    WAN: 'circle',
    CELR: 'circle',
    COCOS: 'circle',
    NKN: 'circle',
    ORBS: 'circle',
    ANKR: 'circle',
    CKB: 'circle',
    AUDIO: 'circle',
    UMA: 'circle',
    LRC: 'circle',
    ICX: 'circle',
    ONT: 'circle',
    NANO: 'circle',
    VTHO: 'circle',
    BCN: 'circle',
    DGB: 'circle',
    SC: 'circle',
    XVG: 'circle',
    STRAT: 'circle',
    ARDR: 'circle',
    STEEM: 'circle',
    FIL: 'folder',
  };

  return iconMap[symbol.toUpperCase()] || 'circle';
};

/**
 * Gets the appropriate icon family for a cryptocurrency symbol
 * @param symbol - The cryptocurrency symbol (e.g., 'BTC', 'ETH')
 * @returns The icon family name for react-native-vector-icons
 * @example getCryptoIconFamily('BTC') // 'FontAwesome5'
 */
export const getCryptoIconFamily = (symbol: string): string => {
  const familyMap: Record<string, string> = {
    // FontAwesome5 has better crypto-specific icons
    BTC: 'FontAwesome5',
    ETH: 'FontAwesome5',
    BCH: 'FontAwesome5',

    // Feather for most other icons (cleaner, more consistent)
    USDT: 'Feather',
    USDC: 'Feather',
    DAI: 'Feather',
    BNB: 'Feather',
    XRP: 'Feather',
    ADA: 'Feather',
    SOL: 'Feather',
    DOT: 'Feather',
    AVAX: 'Feather',
    MATIC: 'Feather',
    LINK: 'Feather',
    UNI: 'Feather',
    LTC: 'Feather',
    XLM: 'Feather',
    VET: 'Feather',
    FIL: 'Feather',
    ATOM: 'Feather',
    NEAR: 'Feather',
    FTM: 'Feather',
    ICP: 'Feather',
    CRO: 'Feather',
    HBAR: 'Feather',
    CELO: 'Feather',
    FLOW: 'Feather',
    KSM: 'Feather',
    ALGO: 'Feather',
    MANA: 'Feather',
    SAND: 'Feather',
    AXS: 'Feather',
    GALA: 'Feather',
    ENJ: 'Feather',
    CHZ: 'Feather',
    COMP: 'Feather',
    MKR: 'Feather',
    SNX: 'Feather',
    YFI: 'Feather',
    AAVE: 'Feather',
    SUSHI: 'Feather',
    CRV: 'Feather',
    BAL: 'Feather',
    REN: 'Feather',
    KNC: 'Feather',
    ZRX: 'Feather',
    BAT: 'Feather',
    OMG: 'Feather',
    REP: 'Feather',
    GNT: 'Feather',
    MLN: 'Feather',
    DOGE: 'Feather',
    SHIB: 'Feather',
    TRX: 'Feather',
    LEO: 'Feather',
    EOS: 'Feather',
    XTZ: 'Feather',
    THETA: 'Feather',
    ZIL: 'Feather',
    IOTA: 'Feather',
    NEO: 'Feather',
    QTUM: 'Feather',
    ZEC: 'Feather',
    DASH: 'Feather',
    XMR: 'Feather',
    ETC: 'Feather',
    BTT: 'Feather',
    WAVES: 'Feather',
    RVN: 'Feather',
    HNT: 'Feather',
    ONE: 'Feather',
    ZEN: 'Feather',
    VGX: 'Feather',
    STORJ: 'Feather',
    OXT: 'Feather',
    ALPHA: 'Feather',
    BAND: 'Feather',
    NMR: 'Feather',
    RLC: 'Feather',
    CVC: 'Feather',
    DNT: 'Feather',
    LOOM: 'Feather',
    FUN: 'Feather',
    HOT: 'Feather',
    POLY: 'Feather',
    AION: 'Feather',
    REQ: 'Feather',
    WINGS: 'Feather',
    TRST: 'Feather',
    GUP: 'Feather',
    EVX: 'Feather',
    PART: 'Feather',
    QSP: 'Feather',
    BTS: 'Feather',
    XZC: 'Feather',
    ARK: 'Feather',
    IOTX: 'Feather',
    DOCK: 'Feather',
    WAN: 'Feather',
    CELR: 'Feather',
    COCOS: 'Feather',
    NKN: 'Feather',
    ORBS: 'Feather',
    ANKR: 'Feather',
    CKB: 'Feather',
    AUDIO: 'Feather',
    UMA: 'Feather',
    LRC: 'Feather',
    ICX: 'Feather',
    ONT: 'Feather',
    NANO: 'Feather',
    VTHO: 'Feather',
    BCN: 'Feather',
    DGB: 'Feather',
    SC: 'Feather',
    XVG: 'Feather',
    STRAT: 'Feather',
    ARDR: 'Feather',
    STEEM: 'Feather',
  };

  return familyMap[symbol.toUpperCase()] || 'Feather';
};

/**
 * Legacy function for backward compatibility
 * @deprecated Use getCryptoIconName and getCryptoIconFamily instead
 */
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
