import { useState } from "react";

const TURNS = {
  X: "x",
  O: "o",
};

const Squared = ({ children, isSelected, updateBoard, index }) => {
  
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () =>{
    updateBoard(index)
  }
  
  return <div onClick={handleClick} className={className}>{children}</div>;
};


function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const updateBoard = (index) => {
    const newBoard = [...board]
    newBoard[index] = turn // x u o 
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Squared key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Squared>
          );
        })}
      </section>

      <section className="turn">
        <Squared isSelected={turn === TURNS.X}>{TURNS.X}</Squared>
        <Squared isSelected={turn === TURNS.O}>{TURNS.O}</Squared>
      </section>
    </main>
  );
}

export default App;
