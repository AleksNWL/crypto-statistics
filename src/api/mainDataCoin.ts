import axios from 'axios'
import {dataUI, responseCoingecko} from "../types/Coin.ts";


export async function getCoingeckoApi(page: number, order: string, countPages: string) {
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
        params: {
            vs_currency: "usd",
            order: order,
            per_page: countPages,
            page: page,
            sparkline: false
        },
        headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-4xS9jhhLRQhiV6dQknh4WCr8"
        }
    });
    return data;
}

export function trasformBigSum(value: number): string {
    if (value === null || value === undefined) return "N/A";
    if (value >= 1_000_000_000_000) {
        return (value / 1_000_000_000_000).toFixed(2) + "T";
    } else if (value >= 1_000_000_000) {
        return (value / 1_000_000_000).toFixed(2) + "B";
    } else if (value >= 1_000_000) {
        return (value / 1_000_000).toFixed(2) + "M";
    } else if (value >= 1_000) {
        return (value / 1_000).toFixed(2) + "K";
    } else {
        return value.toString();
    }
}

export function transformDate(date: string): string {
    const formatDate = new Date(date);
    return formatDate.toLocaleDateString("ru-RU", {})
}

export function transformNumber(value: number | string | null): string {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 10
    }).format(Number(value));
}

export function transformData(data: responseCoingecko[]): dataUI[] {
    return data.map((item, index) => ({
        id: item.id,
        symbol: item.symbol.toUpperCase(),
        name: item.name,
        logo: item.image,
        currentPrice: transformNumber(item.current_price ?? 0),
        marketCap: trasformBigSum(item.market_cap ?? 0),
        key: item.market_cap_rank ?? index + 1,
        fullyDilutedValuation: item.fully_diluted_valuation,
        totalVolume: trasformBigSum(item.total_volume ?? 0),
        maxPrice24h: item.high_24h,
        minPrice24h: item.low_24h,
        priceChange24h: item.price_change_24h,
        priceChangePercentage24h: item.price_change_percentage_24h !== null
            ? Number((item.price_change_percentage_24h).toFixed(2))
            : null,
        marketCapChange24h: item.market_cap_change_24h,
        marketCapChangePercentage24h: item.price_change_percentage_24h,
        circulatingSupply: item.circulating_supply,
        totalSupply: item.total_supply ?? 0,
        maxSupply: item.max_supply ?? 0,
        ath: item.ath ?? null,
        athChangePercentage: item.ath_change_percentage,
        athDate: transformDate(item.ath_date),
        atl: item.atl ?? null,
        atlChangePercentage: item.atl_change_percentage,
        atlDate: transformDate(item.atl_date),
    }));
}