// component: Timer.tsx
import { useEffect, useState } from "react";

type TimerProps = {
  workMin: number;
  breakMin: number;
  isActive: boolean;
  isBreak: boolean;
  count: number;
  time: [number, number];
  setTime: (time: [number, number]) => void;
  setIsBreak: (isBreak: boolean) => void;
  setCount: (count: number) => void;
};

function Timer({
  workMin,
  breakMin,
  isActive,
  isBreak,
  count,
  time,
  setTime,
  setIsBreak,
  setCount,
}: TimerProps) {
  const bellSound: HTMLAudioElement = new Audio("bell.mp3");
  const [strTime, setStrTime] = useState<[string, string]>(["", ""]);
  const digitCheck = () => {
    time[1] < 10
      ? setStrTime([String(time[0]), "0" + String(time[1])])
      : setStrTime([String(time[0]), String(time[1])]);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    digitCheck();
    if (isActive) {
      interval = setInterval(() => {
        if (time[1] === 0) {
          setTime([time[0] - 1, 59]);
        } else {
          setTime([time[0], time[1] - 1]);
        }
        if (time[0] === 0 && time[1] === 0) {
          setIsBreak(!isBreak);
          setTime([breakMin, 0]);
          if (isBreak) {
            setCount(count + 1);
            localStorage.setItem("count", String(count + 1));
          }
        }
      }, 1000);
    }

    // タイマー重複防ぐ
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, isBreak, isActive]);

  // 休憩↔仕事 更新時に音を鳴らす
  useEffect(() => {
    bellSound.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBreak]);

  return (
    <div className="flex justify-center">
      <div
        className={`w-[500px] m-5 shadow-lg rounded-3xl ${
          isBreak ? "bg-blue-100" : "bg-red-100"
        }`}
      >
        <p className="text-xl text-center pt-5">
          {isBreak ? ` Time ${breakMin}min` : `Work Time ${workMin}min`}
        </p>
        <p className="text-[120px] text-center leading-none pb-5">
          {strTime[0]}:{strTime[1]}
        </p>
      </div>
    </div>
  );
}

export default Timer;
