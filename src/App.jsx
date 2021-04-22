import { useState, useEffect } from "react";
import "./styles/Global.css";

function App() {
  const [draw, setDraw] = useState(null);
  const [winsX, setwinsX] = useState(null);
  const [winsO, setwinsO] = useState(null);
  const [current, setCurrent] = useState("X");

  const EmpetyBoard = Array(9).fill("");
  const [board, setBoard] = useState(EmpetyBoard);

  const handlePlay = ({ index: i }, ...props) => {
    if (board[i] !== "") {
      console.log("posição ocupada");
      return null;
    }
    setBoard(
      board.map((field, indexField) => (indexField === i ? current : field))
    );
    setCurrent(current === "X" ? "O" : "X");
  };

  const checkWinner = () => {
    const posiblesWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    posiblesWin.forEach((posible) => {
      const WinnerX = posible.every((fields) => fields === "X");
      const WinnerO = posible.every((fields) => fields === "O");

      if (WinnerO) {
        setwinsO(winsO + 1);
        setBoard(EmpetyBoard);
        return null;
      }
      if (WinnerX) {
        setwinsX(winsX + 1);
        setBoard(EmpetyBoard);
        return null;
      }
    });
    checkDraw();
  };

  const checkDraw = () => {
    if (board.every((field) => field !== "")) {
      setDraw(draw + 1);
      setBoard(EmpetyBoard);
    }
  };

  useEffect(() => {
    checkWinner();
  }, [board]);

  return (
    <div className="App">
      <div className="Board">
        {board.map((field, index) => {
          return (
            <div
              className="Field"
              key={index}
              onClick={() => handlePlay({ index })}
            >
              <span className={`field.${field}`}>{field}</span>
            </div>
          );
        })}
      </div>
      <div className="StatsBar">
        <span>Draw: {draw}</span>
        <span>Wins X: {winsX}</span>
        <span>Wins O: {winsO}</span>
      </div>
    </div>
  );
}

export default App;
