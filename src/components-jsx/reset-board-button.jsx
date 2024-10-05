import React from "react";
import '../styles/css-components/reset-board-btn.css'

const ResetBoardBtn = ( {resetGame} ) => {
    return(
        <button onClick={resetGame} className='board__reset-btn btn'>Reset</button>
    );
}

export default ResetBoardBtn;