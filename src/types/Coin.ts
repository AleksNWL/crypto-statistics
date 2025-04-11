export interface responseCoingecko {
    id: string;
    market_cap_rank: number;
    name: string;
    symbol: string;
    image: string;
    price_change_percentage_24h: number;
    total_volume: number | null;
    current_price: number | null;
    market_cap: number | null;
    atl_change_percentage: number;
    high_24h: number;
    low_24h: number;
}

export interface dataUI {
    id: string;
    key: number;
    name: string;
    symbol: string;
    logo: string;
    priceChangePercentage24h: number | null;
    totalVolume: string;
    currentPrice: number;
    marketCap: string;
    priceChangeATL: number;
    maxPrice24h: number;
    minPrice24h: number
}