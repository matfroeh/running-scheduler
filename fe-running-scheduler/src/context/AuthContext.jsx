import { createContext, useContext } from 'react';
 
const AuthContext = createContext();
 
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthContextProvider');
  return context;
};
 
export { AuthContext, useAuth };