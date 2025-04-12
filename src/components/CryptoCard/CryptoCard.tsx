import Chart from "../Chart/Chart.tsx";
import './CryptoCard.scss'
import * as Dialog from "@radix-ui/react-dialog";
import {useState} from "react";
import {dataUI} from "../../types/Coin.ts";
import {transformNumber} from "../../api/mainDataCoin.ts";

interface ICryptoCard {
    item: dataUI,
    onClose: () => void,
    open: boolean,
}

export function CryptoCard ({item, onClose, open}: ICryptoCard) {
    const [intervalChart, setIntervalChart] = useState<string>("1");
    const percentage: number = (item.totalSupply / item.maxSupply) * 100;
    const progressBarColor: string = percentage >= 90 ? "#FF3B3BFF" : item.totalSupply >= 75 ? "#FFD83BFF" : "#3BFFBAFF";

    return (
        <Dialog.Root open={open}>
            <Dialog.Overlay className="card-overlay"></Dialog.Overlay>
            <Dialog.Content className="card-content">
                <div>
                    <Dialog.Title className="card-header">
                        <div>{item.symbol}</div>
                        <div>{item.name} </div>
                        <img style={{width: "3rem"}} src={item.logo} alt="logo" /></Dialog.Title>
                    <div>

                        <div className="data-coin">
                            <div className="price-container container-data">
                                <h2 className="price-header">Current Price</h2>
                                <div className="price container-inner">
                                    <span style={{textDecoration: "underline", fontWeight: "bold"}}>${item.currentPrice}</span>
                                    {item.priceChangePercentage24h === null
                                        ? <>
                                            <span className="neutral"><span className="bold">24h</span> N/A</span>
                                            <span className="neutral"><span className="bold">24h</span> N/A %</span>
                                        </>
                                        : (item.priceChangePercentage24h === 0)
                                            ? <>
                                                <span className="neutral"><span className="bold">24h</span> ${item.priceChange24h}</span>
                                                <span className="neutral">{item.priceChangePercentage24h} %</span>
                                            </>
                                            : (item.priceChangePercentage24h > 0)
                                                ? <>
                                                    <span className="positive"><span className="bold">24h</span> +${item.priceChange24h}</span>
                                                    <span className="positive"><span className="bold">24h</span> +{item.priceChangePercentage24h}%</span>
                                                </>
                                                    : <>
                                                        <span className="negative"><span className="bold">24h</span> ${item.priceChange24h}</span>
                                                        <span className="negative"><span className="bold">24h</span> {item.priceChangePercentage24h}%</span>
                                                    </>
                                    }
                                </div>
                            </div>

                            <div className="difference-price container-data">
                                <h2 className="difference-price-header">Difference Price 24h</h2>
                                <div className="difference-price container-inner">
                                    <div className="difference-price-low">
                                        <h3 className="difference-price-headers bold">Low</h3>
                                        <div className="difference-price-low">${transformNumber(item.minPrice24h)}</div>
                                    </div>
                                    <div className="difference-price-high">
                                        <h3 className="difference-price-headers bold">High</h3>
                                        <div className="difference-price-high">${transformNumber(item.maxPrice24h)}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="market-cap-container container-data">
                                <h2 className="market-cap-header">Market Cap</h2>
                                <div className="market-cap container-inner">
                                    <span style={{textDecoration: "underline", fontWeight: "bold"}}>{item.marketCap}</span>
                                    <span><span className="bold">24h</span> {transformNumber(item.marketCapChange24h)}</span>
                                    <span><span className="bold">24h%</span> {item.marketCapChangePercentage24h.toFixed(2)}%</span>
                                </div>
                            </div>

                            <div className="container-data">
                                <h2>Total Volume</h2>
                                <div className="container-inner">${item.totalVolume}</div>
                            </div>

                            <div className="all-time-container container-data">
                                <h2 className="all-time">All-Time Price</h2>
                                <div className="all-time-value container-inner">
                                    <div className="all-time-l-h">
                                        <div className="all-time-l">
                                            <span className="all-time-header bold">Lower</span>
                                            {Number(item.atlChangePercentage.toFixed(2)) === 0
                                                ? <>
                                                    <span className="neutral">${transformNumber(item.atl)}</span>
                                                    <span className="neutral">{item.atlChangePercentage.toFixed(2)}%</span>
                                                </>
                                                : (Number(item.atlChangePercentage.toFixed(2)) > 0)
                                                    ? <>
                                                        <span className="positive">+${transformNumber(item.atl)}</span>
                                                        <span className="positive">+{item.atlChangePercentage.toFixed(2)}%</span>
                                                    </>
                                                    : <>
                                                        <span className="negative">${transformNumber(item.atl)}</span>
                                                        <span className="negative">{item.atlChangePercentage.toFixed(2)}%</span>
                                                    </>
                                            }
                                            <span>{item.atlDate}</span>
                                        </div>
                                        <div className="all-time-h">
                                            <span className="all-time-header bold">High</span>
                                            {Number(item.athChangePercentage.toFixed(2)) === 0
                                                ? <>
                                                    <span className="neutral">${transformNumber(item.ath)}</span>
                                                    <span className="neutral">{item.athChangePercentage.toFixed(2)}%</span>
                                                </>
                                                : (Number(item.athChangePercentage.toFixed(2)) > 0)
                                                    ? <>
                                                        <span className="positive">${transformNumber(item.ath)}</span>
                                                        <span className="positive">{item.athChangePercentage.toFixed(2)}%</span>
                                                    </>
                                                    : <>
                                                        <span className="negative">${transformNumber(item.ath)}</span>
                                                        <span className="negative">{item.athChangePercentage.toFixed(2)}%</span>
                                                    </>
                                            }
                                            <span>{item.athDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container-data">
                                <h2>FDV</h2>
                                <div className="container-inner">{item.fullyDilutedValuation}</div>
                            </div>
                        </div>

                        <div className="progress-container">
                            <div className="progress-header">
                                <span>{item.name} Emission Progress:</span>
                            </div>

                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${percentage}%`,
                                        backgroundColor: progressBarColor
                                    }}
                                    aria-valuenow={percentage}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                ></div>
                            </div>

                            <div className="progress-labels">
                                <span>{percentage.toFixed(2)}%</span>
                                <span className="progress-label">Circulating: {transformNumber(item.circulatingSupply)} {item.name}</span>
                                <span>Max: {item.maxSupply}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Chart coin={item.id} intervalChart={intervalChart}/>
                    </div>
                </div>
                <div className="card-control">
                    <select
                        className="select-time"
                        value={intervalChart}
                        onChange={(evt) => setIntervalChart(evt.target.value)}
                    >
                        <option value="1">24hours</option>
                        <option value="7">7days</option>
                        <option value="14">14days</option>
                        <option value="90">90days</option>
                        <option value="180">180days</option>
                        <option value="365">1year</option>
                    </select>
                    <Dialog.Close asChild>
                        <button className="card-close" onClick={onClose}>Close</button>
                    </Dialog.Close>
                </div>
                <Dialog.Description className="card-description">
                    Детали криптовалюты {item.name}
                </Dialog.Description>
            </Dialog.Content>
        </Dialog.Root>
    )
}