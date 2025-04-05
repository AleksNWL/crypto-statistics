export interface responseCoingecko {
    id: string;
    market_cap_rank: number;
    name: string;
    symbol: string;
    image: string;
    total_volume: number;
    current_price: number;
    market_cap: number;
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_24h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
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
    totalVolume: number;
    currentPrice: number;
    marketCap: number;
    priceChange1h: number;
    priceChange24h: number;
    priceChange7d: number;
    priceChangeATL: number;
    maxPrice24h: number;
    minPrice24h: number;
}