/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext } from "react";

export const ContactContext = createContext(null);
export const Contacts = () => useContext(ContactContext);
