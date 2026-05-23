import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080" || "https://bitclub.onrender.com";
axios.defaults.withCredentials = true;

export default axios;