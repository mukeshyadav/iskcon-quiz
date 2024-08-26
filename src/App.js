import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./components/layout";
import RegisterView from "./pages/register";
import QnAView from "./pages/qna";
import ResultView from "./pages/results";
import EndView from "./pages/end";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<RegisterView />} />
            <Route path="/qna/:groupId/:questionId" element={<QnAView />} />
            <Route path="/result" element={<ResultView />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
