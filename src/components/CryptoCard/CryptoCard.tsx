import Chart from "../Chart/Chart.tsx";
import './CryptoCard.css'
import * as Dialog from "@radix-ui/react-dialog";
import {useState} from "react";

interface ICryptoCard {
    item: {
        name: string,
        id: string,
    },
    onClose: () => void,
    open: boolean,
}

export function CryptoCard ({item, onClose, open}: ICryptoCard) {
    const [intervalChart, setIntervalChart] = useState<string>("1");

    return (
        <Dialog.Root open={open}>
            <Dialog.Overlay className="modal-overlay"></Dialog.Overlay>
            <Dialog.Content className="modal-content">
                <div>
                    <select
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
                    <Dialog.Title className="modal-header">{item.name} {item.id}</Dialog.Title>
                    <div>
                        <Chart coin={item.id} intervalChart={intervalChart}/>
                    </div>
                </div>
                <Dialog.Close asChild>
                    <button className="modal-close" onClick={onClose}>Close</button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    )
}