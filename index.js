import React from "react";
import { render } from "react-dom";
import App from "./src/index";

render(<App />, document.getElementById("root"));

if (module.hot) module.hot.accept();
