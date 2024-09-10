import { useState } from "react";
export default function Player({
  initialname,
  symbol,
  isactive,
  onchangedname,
}) {
  const [playername, setplayername] = useState(initialname);
  const [isEditing, Setisediting] = useState(false);
  function handleclick() {
    Setisediting((editing) => !editing);
    if (isEditing) {
      onchangedname(symbol, playername);
    }
  }
  function handlename(event) {
    setplayername(event.target.value);
  }

  let editableplayername = <span className="player-name"> {playername}</span>;

  if (isEditing) {
    editableplayername = (
      <input type="text" required value={playername} onChange={handlename} />
    );
  }

  return (
    <li className={isactive ? "active" : undefined}>
      <span className="player">
        {editableplayername}
        <span className="player-symbol"> {symbol} </span>
        <button onClick={handleclick}> {isEditing ? "Save" : "Edit"} </button>
      </span>
    </li>
  );
}
