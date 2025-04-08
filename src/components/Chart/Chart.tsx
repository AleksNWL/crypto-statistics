import { transformDataChart } from "../../types/ChartData.ts";
import { useQuery } from "@tanstack/react-query";
import { dataChart, transformChartData } from "../../api/mounthDataCoin.ts";
import {
    Chart as ChartJS,
    TimeScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TooltipItem
} from "chart.js";

import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import './Chart.css';
import Loader from "../Loader/Loader.tsx";

ChartJS.register(
    TimeScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface ChartProps {
    coin: string;
    intervalChart: string;
}

function Chart({ coin, intervalChart }: ChartProps) {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["DataChart", coin, intervalChart],
        queryFn: async () => transformChartData(await dataChart(coin, intervalChart)),
        enabled: !!coin,
    });

    if (isLoading) return <Loader/>;
    if (isError) return <div>{error.message}</div>;
    if (!data) return <div className="chart-wrapper">Данные отсутствуют ;(</div>;

    const firstPrice: number = data[0]?.price;
    const lastPrice: number = data[data.length - 1]?.price;
    const isPositive: boolean = lastPrice >= firstPrice;
    const differencePrice: string = lastPrice > 10 ? (lastPrice - firstPrice).toFixed(2) : (lastPrice - firstPrice).toFixed(10);
    const percentageDifference: string = ((Number(differencePrice) * 100) / firstPrice).toFixed(2);


    const chartData = {
        datasets: [
            {
                label: `Price ${coin}`,
                data: data.map((item: transformDataChart) => ({
                    x: item.timestamp,
                    y: item.price,
                })),
                backgroundColor: isPositive
                    ? "rgba(59, 255, 186, 0.2)"
                    : "rgba(255,59,59,0.2)",
                borderColor: isPositive
                    ?"rgb(59, 255, 186)"
                    :"rgb(255,59,59)",
                fill: 'start' as const,

                pointRadius: 0,
                pointHoverRadius: 0,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                callbacks: {
                    label: function (context: TooltipItem<"line">): string {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y;

                        let formattedValue = value.toFixed(8);
                        if (value >= 1) {
                            formattedValue = value.toFixed(4);
                        }
                        if (value >= 100) {
                            formattedValue = value.toFixed(2);
                        }
                        return `${label}: $${formattedValue}`;
                    }
                }
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                type: "time" as const,
                time: {
                    unit: "day" as const,
                    tooltipFormat: "HH:mm dd.MM.yyyy",
                },
                title: {
                    display: false,
                },
                ticks: {
                    color: "#ffffff",
                },
                grid: {
                    display: false,
                }
            },
            y: {
                type: "linear" as const,
                ticks: {
                    callback: (value: number | string) => {
                        const num = Number(value);
                        return num > 1 ? `$${num.toFixed(2)}` : `$${num}`;
                    },
                    color: "#ffffff",
                },
                title: {
                    display: false,
                },
                grid: {
                    display: false,
                }
            },
        },
    };


    return (
        <div className="chart-wrapper">
            {Number(percentageDifference) >= 0
                ? <div className="positive position-difference-price">
                    <span>{percentageDifference}%</span>
                    <br/>
                    <span>{differencePrice}$</span>
                </div>
                : <div className="negative position-difference-price">
                    <span>{percentageDifference}%</span>
                    <br/>
                    <span>{differencePrice}$</span>
                </div>}
            <Line data={chartData} options={options} />
        </div>
    );
}

export default Chart;
