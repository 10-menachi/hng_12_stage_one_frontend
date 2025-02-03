import React, { useState, useRef } from "react";
import ColorButton from "./components/ColorButton";
import { colors } from "./constants/colors";
import Score from "./components/Score";

const App = () => {
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef(null);
  const randomNumber = Math.floor(Math.random() * colors.length);

  const handleClick = (color) => {
    setTotal((prevTotal) => prevTotal + 1);

    if (color === colors[randomNumber]) {
      setCorrect((prevCorrect) => prevCorrect + 1);
      setToast({ message: "Correct!", color: "bg-green-500" });
    } else {
      setToast({ message: "Wrong", color: "bg-red-500" });
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => setToast(null), 1500);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-3">
      <h1 className="text-3xl font-bold">Color Game</h1>
      <p className="text-xl">Guess the correct color!</p>

      {toast && (
        <div className={`px-4 py-2 text-white rounded ${toast.color}`}>
          {toast.message}
        </div>
      )}

      <div className="gap-3 flex items-center justify-center mt-4">
        {colors.map((color) => (
          <ColorButton
            key={color}
            color={color}
            text={color}
            handleClick={handleClick}
          />
        ))}
      </div>
      <Score correct={correct} total={total} />
    </div>
  );
};

export default App;
