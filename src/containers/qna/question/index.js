import { useEffect, useState, useCallback, useMemo } from "react";
import Countdown from "react-countdown";
import { questions } from "../../../questions";
import { shuffleArray } from "../../../helper";
import { AnimatedLabel } from "../../../components/animated-label/animated-label";
import { AnimatedOption } from "../../../components/animated-option/animated-option";
import { Audio } from "../../../pages/audio/audio";
import countdownMusic from "../../../sounds/countdown.mp3";
import happySound from "../../../sounds/happy.mp3";
import failSound from "../../../sounds/fail.mp3";
import endSound from "../../../sounds/end.mp3";

import { AnimatePresence } from "framer-motion";
import AnswerAnimation from "../../../components/animate-bg/animate-bg";

const Question = ({ group = "group1", questionNumber = 0, setQnaStatus }) => {
  const [playMusic] = useState(true);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [sound, setSound] = useState(countdownMusic);
  const [loop, setLoop] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newOptions, setNewOptions] = useState([]);
  const [timer, setTimer] = useState(Date.now() + 46000);
  const { question, options } = questions[`group${group}`][questionNumber];

  useEffect(() => {
    setNewOptions(shuffleArray(options));
    setShowAnswer(false);
    setTimer(Date.now() + 46000); // Reset timer when question changes
    setSound(countdownMusic);
    setLoop(true); // Ensure the countdown music loops
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
      setIsCorrectAnswer(isCorrect);
      setSound(isCorrect ? happySound : failSound);
      setLoop(false);
    },
    [options, setQnaStatus]
  );

  const Completionist = () => (
    <span className="text-md">आपका समय समाप्त हुआ!</span>
  );

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setSound(endSound);
      setLoop(false);
    } else {
    }
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
      <Audio sound={sound} play={playMusic} loop={loop} />
      <AnimatePresence>
        {isCorrectAnswer && <AnswerAnimation isCorrect={isCorrectAnswer} />}
      </AnimatePresence>
      <AnimatedLabel className="kbc-question-text-bg-color">
        <span className="text-white font-bold mr-5">
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
      <div className="mt-14 text-right flex justify-between">
        <span className="rounded-full py-4 px-10 right-0 bg-red-500 text-white bottom-0 top-0 text-2xl items-center">
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
