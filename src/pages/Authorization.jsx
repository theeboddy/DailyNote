import React from "react";
import Login from "../components/UI/login/Login";
import { AuthProvider } from "../context/AuthProvider";
import "../styles/Authorization.css"

const Authorization = () => {
    
    return ( 
        <div>
            <AuthProvider>
                <Login/>
            </AuthProvider>
        </div>
     );
}
 
export default Authorization;
