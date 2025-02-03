import React from "react";

const Score = ({ correct, total }) => {
  return (
    <div className="text-xl font-bold py-2 px-4 rounded">
      Score: <span className="text-green-600">{correct}</span> /{" "}
      <span className="text-red-600">{total}</span>
    </div>
  );
};

export default Score;
