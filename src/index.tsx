import React from "react";
import ReactDOM from "react-dom";
import { App, AuthProvider } from "Components";

ReactDOM.render(<AuthProvider><App/></AuthProvider>, document.getElementById("root"));
