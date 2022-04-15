import { FC, createContext, useContext, useCallback } from 'react';

import { isEmail } from 'utils/validators';

export interface SignInType {
  email: string;
  password: string;
}

export interface SignUpType extends SignInType {
  firstName: string;
  lastName: string;
  business?: string;
}

export interface UpdateUserType extends Partial<SignUpType> {
  newPassword?: string;
  repeatPassword?: string;
}

interface AuthContextType {
  signIn?: (data: SignInType) => void;
  signUp?: (data: SignUpType) => void;
  signOut?: () => void;
}

const noop = () => {};

export const AuthContext = createContext<AuthContextType>({
  signUp: noop,
  signIn: noop,
  signOut: noop,
});

export const AuthProvider: FC = ({ children }) => {
  const signUp = useCallback((data: SignUpType) => {
    const { email } = data;
    if (!isEmail(email)) {
      throw new Error('invalid email');
    }

    console.log(data);
  }, []);

  const signIn = useCallback((data: SignInType) => {
    const { email } = data;
    if (!isEmail(email)) {
      throw new Error('invalid email');
    }
    console.log(data);
  }, []);

  const signOut = useCallback(() => {
    console.log('logout');
  }, []);

  return <AuthContext.Provider value={{ signUp, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
