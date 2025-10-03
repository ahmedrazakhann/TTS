import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import "./index.css";
// import AxiosInterceptor from "@/utils/AxiosInterceptor";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryDialog from "@/components/ErrorDialogue";
import AxiosInterceptor from "@/utils/AxiosInterceptor";
// initialize axios
AxiosInterceptor.initialize();

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ErrorBoundary fallback={<ErrorBoundaryDialog />}>
      <Router>
        <App />s
      </Router>
    </ErrorBoundary>
  </Provider>
);
