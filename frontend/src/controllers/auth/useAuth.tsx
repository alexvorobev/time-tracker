import { FC, createContext, useContext, useCallback, useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

import useLoadingState from 'hooks/useLoadingState';
import { useToggleState } from 'hooks/useToggleState';
import Routes from 'routes';

import { SignInType, SignUpType, RequestType, SignUpResponse } from './types';
import sendRequest from './utils/sendAuthRequest';
import { clearStorage, getLocalStorageToken, setLocalStorageToken } from './utils/manageLocalStorage';

interface AuthContextType {
  isLoading?: boolean;
  isAuthorized?: boolean;
  signIn: (data: SignInType) => void;
  signUp: (data: SignUpType) => void;
  signOut: () => void;
}

const noop = () => {};

export const AuthContext = createContext<AuthContextType>({
  signUp: noop,
  signIn: noop,
  signOut: noop,
});

const FORWARD_LAG = 1000;

export const AuthProvider: FC = ({ children }) => {
  const { isOpen: isAuthorized, setClosed: setUnauthorized, setOpen: setAuthorized } = useToggleState();
  const { isLoading, onStartLoading, onEndLoading } = useLoadingState();
  const navigate = useNavigate();
  const isLoginPage = useMatch(Routes.LOGIN);

  useEffect(() => {
    const { accessToken } = getLocalStorageToken();

    if (accessToken) {
      setAuthorized();
      if (isLoginPage) {
        navigate(Routes.HOME);
      }
    } else {
      setUnauthorized();
      navigate(Routes.LOGIN);
    }
  }, [navigate, setAuthorized, setUnauthorized, isLoginPage]);

  const onSuccess = useCallback(
    (response: SignUpResponse | void) => {
      if (response && !!response.data) {
        const { token } = response.data;
        if (token && typeof token === 'string') {
          setAuthorized();
          setLocalStorageToken(token);
          setTimeout(() => {
            navigate(Routes.HOME);
          }, FORWARD_LAG);
        }
      }
    },
    [navigate, setAuthorized],
  );

  const signOut = useCallback(() => {
    setUnauthorized();
    clearStorage();
    navigate(Routes.LOGIN);
  }, [setUnauthorized, navigate]);

  return (
    <AuthContext.Provider
      value={{
        isAuthorized,
        signUp: sendRequest(RequestType.SING_UP, onStartLoading, onEndLoading, onSuccess),
        signIn: sendRequest(RequestType.SING_IN, onStartLoading, onEndLoading, onSuccess),
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
