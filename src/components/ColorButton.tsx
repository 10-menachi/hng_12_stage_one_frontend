import React from "react";

const ColorButton = ({ color, text, handleClick }) => {
  return (
    <button
      style={{ backgroundColor: color }}
      className="text-white font-bold py-2 px-4 rounded cursor-pointer"
      onClick={() => handleClick(color)}
    >
      {text}
    </button>
  );
};

export default ColorButton;
