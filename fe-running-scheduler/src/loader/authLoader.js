import { checkAuth } from "../data/auth";

// ToDO: it works, but there are limitations that make still the AuthContextProvider the better choice

export const authLoader = async () => {
  const auth = await checkAuth()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });

    console.log(auth);
    
    return auth;
};
