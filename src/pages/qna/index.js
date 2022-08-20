import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Question from "../../containers/qna/question";
import Scorecard from "../../containers/qna/scorecard";
import { createResponse } from "../../handlers/add-response";

const QnAView = () => {
  const { groupId, questionId } = useParams();
  const [qnaStatus, setQnaStatus] = useState(true);
  const { name, mobile, group } = JSON.parse(
    sessionStorage.getItem("participant")
  );
  const { questionId: currentQuestionId } = useParams();
  const navigate = useNavigate();

  const navigateToNextQuestion = () => {
    navigate(`/qna/${groupId}/${parseInt(questionId, 10) + 1}`);
  };

  const { mutate, isLoading } = useMutation(createResponse, {
    onSuccess: async (data) => {
      // setShowSuccessMessage(data?.message);
    },
  });

  const submitAnswers = () => {
    mutate({
      name: name,
      mobile: mobile,
      group: group,
      isWinner: parseInt(currentQuestionId, 10) === 9 ? true : false,
    });
  };

  return (
    <div className="m-auto flex justify-between min-h-[100vh]">
      {isLoading && <div>Submitting...</div>}
      <div className="block w-9/12 m-auto">
        <Question
          group={groupId}
          questionNumber={questionId}
          setQnaStatus={setQnaStatus}
          qnaStatus={qnaStatus}
        />
      </div>
      <div className="w-3/12 p-5 min-h-[100vh] flex flex-col bg-slate-300">
        <Scorecard qna={qnaStatus} />
        <div className="text-center flex flex-col">
          {questionId < 9 ? (
            <button
              className="bg-orange-600 text-white rounded-md font-semibold text-xl py-3 px-5 border-orange-500 border cursor-pointer"
              onClick={() => navigateToNextQuestion()}
            >
              Next Question &gt;&gt;
            </button>
          ) : null}
          <button
            className="bg-slate-900 text-white rounded-md mt-5 font-semibold text-xl py-3 px-5 border-orange-500 border cursor-pointer"
            onClick={async () => {
              await submitAnswers();
              navigate("/");
            }}
          >
            Start New
          </button>
        </div>
      </div>
    </div>
  );
};

export default QnAView;
