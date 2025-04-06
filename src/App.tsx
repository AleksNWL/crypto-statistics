import CryptoCards from "./components/CryptoCards/CryptoCards"
import "./App.css"
import Bitcoin from "./assets/bitcoin-svgrepo-com.svg"
import Chat from "./assets/chat.svg"
import CryptoChat from "./components/CryptoChat/CryptoChat";
import {useState} from "react";

const App = () => {
    const [selectedButtonChat, setSelectedButtonChat] = useState<boolean>(false);

    return (
        <div className="main">
            <img src={Chat} alt="chat" style={{width: 100, position: "fixed", top: "15px", right: "20px"}} onClick={() => setSelectedButtonChat(true)}/>
            <h1>Crypto Prices</h1>
            <CryptoCards/>

            {selectedButtonChat && <CryptoChat onClose={() => setSelectedButtonChat(false)} />}
            <img className="bitcoin" src={Bitcoin} alt="Bitcoin" />
        </div>
    );
};

export default App;
