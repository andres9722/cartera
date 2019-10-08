import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { init } from "./config";

init();
ReactDOM.render(<App />, document.getElementById("root"));
