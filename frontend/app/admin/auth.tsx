"use client";

import { createContext, useContext } from "react";

export const AuthContext = createContext<{
  token: string | null;
  setToken: (t: string | null) => void;
  logout: () => void;
}>({ token: null, setToken: () => {}, logout: () => {} });

export function useAuth() {
  return useContext(AuthContext);
}
