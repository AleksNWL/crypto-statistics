import axios from 'axios'
import {dataUI, responseCoingecko} from "../types/Coin.ts";


export function transformData(data: responseCoingecko[]): dataUI[] {
    return data.map((item, index) => ({
        key: item.market_cap_rank ?? index + 1,
        name: item.name,
        symbol: item.symbol.toUpperCase(),
        logo: item.image,
        totalVolume: item.total_volume,
        currentPrice: item.current_price,
        marketCap: item.market_cap,
        priceChange1h: item.price_change_percentage_1h_in_currency,
        priceChange24h: item.price_change_percentage_24h_in_currency,
        priceChange7d: item.price_change_percentage_7d_in_currency,
        priceChangeATL: item.atl_change_percentage,
        maxPrice24h: item.high_24h,
        minPrice24h: item.low_24h,
    }));
}

export async function getCoingeckoApi(page: number) {
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
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