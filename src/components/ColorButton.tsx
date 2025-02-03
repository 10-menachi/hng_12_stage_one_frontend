import React from "react";

const ColorButton = ({ color, handleClick }) => {
  return (
    <button
      className="w-20 h-20 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200"
      style={{ backgroundColor: color }}
      onClick={() => handleClick(color)}
      data-testid="colorOption"
    />
  );
};

export default ColorButton;
