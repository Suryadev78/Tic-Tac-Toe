"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

type Player = "X" | "O" | null;

interface SquareProps {
  value: Player;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => (
  <motion.button
    className="w-16 h-16 bg-white border-2 border-gray-300 rounded-lg text-4xl font-bold text-gray-800 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {value && (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {value}
      </motion.span>
    )}
  </motion.button>
);

export default function TicTacToe() {
  const [squares, setSquares] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player>(null);

  useEffect(() => {
    const calculatedWinner = calculateWinner(squares);
    setWinner(calculatedWinner);
  }, [squares]);

  const handleClick = (i: number) => {
    if (winner || squares[i]) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i: number) => (
    <Square value={squares[i]} onClick={() => handleClick(i)} />
  );

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (squares.every(Boolean)) {
      return "It's a draw!";
    } else {
      return `Next player: ${xIsNext ? "X" : "O"}`;
    }
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Tic Tac Toe
        </h1>
        <div className="w-52 grid grid-cols-3 gap-1 mb-4 justify-items-center justify-center">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex justify-center items-center">
              {renderSquare(i)}
            </div>
          ))}
        </div>
        <div className="text-xl font-semibold text-center mb-4 text-gray-700">
          {getStatus()}
        </div>
        <Button onClick={restartGame} className="w-full">
          Restart Game
        </Button>
      </Card>
    </div>
  );
}

function calculateWinner(squares: Player[]): Player {
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
}
