import React from "react";
import '../styles/css-components/square.css'

const Square = ({ value, onClick, isDarkMode}) => {
    const style = value === "X" ? "x_tile" : "o_tile";
    const themeModeClass = isDarkMode ? "dark-mode" : "light-mode";
    
    return (
        <button className={`square__tile ${themeModeClass}`} onClick={onClick}>
            <h3 className={style}>{value}</h3>
        </button>
    );
};

export default Square;