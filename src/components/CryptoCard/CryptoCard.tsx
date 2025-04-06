import Chart from "../Chart/Chart.tsx";
import './CryptoCard.css'
import * as Dialog from "@radix-ui/react-dialog";


interface ICryptoCard {
    item: {
        name: string,
        id: string,
    },
    onClose: () => void,
    open: boolean,
}

export function CryptoCard ({item, onClose, open}: ICryptoCard) {
    return (
        <Dialog.Root open={open}>
            <Dialog.Overlay className="modal-overlay"></Dialog.Overlay>
            <Dialog.Content className="modal-content">
                <div>
                    <Dialog.Title className="modal-header">g{item.name}</Dialog.Title>
                    <div>
                        <Chart coin={item.id}/>
                    </div>
                </div>
                <Dialog.Close>
                    <button className="modal-close" onClick={onClose}>Close</button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    )
}