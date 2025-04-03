import React from "react";
import CryptoList from "./components/CryptoList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <h1>Crypto Prices</h1>
                <CryptoList />
            </div>
        </QueryClientProvider>
    );
};

export default App;
