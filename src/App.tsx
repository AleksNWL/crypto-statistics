import CryptoCards from "./components/CryptoCards/CryptoCards"
import "./App.css"
import Bitcoin from "./assets/bitcoin-svgrepo-com.svg"

const App = () => {
    return (
        <div className="main">
            <h1>Crypto Prices</h1>
            <CryptoCards/>
            <img className="bitcoin" src={Bitcoin} alt="Bitcoin" />
        </div>
    );
};

export default App;
