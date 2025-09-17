import { useState, useRef, useEffect } from "react";
import GridCell from "./GridCell";

type WhackAMoleTypes = {
  rows: number;
  cols: number;
  roundDuration: number;
  molesAtOnce: number;
  molesAppearingInterval: number;
};

export default function WhackAMole({
  rows,
  cols,
  roundDuration,
  molesAtOnce,
  molesAppearingInterval,
}: WhackAMoleTypes) {
  const [count, setCount] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(new Set());
  const intervalRef = useRef<number | null>(null);
  const totalCount = rows * cols;

  const handleCountdown = () => {
    setScore(0);
    setCount(10);
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 0) {
          return prevCount - 1;
        }

        clearInterval(intervalRef.current);
        setIsRunning(false);
        intervalRef.current = null;
        return 0;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="app">
      <header>
        {score == null ? (
          <button className="start-btn" onClick={handleCountdown}>
            Start Game
          </button>
        ) : (
          <div className="round-info">
            <p>Score {score}</p>
            {!isRunning && (
              <button className="start-btn" onClick={handleCountdown}>
                Play again
              </button>
            )}
            <p>Time Remaining {count}</p>
          </div>
        )}
      </header>
      <div
        className="grid-container"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: totalCount }, (_, idx) => {
          return <GridCell key={idx} />;
        })}
      </div>
    </div>
  );
}
