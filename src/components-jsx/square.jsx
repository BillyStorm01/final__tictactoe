import React from "react";
import '../styles/css-components/square.css'

const Square = ({ value, onClick }) => {
    const style = value === "X" ? "x" : "o";
    return (
        <button className="square__tile" onClick={onClick}>
            <h2 className={style}>{value}</h2>
        </button>
    );
};

export default Square;