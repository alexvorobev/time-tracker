import { useCallback, useState } from 'react';

const useLoadingState = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onStartLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const onEndLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    onStartLoading,
    onEndLoading,
  };
};

export default useLoadingState;
