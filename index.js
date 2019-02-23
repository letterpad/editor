import React from "react";
import { render } from "react-dom";
import Demo from "./src/Demo";

render(<Demo />, document.getElementById("root"));

if (module.hot) module.hot.accept();
