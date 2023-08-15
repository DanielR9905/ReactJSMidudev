import { useState } from "react";

const TURNS = {
  X: "x",
  O: "o",
};

const Squared = ({ children, updateBoard, index }) => {
  return <div className="square">{children}</div>;
};
function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  console.log(board);
  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Squared key={index} index={index}>

            </Squared>
          );
        })}
      </section>
    </main>
  );
}

export default App;
