import { createContext } from 'react';

export type AuthContextType = {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
