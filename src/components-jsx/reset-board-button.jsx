import React from "react";
import '../styles/css-components/reset-board-btn.css'

const ResetBoardBtn = ( {resetGame} ) => {
    return(
        <div className=" reset__btns container">
        <button onClick={resetGame} className='board__reset-btn btn'>Reset Board</button>
        <button className="btn">Reset Scores</button>
        </div>
    );
}

export default ResetBoardBtn;