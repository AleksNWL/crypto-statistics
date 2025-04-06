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

export function transformData(data: responseCoingecko[]): dataUI[] {
    return data.map((item, index) => ({
        id: item.id,
        key: item.market_cap_rank ?? index + 1,
        name: item.name,
        symbol: item.symbol.toUpperCase(),
        logo: item.image,
        priceChangePercentage24h: item.price_change_percentage_24h !== null
            ? Number((item.price_change_percentage_24h).toFixed(2))
            : null,
        totalVolume: trasformBigSum(item.total_volume),
        currentPrice: item.current_price,
        marketCap: trasformBigSum(item.market_cap),
        priceChangeATL: item.atl_change_percentage,
        maxPrice24h: item.high_24h,
        minPrice24h: item.low_24h,
    }));
}