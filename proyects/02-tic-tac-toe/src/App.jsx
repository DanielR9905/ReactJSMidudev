import { useState } from "react";

const TURNS = {
  X: "x",
  O: "o",
};

const Squared = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const [winner, setWinner] = useState(null); //Null es que no hay ganador, false es que hay un empate

  const checkWinner = (boardToCheck) => {
    //Revisamos todas la combinaciones ganadoras
    //Para ver si x u o
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] && //0 -> x u o
        boardToCheck[a] === boardToCheck[b] && //0 y 3 -> x -> x u o -> o
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
      //Si no hay ganador
      return null;
    }
  };

  const updateBoard = (index) => {
    //No actualizamos esta posicion
    //Si ya tiene algo
    if (board[index] || winner) return;
    //Actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn; // x u o
    setBoard(newBoard);
    //Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //Revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner) //Actualiza el estado
      alert('El ganador es: ' + newWinner)
    }
  };

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
