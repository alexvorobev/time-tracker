import { Stack, Text, Button, Input } from '@chakra-ui/react';

import LoginLayout from 'components/layouts/LoginLayout';
import { useToggleState } from 'hooks/useToggleState';

const LoginPage = () => {
  const { isOpen: isSignUp, toggle } = useToggleState();
  const subtitleText = isSignUp ? 'Sign up to be productivity' : 'Login with your credentials';

  const renderedSignIn = !isSignUp && (
    <Stack spacing={4}>
      <Stack spacing={4}>
        <Input placeholder='E-mail' />
        <Input placeholder='Password' type='password' />
      </Stack>
      <Stack spacing={4} direction='row'>
        <Button width='100%' onClick={toggle}>
          Sign Up
        </Button>
        <Button width='100%' variant='solid' colorScheme='brand'>
          Sign In
        </Button>
      </Stack>
    </Stack>
  );

  const renderedSignUp = isSignUp && (
    <Stack spacing={4}>
      <Stack spacing={4}>
        <Input placeholder='First name' />
        <Input placeholder='Last name' />
        <Input placeholder='What do you do?' />
        <Input placeholder='E-mail' />
        <Input placeholder='Password' type='password' />
      </Stack>
      <Stack spacing={4} direction='row'>
        <Button width='100%' onClick={toggle}>
          Sign In
        </Button>
        <Button width='100%' variant='solid' colorScheme='brand'>
          Sign Up
        </Button>
      </Stack>
    </Stack>
  );

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
