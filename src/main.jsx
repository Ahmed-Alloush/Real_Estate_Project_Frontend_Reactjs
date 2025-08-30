import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
import { store } from "./store/store";
import { Provider } from "react-redux";
// import { LanguageProvider } from "./theme/LanguageProvider";
// Import Cairo font for Arabic support
// import "@fontsource/cairo/300.css";
// import "@fontsource/cairo/400.css";
// import "@fontsource/cairo/500.css";
// import "@fontsource/cairo/600.css";
// import "@fontsource/cairo/700.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <LanguageProvider> */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </LanguageProvider> */}
  </React.StrictMode>
);
