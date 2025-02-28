/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext } from "react";

export const StoreContext = createContext(null);
export const Store = () => useContext(StoreContext);
