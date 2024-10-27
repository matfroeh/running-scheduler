import { useState, useEffect } from "react";
// import Cookies from "universal-cookie";
import { checkAuth } from "../data/auth";
import { AuthContext } from "./AuthContext";

// this could be used instead of the checkSession state
// const cookies = new Cookies();
// const checkCookie = cookies.get("checkCookie");

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [checkSession, setCheckSession] = useState(true);

  // console.log(user);
  

  // will be used as a toggle effect
  useEffect(() => {
    // console.log("checkSession called");
    
    const checkToken = async () => {
      await checkAuth()
        .then((user) => {
          setUser(user);
          setAuth(true);
        })
        .catch(() => {
          setAuth(false);
          setUser(null);
        }).finally(() => {
          setCheckSession(false);
        });
    };
    checkToken();
  }, [checkSession]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, user, setUser, setCheckSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
