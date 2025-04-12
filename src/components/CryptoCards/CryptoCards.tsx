import {getCoingeckoApi, transformData} from "../../api/mainDataCoin.ts";
import {useQuery} from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import {useState} from "react";
import {CryptoCard} from "../CryptoCard/CryptoCard.tsx";
import "./CryptoCards.scss"
import {dataUI} from "../../types/Coin.ts";


function CryptoChart() {
    const [page, setPage] = useState<number>(1);
    const [order, setOrder] = useState<string>("market_cap_desc");
    const [selectedItem, setSelectedItem] = useState<dataUI | null>(null);
    const [countPages, setCountPages] = useState<string>("10");


    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["coingecko", page, order, countPages],
        queryFn: async () => transformData(await getCoingeckoApi(page, order, countPages)),
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
            ? <div className="background-table">
                <div>
                    <select className="select-count-cards" value={countPages} onChange={(e) => setCountPages(e.target.value)}>
                        <option className="option-count-cards" value={"10"}>10</option>
                        <option className="option-count-cards" value={"50"}>50</option>
                        <option className="option-count-cards" value={"100"}>100</option>
                        <option className="option-count-cards" value={"250"}>250</option>
                    </select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="coin-mobile">#</th>
                            <th>Logo</th>
                            <th>Name</th>
                            <th className="coin-mobile">Symbol</th>
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
                    {[...Array(Number(countPages))].map((_, index) => (
                        <tr key={index}>
                            <td className="coin-mobile"><Skeleton
                                width={20}
                                baseColor="#79a6c8"
                                highlightColor="#256a85"
                                duration={5}
                            /></td>
                            <td><Skeleton
                                circle
                                height={32}
                                width={32}
                                baseColor="#79a6c8"
                                highlightColor="#256a85"
                                duration={5}
                            /></td>
                            <td><Skeleton
                                width={70}
                                baseColor="#79a6c8"
                                highlightColor="#256a85"
                                duration={5}
                            /></td>
                            <td className="coin-mobile"><Skeleton
                                width={50}
                                baseColor="#79a6c8"
                                highlightColor="#256a85"
                                duration={5}
                            /></td>
                            <td><Skeleton
                                width={60}
                                baseColor="#79a6c8"
                                highlightColor="#256a85"
                                duration={5}
                            /></td>
                            <td><Skeleton
                                width={80}
                                baseColor="#79a6c8"
                                highlightColor="#256a85"
                                duration={5}
                            /></td>
                            <td className="coin-mobile"><Skeleton
                                width={100}
                                baseColor="#79a6c8"
                                highlightColor="#256a85"
                                duration={5} /></td>
                            <td className="coin-mobile"><Skeleton
                                width={100}
                                baseColor="#79a6c8"
                                highlightColor="#256a85"
                                duration={5}
                            /></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            : <div className="background-table">
                <div>
                    <select className="select-count-cards" value={countPages} onChange={(e) => setCountPages(e.target.value)}>
                        <option className="option-count-cards" value={"10"}>10</option>
                        <option className="option-count-cards" value={"50"}>50</option>
                        <option className="option-count-cards" value={"100"}>100</option>
                        <option className="option-count-cards" value={"250"}>250</option>
                    </select>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th className="coin-mobile">#</th>
                        <th>Logo</th>
                        <th>Name</th>
                        <th className="coin-mobile">Symbol</th>
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
                            <td className="coin-mobile">{item.key}</td>
                            <td>
                                <img className="coin-logo" src={item.logo} alt="logotype" />
                            </td>
                            <td className="coin-name">{item.name}</td>
                            <td className="coin-mobile">{item.symbol}</td>
                            <td className="coin-price">{item.currentPrice}</td>
                            <td className={item.priceChangePercentage24h === null ? "neutral" : item.priceChangePercentage24h < 0 ? "negative" : "positive"}>
                                {item.priceChangePercentage24h != null ? `${item.priceChangePercentage24h}%` : "N/A"}
                            </td>
                            <td className="coin-mobile">{item.marketCap}</td>
                            <td className="coin-mobile">{item.totalVolume}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
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
