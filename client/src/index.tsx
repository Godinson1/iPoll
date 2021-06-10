import React from "react";
import ReactDOM from "react-dom";
import "@fontsource/roboto";
import "./partials/_global.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const client = new QueryClient();
const production = process.env.NODE_ENV === "production";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={client}>
        <App />
        {production ? "" : <ReactQueryDevtools />}
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
