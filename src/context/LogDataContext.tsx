"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { LogDataContextType, LogDataContextValue } from "../types/data";

const LogDataContext = createContext<LogDataContextType | undefined>(undefined);

export const LogDataProvider = ({ children }: { children: ReactNode }) => {
  const [logData, setLogData] = useState<LogDataContextValue[]>([]);

  useEffect(() => {
    const rawData = JSON.parse(localStorage.getItem("newLog") || "[]");
    setLogData(rawData);
  }, []);

  const deleteLogData = (id: string) => {
    const updatedData = logData.filter((item) => item.id !== id);
    localStorage.setItem("newLog", JSON.stringify(updatedData));
    setLogData(updatedData);
  };

  return (
    <LogDataContext.Provider value={{ logData, setLogData, deleteLogData }}>
      {children}
    </LogDataContext.Provider>
  );
};

export const useLogData = () => {
  const context = useContext(LogDataContext);
  if (!context) {
    throw new Error("useLogData must be used within a LogDataProvider");
  }
  return context;
};
