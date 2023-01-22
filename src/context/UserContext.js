import { createContext, useState } from "react";


const userContext = createContext();

export const ContextProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const logout = () => {
        localStorage.removeItem('user');
        alert("Logged Out Sucessfully")
    }

    return (
        <userContext.Provider
            value={{
                user,
                setUser,
                logout
            }}>
            {children}
        </userContext.Provider>
    )
}

export default userContext;