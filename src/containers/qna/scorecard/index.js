import { useParams } from "react-router-dom";

const Scorecard = ({ qna }) => {
  const { name } = JSON.parse(sessionStorage.getItem("participant"));
  const { questionId } = useParams();

  const list = new Array(10).fill("");

  return (
    <div className="grow">
      {qna && (
        <ul>
          {list.map((val, index) => {
            return (
              <li
                className={`border border-purple-700 relative rounded-md my-3 flex text-white ${
                  index < questionId ? "bg-green-600" : "bg-purple-900"
                } ${index === parseInt(questionId, 10) && " animate-bounce"}`}
                key={index}
              >
                <span className="bg-slate-500 rounded-md p-2 px-3 text-white font-semibold">
                  {index + 1}
                </span>
                <span className="font-extrabold text-2xl w-full self-center text-center">
                  {(index + 1) * 1000}
                </span>
                {index >= questionId ? (
                  <span className="flex absolute h-3 w-3 top-5 right-5 -mt-1 -mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-900 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-300"></span>
                  </span>
                ) : (
                  <span className="absolute right-2 top-1">
                    <svg
                      class="h-8 w-8 text-green-900"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <path d="M5 12l5 5l10 -10" />
                    </svg>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {!qna && (
        <div className="flex self-center justify-between">
          <h2 className="font-semibold my-5 text-2xl p-5 text-white">
            धन्यवाद, {name} कौन बनेगा कृष्ण भक्त में भाग लेने के लिए।
          </h2>
        </div>
      )}
    </div>
  );
};

export default Scorecard;
