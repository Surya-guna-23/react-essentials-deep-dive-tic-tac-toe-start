export default function Gameboard({ onselectplayer, gameboard }) {
  // function handleselect(rowindex, colindex) {
  //   setgameboard((previouboard) => {
  //     const updateboard = [
  //       ...previouboard.map((innerelement) => [...innerelement]),
  //     ];
  //     updateboard[rowindex][colindex] = activeplayersymbol;
  //     return updateboard;
  //   });

  //   onselectplayer();
  // }
  return (
    <ol id="game-board">
      {gameboard.map((row, rowindex) => (
        <li key={rowindex}>
          <ol>
            {row.map((playersymbol, colindex) => (
              <li key={colindex}>
                <button
                  onClick={() => onselectplayer(rowindex, colindex)}
                  disabled={playersymbol !== null}
                >
                  {playersymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
