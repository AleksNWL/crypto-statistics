export interface chartData {
    prices: [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
}

export interface transformDataChart {
    timestamp: Date;
    price: number;
    marketCap: number;
    totalVolume: number;
}
