


export function CryptoCard ({item, onClose}) {
    return (
        <div>
            <button onClick={onClose}>Close</button>
            <div>
                <h2>{item.name}</h2>
            </div>
        </div>
    )
}