import { useEffect, useRef, useState } from "react";
import { colors } from "./constants/colors";
import ColorButton from "./components/ColorButton";
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
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-gray-100">
      <button
        className="text-black bg-amber-300 font-bold py-2 px-6 rounded-lg hover:bg-amber-400 transition-colors duration-200 absolute top-4 right-4 shadow-md"
        onClick={reset}
        data-testid="newGameButton"
      >
        New Game
      </button>

      <h1 className="text-4xl font-bold text-gray-800">Color Game</h1>
      <p className="text-xl text-gray-600" data-testid="gameInstructions">
        Guess the correct color!
      </p>

      {toast && (
        <div
          className={`${toast.color} px-6 py-3 text-white rounded-lg shadow-lg animate-bounce`}
          data-testid="gameStatus"
        >
          {toast.message}
        </div>
      )}

      <div
        className="w-40 h-40 rounded-lg shadow-xl border-4 border-gray-200 transition-all duration-300"
        style={{ backgroundColor: targetColor }}
        data-testid="colorBox"
      />

      <div className="grid grid-cols-3 gap-4 mt-4 p-4">
        {colors.map((color) => (
          <ColorButton key={color} color={color} handleClick={handleClick} />
        ))}
      </div>

      <Score correct={correct} total={total} data-testid="score" />
    </div>
  );
};

export default App;
