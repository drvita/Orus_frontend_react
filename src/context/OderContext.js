/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext } from "react";

export const OrderContext = createContext(null);
export const Store = () => useContext(OrderContext);
