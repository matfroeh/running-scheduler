import { checkAuth } from "../data/auth";
import { Navigate } from "react-router";
// ToDO: it works, but there are limitations that make still the AuthContextProvider the better choice

export const authLoader = async () => {
  const auth = await checkAuth()
    .then(() => {
      return true;
    })
    .catch(() => {
      return Navigate("/welcome");
    });

    // console.log(auth);
    
    return auth;
};
