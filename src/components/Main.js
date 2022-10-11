import React from "react";
import Die from "./Dice";
import Titile from "./Titile";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";
const Main = () => {
  const [acctuallDice, setActuallDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = acctuallDice.every((die) => die.isHeld);
    const firstValue = acctuallDice[0].value;
    const allSameValue = acctuallDice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("you won");
    }
  }, acctuallDice);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }
    return newDice;
  }

  const holdDiece = (ID) => {
    setActuallDice((oldDice) =>
      oldDice.map((diec) => {
        return diec.id === ID ? { ...diec, isHeld: !diec.isHeld } : diec;
      })
    );
  };

  const rollDice = () => {
    setActuallDice((oldDice) =>
      oldDice.map((dice) => {
        return dice.isHeld ? dice : generateNewDie();
      })
    );
    if (tenzies === true) {
      setActuallDice(allNewDice());
      setTenzies(false);
    }
  };

  const diceElements = acctuallDice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDiece={() => holdDiece(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <Titile />
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
};

export default Main;
