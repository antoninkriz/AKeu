import React from "react";
import {render} from "react-snapshot";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "x-axios-progress-bar/dist/nprogress.css";
import "./index.scss";

if (!global.requestAnimationFrame)
  global.requestAnimationFrame = (callback) => setTimeout(callback, 0);

render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

// Remove old meta tags
const description = document.querySelector("meta[name='description']");
if (description)
  description.remove();

