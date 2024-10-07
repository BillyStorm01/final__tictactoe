import React, { useState, useEffect } from 'react';

// CSS Imports
import '../src/styles/modern-normalize.css';
import '../src/styles/App.css';
import '../src/styles/utils.css';

// Component Imports
import Scoreboard from './components-jsx/score-board.jsx';
import Board from '../src/components-jsx/board.jsx';
import ResetBtns from './components-jsx/reset-buttons.jsx';
import ThemeToggle from './components-jsx/theme-toggle.jsx';
import Footer from './components-jsx/footer.jsx';
import Confetti from './components-jsx/Confetti.jsx'; // Import the Confetti component

function App() {
  // States
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const [xPlayer, setXPlayer] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [Modal, showModal] = useState(false);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });

  // Handle Square Click
  const handleSquareClick = (index) => {
    const newBoard = board.slice();
    if (calculateWinner(newBoard) || newBoard[index]) return;
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXisNext(!xIsNext);
  };

  // Reset Game Board
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXisNext(true);
    showModal(false);
    setXPlayer(true);
  };

  //Reset Score Board 
  const resetScore = () => {
    setBoard(Array(9).fill(null));
    setXisNext(true);
    showModal(false);
    setXPlayer(true);
    setScores({ xScore: 0, oScore: 0 })
  };

  // Theme useEffect
  useEffect(() => {
    if (!isDarkMode) {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    }
  }, [isDarkMode]);

  // Theme Toggle Button
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Winner and Status
  const winner = calculateWinner(board);

  useEffect(() => {
    if (winner) {
      if (winner === 'X') {
        let xScore = scores.xScore + 1;
        setScores({ ...scores, xScore });
      } else if (winner === 'O') {
        let oScore = scores.oScore + 1;
        setScores({ ...scores, oScore });
      }
      showModal(true);
    }
  }, [winner]);

  const status = winner ? `${winner} WINS!` : `${xIsNext ? 'X' : 'O'}'s Turn`;
  const statusColor = winner
    ? winner === 'X'
      ? 'var(--clr-rose)'
      : 'var(--clr-indigo)'
    : xIsNext
      ? 'var(--clr-rose)'
      : 'var(--clr-indigo)';

  const modalStyle = winner === 'X' ? 'btn' : 'btn2';

  // HTML
  return (
    <div className='game__container'>
      {Modal && (
        <div className='Modal'>
          <h1 className='modal__text'>Good Game,</h1>
          <h1 className='modal__text'>{`Player ${winner} Won!`}</h1>
          <button className={modalStyle} onClick={resetGame}>
            Rematch?
          </button>
        </div>
      )}
      <Scoreboard scores={scores} setXPlayer={xPlayer} />
      <h1 className='status' style={{ color: statusColor }}>
        {status}
      </h1>
      <Board squares={board} onClick={handleSquareClick} isDarkMode={isDarkMode} />
      {winner && <Confetti />}
      <ResetBtns resetGame={resetGame} resetScore={resetScore}/>
      <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <Footer />
    </div>
  );
}

// Calculate Winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default App;
