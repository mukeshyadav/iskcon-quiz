import { useEffect, useState, useCallback, useMemo } from "react";
import Countdown from "react-countdown";
import { questions } from "../../../questions";
import { shuffleArray } from "../../../helper";
import { AnimatedLabel } from "../../../components/animated-label/animated-label";
import { AnimatedOption } from "../../../components/animated-option/animated-option";

const Question = ({ group = "group1", questionNumber = 0, setQnaStatus }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [newOptions, setNewOptions] = useState([]);
  const [timer, setTimer] = useState(Date.now() + 61000);
  const { question, options } = questions[`group${group}`][questionNumber];

  useEffect(() => {
    setNewOptions(shuffleArray(options));
    setShowAnswer(false);
    setTimer(Date.now() + 61000);
  }, [options, questionNumber]);

  const labelling = useMemo(() => ["A", "B", "C", "D"], []);

  const checkCorrectAnswer = useCallback(() => {
    setShowAnswer(true);
  }, []);

  const checkAnswer = useCallback(
    (option, index) => {
      const { isCorrect } = option;
      const updatedOptions = options.map((opt, i) => ({
        ...opt,
        activeClassName:
          i === index
            ? isCorrect
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
            : "",
      }));
      setNewOptions(updatedOptions);
      setQnaStatus(isCorrect);
    },
    [options, setQnaStatus]
  );

  const Completionist = () => (
    <span className="text-sm">आपका समय समाप्त हुआ!</span>
  );

  const renderer = ({ minutes, seconds, completed }) => {
    return completed ? (
      <Completionist />
    ) : (
      <>
        {minutes}:{seconds}
      </>
    );
  };

  return (
    <div className="flex flex-col text-center tracking-wide px-10">
      <div className="logo ml-auto mr-auto mb-24 mt-1"></div>
      <AnimatedLabel className="kbc-question-text-bg-color">
        <span className="absolute left-40 text-white font-bold">
          प्रश्न {parseInt(questionNumber) + 1}:
        </span>
        {question}
      </AnimatedLabel>

      <div className="grid grid-cols-2 gap-10 mt-12">
        {newOptions.map((option, index) => (
          <AnimatedOption
            optionCss="kbc-question-option"
            className={`text-left py-4 px-6 cursor-pointer font-semibold text-2xl ${
              showAnswer &&
              (option.isCorrect
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white")
            } ${option.activeClassName}`}
            key={index}
            onClick={() => checkAnswer(option, index)}
          >
            {labelling[index]}. &nbsp; {option.label}
          </AnimatedOption>
        ))}
      </div>
      <div className="mt-14 text-right flex justify-between pr-8">
        <span className="rounded-full py-4 px-10 right-0 bg-red-500 text-white bottom-0 top-0 flex  text-2xl items-center ml-5">
          शेष समय: &nbsp; <Countdown date={timer} renderer={renderer} />
        </span>
        <button
          onClick={checkCorrectAnswer}
          className="bg-indigo-600 text-white rounded-full py-4 px-10 cursor-pointer text-2xl"
        >
          सही उत्तर जांचें
        </button>
      </div>
    </div>
  );
};

export default Question;
