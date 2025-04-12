export interface responseCoingecko {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number | null;
    market_cap: number | null;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number | null;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
}

export interface dataUI {
    id: string;
    symbol: string;
    name: string;
    logo: string;
    currentPrice: string;
    marketCap: string;
    key: number;
    fullyDilutedValuation: number;
    totalVolume: string;
    maxPrice24h: number;
    minPrice24h: number;
    priceChange24h: number;
    priceChangePercentage24h: number | null;
    marketCapChange24h: number;
    marketCapChangePercentage24h: number;
    circulatingSupply: number;
    totalSupply: number;
    maxSupply: number;
    ath: number;
    athChangePercentage: number;
    athDate: string;
    atl: number;
    atlChangePercentage: number;
    atlDate: string;
}