export const getLocalStorageToken = () => {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    return {};
  }

  return { accessToken };
};
export const setLocalStorageToken = (token: string) => localStorage.setItem('access_token', token);

export const clearStorage = () => localStorage.removeItem('access_token');
