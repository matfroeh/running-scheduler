import { useState, useEffect } from "react";
// import Cookies from "universal-cookie";
import { checkAuth, logout } from "@/data";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";
import { QueryClient } from "@tanstack/react-query";

// this could be used instead of the checkSession state
// const cookies = new Cookies();
// const checkCookie = cookies.get("checkCookie");

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState(false);
    const [checkSession, setCheckSession] = useState(true);

    // console.log(user);
    // console.log("auth at context", auth);

    useEffect(() => {
        const checkToken = async () => {
            await checkAuth()
                .then((user) => {
                    setUser(user);
                    setAuth(true);
                })
                .catch(() => {
                    setAuth(false);
                    setUser(null);
                })
                .finally(() => {
                    setCheckSession(false);
                });
        };
        checkSession && checkToken();

        return () => {
            setCheckSession(false);
        };
    }, [checkSession]);

    const logOut = async () => {
        try {
            const res = await logout();
            console.log("logout res", res);

            // Clear the cache
            const queryClient = new QueryClient();
            queryClient.clear();

            toast.success("You have been logged out");
            setAuth(false);
            setUser(null);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <AuthContext.Provider
            value={{ auth, user, setUser, setCheckSession, logOut }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContextProvider };
