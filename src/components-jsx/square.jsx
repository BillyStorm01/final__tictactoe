import React from "react";
import '../styles/css-components/square.css'

const Square = ({ value, onClick, isDarkMode}) => {
    const style = value === "X" ? "x" : "o";
    const themeModeClass = isDarkMode ? "dark-mode" : "light-mode";
    
    return (
        <button className={`square__tile ${themeModeClass}`} onClick={onClick}>
            <h2 className={style}>{value}</h2>
        </button>
    );
};

export default Square;