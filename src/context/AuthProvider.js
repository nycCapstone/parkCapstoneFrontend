import { createContext, useState } from "react";
import { useRolesReducer } from "../hooks/RoleManager";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(true);
    const [roles, dispatchRoles] = useRolesReducer();

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist, roles, dispatchRoles }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;