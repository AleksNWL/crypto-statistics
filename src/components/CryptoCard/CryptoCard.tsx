import Chart from "../Chart/Chart.tsx";


export function CryptoCard ({item, onClose}) {
    console.log(item.name)
    console.log(item)
    console.log(item.id);
    return (
        <div>
            <button onClick={onClose}>Close</button>
            <div>
                <h2>{item.name}</h2>
                <div>
                    <Chart coin={item.id}/>
                </div>
            </div>
        </div>
    )
}