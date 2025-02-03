import React, { useState, useRef, useEffect } from "react";
import ColorButton from "./components/ColorButton";
import { colors } from "./constants/colors";
import Score from "./components/Score";

const App = () => {
  const [targetColor, setTargetColor] = useState("");
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    generateNewColor();
  }, []);

  const generateNewColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    setTargetColor(colors[randomIndex]);
  };

  const handleClick = (color) => {
    setTotal((prevTotal) => prevTotal + 1);

    if (color === targetColor) {
      setCorrect((prevCorrect) => prevCorrect + 1);
      setToast({ message: "Correct!", color: "bg-green-500" });
    } else {
      setToast({ message: "Wrong", color: "bg-red-500" });
    }

    generateNewColor();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => setToast(null), 1500);
  };

  const reset = () => {
    setCorrect(0);
    setTotal(0);
    setToast(null);
    generateNewColor();
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-3 p-4">
      <button
        className="text-black bg-amber-300 font-bold py-2 px-4 rounded cursor-pointer absolute top-2 right-2"
        onClick={reset}
        data-testid="newGameButton"
      >
        New Game
      </button>

      <h1 className="text-3xl font-bold">Color Game</h1>
      <p className="text-xl" data-testid="gameInstructions">
        Guess the correct color!
      </p>

      {toast && (
        <div
          className={`px-4 py-2 text-white rounded ${toast.color}`}
          data-testid="gameStatus"
        >
          {toast.message}
        </div>
      )}

      <div
        className="w-32 h-32 rounded-lg border-2 border-black mt-4"
        style={{ backgroundColor: targetColor }}
        data-testid="colorBox"
      ></div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        {colors.slice(0, 6).map((color) => (
          <ColorButton
            key={color}
            color={color}
            handleClick={handleClick}
            data-testid="colorOption"
          />
        ))}
      </div>

      <Score correct={correct} total={total} data-testid="score" />
    </div>
  );
};

export default App;
