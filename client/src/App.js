import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import AuthApi from './context/AuthApi';
import { hasSignned } from './utils/auth-api';
function App() {
    const [auth, setAuth] = useState(false);
    const readSession = async () => {
        const res = await hasSignned();
        console.log(res);
        if (res.data.auth) {
            console.log('s');
            AuthApi.setAuth(true);
        }
    };
    useEffect(() => {
        readSession();
    }, []);
    console.log(auth);
    return (
        <div className="App">
            <AuthApi.Provider value={{ auth, setAuth }}>
                <BrowserRouter>
                    <Router></Router>
                </BrowserRouter>
            </AuthApi.Provider>
        </div>
    );
}

export default App;
