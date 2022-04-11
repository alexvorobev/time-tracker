import { Stack, Text } from '@chakra-ui/react';

import SignInForm from 'components/forms/SignInForm';
import SignUpForm from 'components/forms/SignUpForm';
import LoginLayout from 'components/layouts/LoginLayout';
import { useToggleState } from 'hooks/useToggleState';

const LoginPage = () => {
  const { isOpen: isSignUp, toggle } = useToggleState();
  const subtitleText = isSignUp ? 'Sign up to be productivity' : 'Login with your credentials';

  const renderedSignIn = !isSignUp && <SignInForm onSignUp={toggle} />;

  const renderedSignUp = isSignUp && <SignUpForm onSignIn={toggle} />;

  return (
    <div>
      <LoginLayout>
        <Stack spacing={8}>
          <Stack spacing={4}>
            <Text fontSize='2xl' fontWeight={800} textAlign='center' color='brand.primary'>
              Welcome
            </Text>
            <Text fontSize='lg' textAlign='center'>
              {subtitleText}
            </Text>
          </Stack>
          {renderedSignIn}
          {renderedSignUp}
        </Stack>
      </LoginLayout>
    </div>
  );
};

export default LoginPage;
