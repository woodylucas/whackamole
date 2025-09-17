import { useState, useRef, useEffect } from "react";
import GridCell from "./GridCell";

type WhackAMoleTypes = {
  rows: number;
  cols: number;
  roundDuration: number;
  molesAtOnce: number;
  molesAppearingInterval: number;
};

function shuffle(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateMolesHole(
  molesAtOnce: number,
  totalCount: number
): Set<number> {
  // Generate a list of indices -> [0, totalCount - 1]
  const indices = Array.from({ length: totalCount }, (_, idx) => idx);
  // Shuffle indices
  shuffle(indices);
  // Extract the first random hole
  const shuffleIndices = indices.slice(0, molesAtOnce);
  // place in set
  return new Set(shuffleIndices);
}

export default function WhackAMole({
  rows,
  cols,
  roundDuration,
  molesAtOnce,
  molesAppearingInterval,
}: WhackAMoleTypes) {
  const [count, setCount] = useState(roundDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<Set<number>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalCount = rows * cols;

  // Moles need to move programatically, based on if the game isRunning
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isRunning) {
      intervalId = setInterval(() => {
        setIsVisible(generateMolesHole(molesAtOnce, totalCount));
      }, molesAppearingInterval);
    }

    return () => {
      clearInterval(intervalId);
      setIsVisible(new Set());
    };
  }, [isRunning, molesAtOnce, totalCount, molesAppearingInterval]);

  const handleClick = (idx: number) => {
    if (!isVisible.has(idx)) return;

    setIsVisible((prevIsVisible) => {
      const visible = new Set(prevIsVisible);
      visible.delete(idx);
      return visible;
    });

    setScore((prevScore) => (prevScore ?? 0) + 1);
  };

  const handleCountdown = () => {
    setScore(0);
    setCount(roundDuration);
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
          return (
            <GridCell
              key={idx}
              filled={isVisible.has(idx)}
              onClick={() => handleClick(idx)}
            />
          );
        })}
      </div>
    </div>
  );
}
