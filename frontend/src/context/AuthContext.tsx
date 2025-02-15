import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import authService from "../services/auth-service";

interface IAuthContext {
  authenticated: boolean;
}

const AuthContext = createContext({} as IAuthContext);

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
  }

  return (
    <AuthContext.Provider value={{ authenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
