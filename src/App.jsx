/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import AuthProvider from "./context/AuthContext";
import Router from "./routers/Router";
import { useEffect } from "react";

export default function App() {
  const LS = localStorage.getItem("OrusSystem");
  const defaultStorage = {
    protocol: window.location.protocol.replace(":", ""),
    host: window.location.hostname,
    port: window.location.port,
  };
  const storage = LS ? JSON.parse(LS) : defaultStorage;

  useEffect(() => {
    localStorage.setItem("OrusSystem", JSON.stringify(storage));
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <Router />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}
