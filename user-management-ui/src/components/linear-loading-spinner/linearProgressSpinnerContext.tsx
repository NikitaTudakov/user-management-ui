import React, { createContext, useState, useContext, ReactNode } from 'react';
import LinearProgressSpinner from './linearProgressSpinnerComponent';

interface ProgressContextProps {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProgressProviderProps {
    children: ReactNode;
}

const LinearProgressContext = createContext<ProgressContextProps | undefined>(undefined);

export const useLinearProgress = (): ProgressContextProps => {
    const context = useContext(LinearProgressContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

export const LinearProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LinearProgressContext.Provider value={{ loading,setLoading }}>
      {loading && <LinearProgressSpinner />}
      {children}
    </LinearProgressContext.Provider>
  );
};

