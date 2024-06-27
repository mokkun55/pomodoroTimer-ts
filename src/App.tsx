import { useEffect, useState } from "react";
import Button from "./components/Button";

function App() {
  const bellSound: HTMLAudioElement = new Audio("bell.mp3");
  const workMin: number = 25;
  const breakMin: number = 5;

  const [time, setTime] = useState<[number, number]>([workMin, 0]);
  const [strTime, setStrTime] = useState<[string, string]>(["", ""]);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);

  const [count, setCount] = useState<number>(0);

  // ローカルストレージ読み込み
  const loadLocalstrage = () => {
    setCount(Number(localStorage.getItem("count")));
  };

  const timerStart = () => {
    setIsActive(true);
    setIsBreak(false);
  };

  const timerStop = () => {
    setIsActive(false);
  };

  const timerReset = () => {
    setIsActive(false);
    setIsBreak(false);
    setTime([workMin, 0]);
  };

  const digitCheck = () => {
    time[1] < 10
      ? setStrTime([String(time[0]), "0" + String(time[1])])
      : setStrTime([String(time[0]), String(time[1])]);
  };

  useEffect(() => {
    // ローカルストレージ読み込み
    loadLocalstrage();
  }, []);

  // 休憩↔仕事 更新時に音を鳴らす
  useEffect(() => {
    bellSound.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBreak]);

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

  useEffect(() => {}, []);

  return (
    <div className="">
      <header>
        <h1 className="text-center text-4xl mt-4">Pomodoro Timer</h1>
      </header>
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

      <div className="text-center">
        <Button className="bg-blue-400" onClick={timerStart}>
          スタート
        </Button>
        <Button className="bg-green-400" onClick={timerStop}>
          一時停止
        </Button>
        <Button className="bg-red-400" onClick={timerReset}>
          終了
        </Button>
      </div>

      <div>
        <h1 className="text-2xl text-center mt-5">
          今まで
          <span className="underline">{count}セット</span>
          取り組みました!
        </h1>
        <div className="flex justify-center">
          <p>回数はブラウザに保存されます。</p>
          <p
            className="text-red-500 underline cursor-pointer"
            onClick={() => {
              if (confirm("本当にリセットしますか?")) {
                localStorage.setItem("count", "0");
                setCount(0);
              }
            }}
          >
            リセット
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-[700px] bg-gray-100 p-5 m-5 rounded-3xl shadow-lg mt-16">
          <h1 className="text-xl">ポモドーロテクニックとは...</h1>
          <p className="m-2 mt-0">
            ポモドーロテクニックは、フランチェスコ・シリロ氏が1980年代に考案した時間管理の手法です。ポモドーロテクニックは、短い作業と休憩のサイクルを繰り返すことで、持続的な集中力を保ち、疲労を防ぎます。時間の区切りがあることで、タスクの見通しが立ちやすくなり、達成感も得られやすくなります。
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
