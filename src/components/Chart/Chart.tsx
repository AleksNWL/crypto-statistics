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
} from "chart.js";

import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';

// Регистрируем необходимые модули Chart.js
ChartJS.register(
    TimeScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface ChartProps {
    coin: string;
}

function Chart({ coin }: ChartProps) {
    const { data } = useQuery({
        queryKey: ["DataChart", coin],
        queryFn: async () => transformChartData(await dataChart(coin)),
        enabled: !!coin,
    });

    if (!data) return <div>Данные отстуствуют или загружаются</div>;

    const chartData = {
        datasets: [
            {
                label: `Цена ${coin}`,
                data: data.map((item: transformDataChart) => ({
                    x: item.timestamp,
                    y: item.price,
                })),
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Динамика цен: ${coin}`,
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
            },
            legend: {
                display: true,
                position: 'top' as const,
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
                    display: true,
                    text: "Дата",
                },
            },
            y: {
                type: "linear" as const,
                ticks: {
                    callback: (value: number | string) => `$${Number(value).toFixed(2)}`
                },
                title: {
                    display: true,
                    text: "Цена (USD)",
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
}

export default Chart;
