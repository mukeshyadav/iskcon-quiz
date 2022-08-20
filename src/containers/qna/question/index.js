import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { questions } from "../../../questions";
import { shuffleArray } from "../../../helper";

const Question = ({ group = "group1", questionNumber = 0, setQnaStatus }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [newOptions, setNewOptions] = useState([]);
  const [timer, setTimer] = useState(Date.now() + 61000);
  const { question, options } = questions[`group${group}`][questionNumber];

  useEffect(() => {
    setNewOptions(shuffleArray(options));
    setShowAnswer(false);
  }, [options]);

  useEffect(() => {
    setTimer(Date.now() + 61000);
  }, [questionNumber]);

  const labelling = ["A", "B", "C", "D"];
  const checkCorrectAnswer = () => {
    setShowAnswer(true);
  };
  const checkAnswer = (option, index) => {
    const { isCorrect } = option;
    const copiedOptions = [...options];
    copiedOptions[index]["activeClassName"] = isCorrect
      ? "bg-green-600 text-white"
      : "bg-red-600 text-white";
    setNewOptions(copiedOptions);

    if (isCorrect) {
      setQnaStatus(true);
    } else {
      setQnaStatus(false);
    }
  };
  // Random component
  const Completionist = () => (
    <span className="text-sm">आपका समय समाप्त हुआ!</span>
  );

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <>
          {minutes}:{seconds}
        </>
      );
    }
  };

  return (
    <div className="flex flex-col text-center tracking-wide px-6">
      <div className="logo border-4 border-orange-600 shadow-xl shadow-orange-500"></div>
      <h3 className="my-8 text-xl font-bold rounded-full ring-1 py-5 px-5 border-spacing-1 ring-orange-600 relative bg-orange-200 pl-32">
        <span className="rounded-full px-6 absolute left-0 bottom-0 bg-orange-600 top-0 text-white font-bold text-sm flex items-center">
          प्रश्न {parseInt(questionNumber) + 1}
        </span>
        {question}
      </h3>
      <div className="grid grid-cols-2 gap-10">
        {(newOptions || []).map((option, index) => (
          <span
            key={index}
            onClick={() => checkAnswer(option, index)}
            className={`text-left py-4 px-6 border rounded-full cursor-pointer font-semibold text-2xl border-orange-600 drop-shadow-lg ${
              showAnswer
                ? option.isCorrect
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
                : ""
            } ${option?.activeClassName}`}
          >
            {labelling[index]}. &nbsp; {option?.label}
          </span>
        ))}
      </div>
      <div className="mt-14 text-right flex justify-end pr-8">
        <button
          onClick={() => checkCorrectAnswer()}
          className="bg-orange-600 text-white rounded-md py-2 px-5 border-orange-500 border cursor-pointer"
        >
          सही उत्तर जांचें
        </button>
        <span className="rounded-full px-6 right-0 bg-red-600 text-white bottom-0 top-0 flex items-center ml-5">
          शेष समय: &nbsp; <Countdown date={timer} renderer={renderer} />
        </span>
      </div>
    </div>
  );
};

export default Question;
