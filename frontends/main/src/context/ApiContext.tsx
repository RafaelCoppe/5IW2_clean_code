// src/context/ApiContext.tsx
import React, { createContext, useContext } from "react";
import ApiClient from "../services/api";

const apiBaseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/"; // Défini dans le .env
const apiInstance = new ApiClient(apiBaseUrl);

const ApiContext = createContext<ApiClient | null>(null);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ApiContext.Provider value={apiInstance}>{children}</ApiContext.Provider>;
};

export const useApi = (): ApiClient => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
