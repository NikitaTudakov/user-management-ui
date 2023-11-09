import React, { createContext, useContext, useState, ReactNode } from 'react';
import SnackbarComponent from './snackBarComponent';
import { NotificationTypes } from '../../enums/notificationTypes.enum';
import { SnackbarInterface } from '../../interfaces/snackbar';

interface SnackbarContextProps {
    children: ReactNode;
}

interface SnackbarContextValue {
    showSnackbar: (message: string,type:NotificationTypes) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined);

export const useSnackbar = (): SnackbarContextValue => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

export const SnackbarProvider: React.FC<SnackbarContextProps> = ({ children }) => {
    const [snackbarData, setSnackbarData] = useState<SnackbarInterface | null>(null);

    const showSnackbar = (message: string, type:NotificationTypes) => {
        setSnackbarData({message, type});
    };

    return (
        <SnackbarContext.Provider value={{showSnackbar}}>
            {children}
            {snackbarData && <SnackbarComponent snackbarData={snackbarData}/>}
        </SnackbarContext.Provider>
    );
};