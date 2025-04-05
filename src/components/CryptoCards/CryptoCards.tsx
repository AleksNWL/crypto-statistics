import {getCoingeckoApi, transformData} from "../../api/mainDataCoin.ts";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {Loader} from "../Loader/Loader.tsx";
import {CryptoCard} from "../CryptoCard/CryptoCard.tsx";

function CryptoChart() {
    const [page, setPage] = useState<number>(1);
    const [selectedItem, setSelectedItem] = useState(null);

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["coingecko", page],
        queryFn: async () => transformData(await getCoingeckoApi(page)),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10
    })

    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
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
                        <th>Market Cap</th>
                        <th>Max price 24h</th>
                        <th>Min price 24h</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.key} onClick={() => setSelectedItem(item)}>
                            <td>{item.key}</td>
                            <td>
                                <img src={item.logo} alt="logotype" style={{ width: "20px" }} />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.symbol}</td>
                            <td>{item.currentPrice}</td>
                            <td>{item.marketCap}</td>
                            <td>{item.maxPrice24h}</td>
                            <td>{item.minPrice24h}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        }
            <div>
                <button onClick={() => page > 1 ? setPage(page-1) : setPage(page)}>-</button>
            </div>
            <div>{page}</div>
            <div>
                <button onClick={() => setPage(page+1)}>+</button>
            </div>

            {selectedItem &&
                (<CryptoCard item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}
        </div>
    );
}

export default CryptoChart;
