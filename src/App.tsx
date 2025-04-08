import CryptoCards from "./components/CryptoCards/CryptoCards"
import "./App.css"
import Chat from "./assets/chat.svg"
import CryptoChat from "./components/CryptoChat/CryptoChat";
import {useState} from "react";
import StarryBackground from "./components/StarryBackground.tsx";


const App = () => {
    const [selectedButtonChat, setSelectedButtonChat] = useState<boolean>(false);

    return (
        <div className="main">
            <img className="logo-chat" src={Chat} alt="chat" onClick={() => setSelectedButtonChat(true)}/>
            <h1>Crypto Prices</h1>
            <CryptoCards/>
            <StarryBackground/>
            {selectedButtonChat && <CryptoChat onClose={() => setSelectedButtonChat(false)} />}
        </div>
    );
};

export default App;
