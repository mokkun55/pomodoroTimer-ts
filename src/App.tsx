// App.tsx
import { useEffect, useState } from "react";
import Button from "./components/Button";
import Timer from "./components/Timer";

function App() {
  const workMin: number = 25;
  const breakMin: number = 5;

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);

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
    setReset(true);

    // setTime([workMin, 0]);
  };

  // 初回レンダリング時のみ
  useEffect(() => {
    // ローカルストレージ読み込み
    loadLocalstrage();
  }, []);

  return (
    <div className="">
      <header>
        <h1 className="text-center text-4xl mt-4">Pomodoro Timer</h1>
      </header>
      <Timer
        workMin={workMin}
        breakMin={breakMin}
        isActive={isActive}
        isBreak={isBreak}
        count={count}
        isReset={reset}
        setIsBreak={setIsBreak}
        setCount={setCount}
        setReset={setReset}
      />
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
