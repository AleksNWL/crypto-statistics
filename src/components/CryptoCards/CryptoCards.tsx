import {getCoingeckoApi, transformData} from "../../api/mainDataCoin.ts";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {Loader} from "../Loader/Loader.tsx";
import {CryptoCard} from "../CryptoCard/CryptoCard.tsx";
import "./CryptoCards.css"


function CryptoChart() {
    const [page, setPage] = useState<number>(1);
    const [selectedItem, setSelectedItem] = useState(null);

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["coingecko", page],
        queryFn: async () => transformData(await getCoingeckoApi(page)),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10
    })

    if (isError) return <div>Error: {error.message}</div>;

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
                        <th className="coin-mobile">Market Cap</th>
                        <th className="coin-mobile">Max price 24h</th>
                        <th className="coin-mobile">Min price 24h</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.key} onClick={() => setSelectedItem(item)}>
                            <td>{item.key}</td>
                            <td>
                                <img className="coin-logo" src={item.logo} alt="logotype" />
                            </td>
                            <td className="coin-name">{item.name}</td>
                            <td className="coin-name">{item.symbol}</td>
                            <td className="coin-name">{item.currentPrice}</td>
                            <td className="coin-mobile">{item.marketCap}</td>
                            <td className="coin-mobile">{item.maxPrice24h}</td>
                            <td className="coin-mobile">{item.minPrice24h}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        }
        <div className="page-container">
            <button className="page-button" onClick={() => page > 1 ? setPage(page-1) : setPage(page)}>-</button>
            <div>{page}</div>
            <button className="page-button" onClick={() => setPage(page+1)}>+</button>
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
