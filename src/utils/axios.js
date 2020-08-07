import axios from "axios";
import { loadProgressBar } from "x-axios-progress-bar";

const instance = axios.create({
  timeout: 2500
});

loadProgressBar({showSpinner: false}, instance);

export default instance;