import React from "react";

const ColorButton = ({ color, handleClick }) => {
  return (
    <button
      className="text-white font-bold py-2 px-4 rounded cursor-pointer bg-gray-700"
      onClick={() => handleClick(color)}
    >
      {color}
    </button>
  );
};

export default ColorButton;
