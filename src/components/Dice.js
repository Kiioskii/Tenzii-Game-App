import React from "react";

const Card = (props) => {
  console.log(props);
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div className="die-face" style={styles} onClick={props.holdDiece}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
};

export default Card;
