import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const storedAuth = JSON.parse(localStorage.getItem("auth")) || {
        username: "",
        roles: "",
        avatar: "",
        accessToken: ""
    };

    const [auth, setAuth] = useState(storedAuth);
    const isAuthenticated = !!auth;

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth));
    }, [auth]);

    return (
        <AuthContext.Provider value={{auth, setAuth, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
