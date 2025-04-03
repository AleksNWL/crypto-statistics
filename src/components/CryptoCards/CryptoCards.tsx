import {getCoingeckoApi, transformData} from "../../api/coingeckoapi";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {Loader} from "../Loader/Loader.tsx";

function CryptoChart() {
    const [page, setPage] = useState(1);
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["coingecko", page],
        queryFn: async () => transformData(await getCoingeckoApi(page)),
    })

    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>{isLoading ? <Loader />
            :
            <table>
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
                        <tr key={item.key} onClick={() => console.log(item.key)}>
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
                <button onClick={() => page > 0 ? setPage(page-1) : setPage(page) }>-</button>
            </div>
            <div>
                <button onClick={() => setPage(page+1)}>+</button>
            </div>
        </div>
    );
}

export default CryptoChart;
