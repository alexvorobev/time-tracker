import { post } from 'utils/api';
import { isEmail } from 'utils/validators';
import { SignInType, RequestType, SignUpType, SignUpResponse } from '../types';

const sendRequest = function <T extends SignInType>(
  requestType: RequestType,
  onStartLoading: () => void,
  onEndLoading: () => void,
  onSuccess: () => void,
) {
  return async (data: T) => {
    onStartLoading();
    const { email } = data;
    if (!isEmail(email)) {
      throw new Error('invalid email');
    }
    const requestUrl = requestType === RequestType.SING_IN ? '/login' : '/new';

    await post<SignUpType, SignUpResponse>(`/user${requestUrl}`, data, onEndLoading).then(onSuccess);
  };
};

export default sendRequest;
