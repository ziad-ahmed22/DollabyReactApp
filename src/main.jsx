import ReactDOM from "react-dom/client";
import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store/store.js";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-tooltip/dist/react-tooltip.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename="E-Commerce-React-App">
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
