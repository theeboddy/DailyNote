import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"))

    const [auth, setAuth] = useState(storedAuth);
    const isAuthenticated = !!auth;

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth));
        console.log("данные в провайдере обновились:", auth)
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
