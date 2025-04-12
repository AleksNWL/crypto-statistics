import CryptoCards from "./components/CryptoCards/CryptoCards"
import "./App.css"
import Chat from "./assets/chat.svg"
import CryptoChat from "./components/CryptoChat/CryptoChat";
import {useState} from "react";
import StarryBackground from "./components/StarryBackground/StarryBackground.tsx";


const App = () => {
    const [selectedButtonChat, setSelectedButtonChat] = useState<boolean>(false);

    return (
        <div>
            <StarryBackground/>
            <div className="main">
                <img className="logo-chat" src={Chat} alt="chat" onClick={() => setSelectedButtonChat(true)}/>
                <h1 style={{paddingBottom: "1rem"}}>Crypto Prices</h1>
                <CryptoCards/>
                {selectedButtonChat && <CryptoChat onClose={() => setSelectedButtonChat(false)} />}
            </div>
        </div>
    );
};

export default App;
