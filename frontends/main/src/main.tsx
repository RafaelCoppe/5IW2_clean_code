import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApiProvider } from "./context/ApiContext";
import { Provider } from "react-redux";
import store from "./services/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ApiProvider>
  </StrictMode>
);
