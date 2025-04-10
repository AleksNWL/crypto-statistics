import "./Loader.scss";

export default function Loader(){
    return (
        <div className="loader">
            <span className="spinner"></span>
            <span className="loader-message">Loading...</span>
        </div>
    );
};