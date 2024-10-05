import React from "react";

//Components
import Square from "../components-jsx/square.jsx";

//Styles
import '../styles/css-components/board.css'

const Board = ({ squares, onClick }) => {
    return (
        <div className="board">
            {squares.map((square, index) => (
                <Square key={index} value={square} onClick={() => onClick(index)} />
            ))}
        </div>
    );
};

export default Board;