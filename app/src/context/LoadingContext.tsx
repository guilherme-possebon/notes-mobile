import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  isLoading: boolean;
  showLoading: (text?: string) => void;
  hideLoading: () => void;
  loadingText: string;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  reload: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");
  const [reload, setReload] = useState(false);

  const showLoading = (text?: string) => {
    setIsLoading(true);
    setLoadingText(text || "Loading...");
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        showLoading,
        hideLoading,
        loadingText,
        reload,
        setReload,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export default LoadingProvider;
