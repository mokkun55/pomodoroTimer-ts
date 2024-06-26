import { useEffect, useState } from "react";
import Button from "./components/Button";

function App() {
  const bellSound: HTMLAudioElement = new Audio("bell.mp3");
  const workMin: number = 1;
  const breakMin: number = 5;

  const [min, setMin] = useState<number>(workMin);
  const [sec, setSec] = useState<number>(0);
  const [strSec, setStrSec] = useState<string>("00");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);

  const [count, setCount] = useState<number>(0);

  // ローカルストレージ読み込み
  const loadLocalstrage = () => {
    setCount(Number(localStorage.getItem("counts")));
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
    setMin(workMin);
    setSec(0);
    setStrSec("00");
  };

  const digitCheck = () => {
    sec > 9 ? setStrSec(String(sec)) : setStrSec("0" + String(sec));
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

    if (isActive) {
      interval = setInterval(() => {
        if (sec == 0) {
          setSec(59);
          setMin(min - 1);
        } else {
          setSec(sec - 1);
        }
        digitCheck();
      }, 1000);

      // 時間が0になったときの処理
      if (min == 0 && sec == 1) {
        setIsActive(!isActive);
        setIsBreak(!isBreak);
        // タイマーをに設定休憩時間
        setMin(breakMin);
        setSec(0);
      }
    }

    if (isBreak) {
      interval = setInterval(() => {
        if (sec == 0) {
          setMin(min - 1);
          setSec(59);
        } else {
          setSec(sec - 1);
        }
        digitCheck();
        clearInterval(interval);
      }, 1000);

      // 時間が0になったときの処理
      if (min == 0 && sec == 1) {
        setIsActive(!isActive);
        setIsBreak(!isBreak);
        // タイマーをワーク時間に設定
        setMin(workMin);
        setSec(0);
        setCount(count + 1);
        localStorage.setItem("counts", String(count + 1));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, isBreak, min, sec, count]);

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
            {min}:{strSec}
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
                localStorage.setItem("counts", "0");
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
