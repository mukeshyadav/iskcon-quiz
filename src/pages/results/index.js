import { useQuery } from "@tanstack/react-query";
import getAllResponses from "../../handlers/get-responses";
import AppHeader from "../../components/layout/Header";

const ResultView = () => {
  const { data = [], isLoading } = useQuery(["RESPONSES"], getAllResponses, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <AppHeader />
      {!isLoading ? (
        <table className="table-auto w-1/2 text-left m-auto mt-10">
          <tr>
            <th className="border-l border-b py-1 px-2 border-t">Name</th>
            <th className="border-l border-b py-1 px-2 border-t">Mobile</th>
            <th className="border-l border-b py-1 px-2 border-t border-r">
              Winner
            </th>
          </tr>
          {data.map(({ name, mobile, isWinner }) => {
            return (
              <tr className={isWinner && "font-semibold bg-orange-400"}>
                <td className="border-l border-b py-1 px-2">{name}</td>
                <td className="border-l border-b py-1 px-2">{mobile}</td>
                <td className="border-l border-b border-r py-1 px-2">
                  {isWinner ? "Yes" : "No"}
                </td>
              </tr>
            );
          })}
        </table>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default ResultView;
