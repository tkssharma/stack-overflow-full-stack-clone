import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

