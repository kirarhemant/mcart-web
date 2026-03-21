import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import {
  onIdTokenChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  getIdToken,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import type { User } from "firebase/auth";

type AuthCtx = {
  user: User | null;
  idToken: string | null;
  loading: boolean;
  signup: (email: string, pass: string) => Promise<void>;
  signin: (email: string, pass: string) => Promise<void>;
  loginGoogle: () => Promise<void>;
  loginGitHub: () => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);
export const useAuth = () => useContext(Ctx)!;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // keep token fresh
  useEffect(() => {
    const unsub = onIdTokenChanged(auth, async (u) => {
	  console.log("Auth state:", u);
      setUser(u);
      setIdToken(u ? await getIdToken(u, /*forceRefresh*/ false) : null);
      setLoading(false);
    });
    // refresh token every 50 min (optional)
    const timer = setInterval(async () => {
      if (auth.currentUser) setIdToken(await getIdToken(auth.currentUser, true));
    }, 50 * 60 * 1000);
    return () => { unsub(); clearInterval(timer); };
  }, []);

  const signup = async (email:string, pass:string ) => {
    await createUserWithEmailAndPassword(auth, email, pass);
  }

  const signin = async (email:string, pass:string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  }
  const loginGoogle = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
  };
  const loginGitHub = async () => {
    await signInWithPopup(auth, new GithubAuthProvider());
  };
  const logout = () => signOut(auth);

  return (
    <Ctx.Provider value={{ user, idToken, loading, signup, signin, loginGoogle, loginGitHub, logout }}>
      {children}
    </Ctx.Provider>
    
  );
};