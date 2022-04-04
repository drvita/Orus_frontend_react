/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../utils/url";

export const AuthContext = createContext(null);

export default function useUser({ children }) {
  const history = useHistory();
  const LS = sessionStorage.getItem("OrusSystem");
  let initialSession = {
    isLogged: false,
    idUser: 0,
    username: "",
    name: "",
    rol: null,
    email: "",
    token: "",
    branch: "",
    roles: "",
    permissions: [],
  };
  const [user, setUser] = useState(() => {
    if (LS && LS !== "undefined") {
      initialSession = JSON.parse(LS);
    }

    return initialSession;
  });
  // Functions
  const setUserData = (data) => {
      const toSave = {
        isLogged: data.isLogged ?? user.isLogged,
        idUser: data.id,
        username: data.username.toLowerCase(),
        name: data.name.toLowerCase(),
        rol: 2,
        email: data.email,
        token: data.token ?? user.token,
        branch: data.branch.id,
        roles: data.roles[0],
        permissions: data.permissions,
      };
      setUser(toSave);
      sessionStorage.setItem("OrusSystem", JSON.stringify(toSave));
    },
    session = async (credentials) => {
      const { email, password } = credentials;

      if (!email || !password) {
        return {
          status: false,
          message: "The fields user or passwors are required",
        };
      }

      return await api("user/login", "POST", credentials)
        .then((data) => {
          if (!data.status) {
            return { status: false, data };
          }

          const { data: user } = data;

          setUserData({
            ...user,
            token: data.token,
            isLogged: true,
          });

          return { status: true, message: data.message };
        })
        .catch((err) => {
          return { status: false, message: "Error en el servidor" };
        });
    };

  useEffect(() => {
    api("user").then((data) => {
      if (data.message === "Unauthenticated.") {
        return history.push("/login");
      }

      setUserData({ ...data.data, isLogged: true });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ auth: user, setSession: session }}>
      {children}
    </AuthContext.Provider>
  );
}