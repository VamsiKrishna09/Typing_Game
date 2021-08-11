import React from "react";

const Button = ({ handleStart, disabled }) => {
  return (
    <button onClick={handleStart}>{disabled ? "Start" : "Restart"}</button> //if game already started then not disabled and restart is displayed
  );
};

export default Button;
