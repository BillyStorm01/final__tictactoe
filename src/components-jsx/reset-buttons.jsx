import React from "react";
import '../styles/css-components/reset-buttons.css'

const ResetBtns = ({resetGame , resetScore}) => {
    return(
        <div className=" reset__btns container">
        <button onClick={resetGame} className='board__reset-btn btn'>Reset Board</button>
        <button onClick={resetScore} className="score__reset-btn btn2">Reset Scores</button>
        </div>
    );
}

export default ResetBtns;