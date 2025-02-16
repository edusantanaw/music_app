import { createContext, ReactNode, useLayoutEffect, useState } from "react";
import authService from "../services/auth-service";
import { API_URL } from "../shared/constants/Api";

interface IAuthContext {
  authenticated: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
  verifyUserAuth: () => Promise<boolean>;
}

export const AuthContext = createContext({} as IAuthContext);

interface IAuthProvider {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useLayoutEffect(() => {
    verifyUserAuth();
  }, []);

  async function verifyUserAuth() {
    const isAuthenticated = await authService.verifyAuth();
    setAuthenticated(isAuthenticated);
    return isAuthenticated
  }

  function handleLogin() {
    window.location.href = `${API_URL}/google`;
  }

  function handleLogout() {
    window.location.href = `${API_URL}/logout`;
  }

  return (
    <AuthContext.Provider
      value={{ authenticated, handleLogin, handleLogout, verifyUserAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
