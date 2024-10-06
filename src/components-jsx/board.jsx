import React from "react";

//Components
import Square from "../components-jsx/square.jsx";

//Styles
import '../styles/css-components/board.css'

const Board = ({ squares, onClick, isDarkMode }) => {
    return (
        <div className="board container">
            {squares.map((square, index) => (
                <Square key={index} value={square} onClick={() => onClick(index)} isDarkMode={isDarkMode} />
            ))}
        </div>
    );
};

export default Board;