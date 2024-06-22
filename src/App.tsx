import { useState } from "react";
import Button from "./components/Button";

function App() {
  const [timer, setTimer] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const timerStart = () => {
    setTimer(true);
  };

  const timerStop = () => {
    setTimer(false);
  };
  return (
    <div className="">
      <div className="bg-gray-100 px-5 m-5 shadow-lg rounded-3xl">
        <p className="text-center pt-5">
          {isBreak ? "Break Time" : "Work Time"}
        </p>
        <p className="text-[120px] text-center leading-none pb-5">12:12</p>
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
    </div>
  );
}

export default App;
