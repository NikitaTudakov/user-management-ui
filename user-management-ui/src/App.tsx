import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import UserTableComponent from './components/userTableComponent/userTableComponent';
import LoginComponent from './components/login-page/LoginComponent';
import AuthGuard from './guards/AuthGuard';
import { useState } from 'react';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //callback function to handle authentication result
    const handleAuthentication = (result: boolean) => {
        setIsAuthenticated(result);
    };

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route></Route>
                    <Route path="/overview" element={
                        <AuthGuard isAuthenticated={isAuthenticated}>
                            <UserTableComponent />
                        </AuthGuard>
                    } />
                    <Route path="/login" element={<LoginComponent onAuthenticationSuccess={handleAuthentication}/>} />
                    <Route path="/*" element={
                        <AuthGuard isAuthenticated={isAuthenticated}>
                            <UserTableComponent  />
                        </AuthGuard>
                    } />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
