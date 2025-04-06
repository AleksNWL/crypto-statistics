import {getCoingeckoApi, transformData} from "../../api/mainDataCoin.ts";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import Loader from "../Loader/Loader.tsx";
import {CryptoCard} from "../CryptoCard/CryptoCard.tsx";
import "./CryptoCards.css"
import {dataUI} from "../../types/Coin.ts";


function CryptoChart() {
    const [page, setPage] = useState<number>(1);
    const [order, setOrder] = useState<string>("market_cap_desc");
    const [selectedItem, setSelectedItem] = useState<dataUI | null>(null);


    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["coingecko", page, order],
        queryFn: async () => transformData(await getCoingeckoApi(page, order)),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10
    })

    if (isError) return <div>Error: {error.message}</div>;

    const toggleSort = (currentOrder: string, sort: string) => {
        const isAsc = currentOrder === `${sort}_asc`;
        return isAsc ? `${sort}_desc` : `${sort}_asc`;
    }
    console.log(data)
    return (
        <div className="CryptoCards">
            {isLoading
            ? <Loader />
            : <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Logotype</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Change 24h</th>
                        <th className="coin-mobile sort-button" onClick={() => setOrder(toggleSort(order, "market_cap"))}>
                            Market Cap {order.includes("market_cap") && order.endsWith("asc") ? "▲" : "▼"}
                        </th>
                        <th className="coin-mobile sort-button" onClick={() => setOrder(toggleSort(order, "volume"))}>
                            Volume 24h {order.includes("volume") && order.endsWith("asc") ? "▲" : "▼"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(item => (
                        <tr key={item.key} onClick={() => setSelectedItem(item)}>
                            <td>{item.key}</td>
                            <td>
                                <img className="coin-logo" src={item.logo} alt="logotype" />
                            </td>
                            <td className="coin-name">{item.name}</td>
                            <td className="coin-name">{item.symbol}</td>
                            <td className="coin-name">{item.currentPrice}</td>
                            <td className={item.priceChangePercentage24h === null ? "neutral" : item.priceChangePercentage24h < 0 ? "negative" : "positive"}>
                                {item.priceChangePercentage24h != null ? `${item.priceChangePercentage24h}%` : "N/A"}
                            </td>
                            <td className="coin-mobile">{item.marketCap}</td>
                            <td className="coin-mobile">{item.totalVolume}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        }
        <div className="page-container">
            <div className="page-button" onClick={() => page > 1 ? setPage(page-1) : setPage(page)}>«</div>
            <div>{page}</div>
            <div className="page-button" onClick={() => setPage(page+1)}>»</div>
        </div>

            {selectedItem && (
                <CryptoCard
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    open={!!selectedItem}
                />
            )}
        </div>
    );
}

export default CryptoChart;
