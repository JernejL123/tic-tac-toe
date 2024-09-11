import React, { useState } from "react";

function TicTacToe() {

    const [board, setBoard] = useState(Array(9).fill(null));
    const [isX, setIsX] = useState(true);
    const [gameState, setGameState] = useState('START MOVE:❌');

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = (boardToCheck) => {
        for (let [a, b, c] of winningCombinations) {
            if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
                return boardToCheck[a];
            }
        }
        return null;
    };

    const handleClick = (index) => {

        if (board[index] !== null || gameState.includes('WINNER')) return;
        const newBoard = [...board];
        newBoard[index] = isX ? '❌' : '⭕';
        setBoard(newBoard);

        const winner = checkWinner(newBoard);

        if (winner === '❌') {
            setGameState("WINNER IS: ❌");
        } else if (winner === '⭕') {
            setGameState("WINNER IS: ⭕");
        } else if (newBoard.every(cell => cell !== null)) {
            setGameState('DRAW');
        }
        else {
            setIsX(!isX);
            setGameState(isX ? "NEXT MOVE: ⭕" : "NEXT MOVE: ❌");
        }
    };

    const resetBoard = () => {
        setBoard(Array(9).fill(null));
        setGameState('START MOVE:❌')
        setIsX(true);
    };

    return (
        <div className="grid">
            {board.map((cellContent, index) => (
                <button
                    className="play-field"
                    key={index}
                    onClick={() => handleClick(index)}
                >
                    {cellContent}
                </button>
            ))}
            <button className="reset-button" onClick={resetBoard}>RESET</button>
            <p className="game-state">{gameState}</p>
        </div>
    );
}

export default TicTacToe;
