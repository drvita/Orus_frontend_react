import { createContext, useContext } from "react";

export const SaleContext = createContext(null);
export const Sale = () => useContext(SaleContext);