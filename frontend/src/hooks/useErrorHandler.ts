/* eslint-disable no-magic-numbers */
import { useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

import { useAuth } from 'controllers/auth/useAuth';
import { ErrorResponse } from 'utils/api';

export enum ErrorCodes {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
}

const useErrorHandler = () => {
  const { signOut } = useAuth();
  const toast = useToast();

  const onErrorHandler = useCallback(
    (error: ErrorResponse) => {
      const { status } = error.response;

      if (status === ErrorCodes.Unauthorized) {
        signOut();

        return toast({
          title: 'Unauthorized!',
          description: 'Please authorize to continue using service',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }

      return toast({
        title: 'Error!',
        description: 'Something gone wrong!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
    [signOut, toast],
  );

  return onErrorHandler;
};

export default useErrorHandler;
