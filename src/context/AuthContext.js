/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api, setUrl } from "../utils/url";

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
      if (!data) return;

      const toSave = {
        isLogged: data.isLogged ?? user.isLogged,
        idUser: data.id,
        username: data.username.toLowerCase(),
        name: data.name.toLowerCase(),
        rol: 2,
        email: data.email,
        token: data.token ?? user.token,
        branch: { ...data.branch.data, id: data.branch.id },
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
          return {
            status: false,
            message: "Error en el servidor: " + err.message,
          };
        });
    },
    outSession = async () => {
      return await api("user/logout", "POST")
        .then(() => {
          setUser(initialSession);
          sessionStorage.setItem("OrusSystem", "{}");

          return true;
        })
        .catch((err) => console.error("[Server] When close session:", err));
    },
    getCurrentUser = async () => {
      return await api("user").then((data) => {
        if (data.message === "Unauthenticated.") {
          return history.push("/login");
        }

        return data.data;
      });
    },
    getNotifications = async () => {
      const user = await getCurrentUser().catch(() => {
        // outSession();
        return null;
      });

      if (!user) return [];

      return user.unreadNotifications;
    },
    setNotifications = async (payload) => {
      if (typeof payload !== "object") {
        return {
          status: false,
          message: "Payload should be object",
        };
      }

      return await api("user/readAllNotifications", "POST", payload).then(
        (result) => {
          const count = parseInt(payload.id) < 0 ? "Todas" : 1;

          if (result.success) {
            console.log("[Orus System] Notificaciones marcadas leidas:", count);
            return true;
          }

          return false;
        }
      );
    },
    setBranch = async (branch) => {
      const url = setUrl("users", user.idUser);
      const update = {
        branch_id: branch,
        name: user.name,
        username: user.username,
      };

      return await api(url, "PUT", update).then((result) => {
        if (result.data && !result.message) return true;
        else return false;
      });
    };

  useEffect(() => {
    getCurrentUser().then((data) => {
      if (!data) return;

      console.log("[Orus system] Session was created");
      setUserData({ ...data, isLogged: true });
    });
  }, [user.isLogged]);

  return (
    <AuthContext.Provider
      value={{
        auth: user,
        setSession: session,
        outSession,
        getNotifications,
        setNotifications,
        setBranch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
