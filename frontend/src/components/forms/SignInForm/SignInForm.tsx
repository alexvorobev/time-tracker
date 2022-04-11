import { FC } from 'react';
import { Stack, Input, Button, Text } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { SignInType } from 'controllers/useAuth';
import regexps from 'utils/regexps';

interface Props {
  onSignUp: () => void;
}

const schema = yup
  .object({
    email: yup.string().trim().email().required(),
    password: yup.string().trim().matches(regexps.password).required(),
  })
  .required();

const onSubmit: SubmitHandler<SignInType> = (data) => {
  console.log(data);
};

const SignInForm: FC<Props> = ({ onSignUp }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Input placeholder='E-mail' {...register('email')} isInvalid={!!errors.email} />
            {errors.email && (
              <Text color='red' fontSize='sm'>
                {errors.email.message && 'Wrong email'}
              </Text>
            )}
          </Stack>
          <Stack spacing={1}>
            <Input placeholder='Password' type='password' {...register('password')} isInvalid={!!errors.password} />
            {errors.password && (
              <Text color='red' fontSize='sm'>
                {errors.password.message && 'Wrong password'}
              </Text>
            )}
          </Stack>
        </Stack>
        <Stack spacing={4} direction='row'>
          <Button width='100%' onClick={onSignUp}>
            Sign Up
          </Button>
          <Button width='100%' variant='solid' colorScheme='brand' type='submit'>
            Sign In
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default SignInForm;
