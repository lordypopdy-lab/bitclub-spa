import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import Providers from "./app/providers"; 

import "./styles/fonts/fonts.css";
import "./styles/fonts/font-icons.css";
import "./styles/css/bootstrap.min.css";
import "./styles/css/styles.css";
import "./styles/css/swiper-bundle.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);