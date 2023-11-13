import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import UserTableComponent from './components/userTableComponent/userTableComponent';
import LoginComponent from './components/login-page/LoginComponent';
import AuthGuard from './guards/AuthGuard';
import { useEffect, useState } from 'react';
import { isValidToken } from './services/login';
import LoadingScreen from './components/loadingScreen/loadingScreenComponent';
import { SnackbarProvider } from './components/snackbar/snackbarContext';
import ForgotPasswordComponent from './components/forgot-password/forgotPasswordComponent';
import ResetPasswordCompoennt from './components/reset-password/resetPasswordComponent';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const indexOfTokenFromParam = window.location.href.indexOf('accessToken=');
        const storedAccessToken = localStorage.getItem('accessToken');
        const accesstoken = indexOfTokenFromParam > 0 ? window.location.href.slice(indexOfTokenFromParam+12) : storedAccessToken;

        if(accesstoken) {
            isValidToken(accesstoken).then((result) => {
                setIsAuthenticated(result);
                !result && localStorage.removeItem('accessToken');
                setIsLoading(false);
            });
        } else {
            setIsAuthenticated(false);
            setIsLoading(false);
        }
    }, [])

    const handleAuthentication = (result: boolean) => {
        setIsAuthenticated(result);
    };

    if (isLoading) {
        return  <LoadingScreen />
    }

    return (
        <SnackbarProvider>
            <div className="App">
                <Router>
                    <Routes>
                        <Route></Route>
                        <Route path="/overview" element={
                            <AuthGuard isAuthenticated={isAuthenticated}>
                                <UserTableComponent />
                            </AuthGuard>
                        } />
                        <Route path="/login" element={
                            <LoginComponent onAuthenticationSuccess={handleAuthentication}/>
                        } />
                        <Route path="/login/forgot-password" element={<ForgotPasswordComponent />} />
                        <Route path="/reset-password" element={
                            <AuthGuard isAuthenticated={isAuthenticated}>
                                <ResetPasswordCompoennt />
                            </AuthGuard>
                        }/>
                        <Route path="/*" element={
                            <AuthGuard isAuthenticated={isAuthenticated}>
                                <UserTableComponent  />
                            </AuthGuard>
                        } />
                    </Routes>
                </Router>
            </div>
        </SnackbarProvider>
    );
}

export default App;
