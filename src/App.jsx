import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import AuthProvider from "./context/AuthContext";
import Router from "./routers/Router";

export default function App() {
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
