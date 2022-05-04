import { createContext, useContext } from "react";

export const UserContext = createContext(null);
export const Users = ()=> useContext(UserContext);