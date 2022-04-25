/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext } from "react";

export const ExamContext = createContext(null);
export const Exams = () => useContext(ExamContext);
