import axios from "axios";
import {chartData, transformDataChart} from "../types/ChartData.ts";


export async function dataChart(coin: string, intervalChart: string) {
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart`, {
        params: {
            vs_currency: "usd",
            days: intervalChart,
        }
    });
    return data;
}

export function transformChartData(data: chartData): transformDataChart[] {
    return data.prices.map((price, i) => ({
        timestamp: new Date(price[0]),
        price: price[1],
        marketCap: data.market_caps[i]?.[1] ?? 0,
        totalVolume: data.total_volumes[i]?.[1] ?? 0,
    }));
}