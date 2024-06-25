import { useEffect, useState } from "react";
import Button from "./components/Button";

function App() {
  const bellSound: HTMLAudioElement = new Audio("bell.mp3");
  const workMin: number = 2;
  const breakMin: number = 2;

  const [min, setMin] = useState<number>(workMin);
  const [sec, setSec] = useState<number>(0);

  const [strSec, setStrSec] = useState<string>("00");

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);

  const [count, setCount] = useState<number>(0);

  // ローカルストレージに保存したcountを呼び出し countに代入

  const timerStart = () => {
    setIsActive(true);
    setIsBreak(false);
  };

  const timerStop = () => {
    setIsActive(false);
  };

  const digitCheck = () => {
    if (sec > 9) {
      setStrSec(String(sec));
    } else {
      setStrSec("0" + String(sec));
    }
  };

  useEffect(() => {
    bellSound.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBreak]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        if (sec == 0) {
          setMin(min - 1);
          setSec(59);
        } else {
          setSec(sec - 1);
        }
        digitCheck();
        clearInterval(interval);
      }, 100);

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
          // console.log(sec - 1);
        }
        digitCheck();
        clearInterval(interval);
      }, 100);

      // 時間が0になったときの処理
      if (min == 0 && sec == 1) {
        setIsActive(!isActive);
        setIsBreak(!isBreak);
        // タイマーをワーク時間に設定
        setMin(workMin);
        setSec(0);
        setCount(count + 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, isBreak, min, sec, count]);

  return (
    <div className="">
      <header>
        <h1 className="text-center text-3xl mt-4">pomodoro timer</h1>
      </header>
      <div
        className={`px-5 m-5 shadow-lg rounded-3xl ${
          isBreak ? "bg-blue-100" : "bg-red-100"
        }`}
      >
        <p className="text-xl text-center pt-5">
          {isBreak ? "Break Time" : "Work Time"}
        </p>
        <p className="text-[120px] text-center leading-none pb-5">
          {min}:{strSec}
        </p>
      </div>
      <div className="text-center">
        <Button className="bg-blue-400" onClick={timerStart}>
          スタート
        </Button>
        <Button className="bg-green-400" onClick={timerStop}>
          一時停止
        </Button>
        <Button className="bg-red-400">終了</Button>
      </div>

      <div>
        <h1 className="text-2xl text-center mt-5">
          あなたは、今まで{count}セット取り組みました!
        </h1>
        <div className="flex justify-center">
          <p>回数はブラウザに保存されます。</p>
          <p
            className="text-red-500 underline cursor-pointer"
            onClick={() => {
              if (confirm("本当にリセットしますか?")) {
                // TODO ローカルストレージ初期化する
              }
            }}
          >
            リセット
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
