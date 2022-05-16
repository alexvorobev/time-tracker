import { FC, createContext, useContext, useCallback, useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

import { get } from 'utils/api';
import useLoadingState from 'hooks/useLoadingState';
import { useToggleState } from 'hooks/useToggleState';
import Routes from 'routes';

import { SignInType, SignUpType, RequestType, SignUpResponse } from './types';
import sendRequest from './utils/sendAuthRequest';
import { clearStorage, getLocalStorageToken, setLocalStorageToken } from './utils/manageLocalStorage';

type UserInfo = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};
interface AuthContextType {
  userInfo: UserInfo;
  isLoading?: boolean;
  isAuthorized?: boolean;
  signIn: (data: SignInType) => void;
  signUp: (data: SignUpType) => void;
  signOut: () => void;
}

const noop = () => {};

const DEFAULT_USER_INFO = {
  id: -1,
  email: '',
  firstName: '',
  lastName: '',
};

export const AuthContext = createContext<AuthContextType>({
  userInfo: DEFAULT_USER_INFO,
  signUp: noop,
  signIn: noop,
  signOut: noop,
});

const FORWARD_LAG = 1000;

export const AuthProvider: FC = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(DEFAULT_USER_INFO);
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

  useEffect(() => {
    get<UserInfo>('/user')
      .then(({ data }) => {
        setUserInfo(data);
      })
      .catch(() => {
        signOut();
      });
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{
        isAuthorized,
        userInfo,
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
