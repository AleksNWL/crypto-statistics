import React from 'react';
import "./Loader.css";

type Loader = {
    message: string | undefined;
};

export const Loader: React.FC<Loader> = ({ message }) => {
    return (
        <div className="loader">
            <span className="spinner"></span>
            <span className="loader-message">{message}</span>
        </div>
    );
};