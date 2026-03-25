import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const savedUser = localStorage.getItem('user');
        if(savedUser){
            setUser(JSON.parse(savedUser))
            setIsLoggedIn(true)
        }
        setLoading(false)
    },[])

    const login = (userData)=>{
        setUser(userData)
        setIsLoggedIn(true)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logout = () =>{
        setUser(null)
        setIsLoggedIn(false)
        localStorage.removeItem('user')
    }

    const values = {
        login,
        logout,
        user, 
        isLoggedIn, 
        loading
    }

    return (
    <AuthContext.Provider value={ values }>
        {children}
    </AuthContext.Provider>
    );
}

export const useAuth = ()=>{
    const context = useContext(AuthContext)

    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}