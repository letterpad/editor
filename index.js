import React from "react";
import { render } from "react-dom";
import Demo from "./examples/demo-1";

render(<Demo />, document.getElementById("root"));

if (module.hot) module.hot.accept();
