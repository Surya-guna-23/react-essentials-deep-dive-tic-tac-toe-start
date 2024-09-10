import Player from "./components/Playerinfo";
import Gameboard from "./components/Gameboard";
import { useState } from "react";
import Log from "./components/Log";
import Gameover from "./components/Gameover";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const Players = {
  X: "Player1",
  O: "Player2",
};
const initalgamboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveactiveplayer(gameturns) {
  let currenturns = "X";
  if (gameturns.length > 0 && gameturns[0].player === "X") {
    currenturns = "O";
  }
  return currenturns;
}

function derivegameboard(gameturns) {
  let gameboard = [...initalgamboard.map((array) => [...array])];
  for (const turn of gameturns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameboard[row][col] = player;
  }
  return gameboard;
}

function derivewinner(gameboard, player) {
  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstsquaresymbol =
      gameboard[combinations[0].row][combinations[0].column];
    const secondsquaresymbol =
      gameboard[combinations[1].row][combinations[1].column];
    const thirdsquaresymbol =
      gameboard[combinations[2].row][combinations[2].column];
    if (
      firstsquaresymbol &&
      firstsquaresymbol === secondsquaresymbol &&
      firstsquaresymbol === thirdsquaresymbol
    ) {
      winner = player[firstsquaresymbol];
    }
  }
  return winner;
}

function App() {
  const [player, setplayer] = useState(Players);
  const [gameturns, setgameturns] = useState([]);
  // const [activeplayer, setactiveplayer] = useState("X");
  const activeplayer = deriveactiveplayer(gameturns);
  const gameboard = derivegameboard(gameturns);
  const winner = derivewinner(gameboard, player);

  const draw = gameturns.length === 9 && !winner;
  function handleselectplayer(rowindex, colindex) {
    // setactiveplayer((curactiveplayer) => (curactiveplayer === "X" ? "O" : "X"));

    setgameturns((pervturns) => {
      let currenturns = deriveactiveplayer(pervturns);

      const updateturns = [
        { square: { row: rowindex, col: colindex }, player: currenturns },
        ...pervturns,
      ];
      return updateturns;
    });
  }
  function handlesetplayer(symbol, newname) {
    setplayer((prevplayer) => ({
      ...prevplayer,
      [symbol]: newname,
    }));
  }
  function handlerestart() {
    setgameturns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol className="highlight-player" id="players">
          <Player
            initialname={Players.X}
            symbol="X"
            isactive={activeplayer === "X"}
            onchangedname={handlesetplayer}
          />
          <Player
            initialname={Players.O}
            symbol="O"
            isactive={activeplayer === "O"}
            onchangedname={handlesetplayer}
          />
        </ol>
        {(winner || draw) && (
          <Gameover winner={winner} onrestart={handlerestart} />
        )}
        <Gameboard onselectplayer={handleselectplayer} gameboard={gameboard} />
      </div>
      <Log turns={gameturns} />
    </main>
  );
}

export default App;
