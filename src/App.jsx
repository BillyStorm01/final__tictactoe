import React, { useState, useEffect } from 'react';

//CSS Imports
import '../src/styles/modern-normalize.css'
import '../src/styles/App.css'
import '../src/styles/utils.css'


//Component Imports
import Board from '../src/components-jsx/board.jsx'
import ResetBoardBtn from './components-jsx/reset-board-button.jsx';
import ThemeToggle from './components-jsx/theme-toggle.jsx';

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const [playerStatus, setPlayerStatus] = useState('Next player: X')
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleSquareClick = (index) => {
    const newBoard = board.slice();
    if (calculateWinner(newBoard) || newBoard[index]) return;
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXisNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setXisNext(true)
    setPlayerStatus('Next player: X')
  }


  useEffect(() => {
    if (!isDarkMode) {
      document.body.classList.add('light-mode')
      document.body.classList.remove('dark-mode')
    } else {
      document.body.classList.add('dark-mode')
      document.body.classList.remove('light-mode')
    }
  }, [isDarkMode]);


  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };


  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className='game__container'>
      <h1>{status}</h1>
      <Board squares={board} onClick={handleSquareClick} />
      <ResetBoardBtn resetGame={resetGame}/>
      <ThemeToggle toggleTheme={toggleTheme}/>
    </div>
  )
}

//Calculating Winner Logic
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
