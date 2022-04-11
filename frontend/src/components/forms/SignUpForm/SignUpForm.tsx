import { FC } from 'react';
import { Stack, Input, Button, Text } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from '@emotion/styled';
import * as yup from 'yup';

import { SignUpType } from 'controllers/useAuth';
import regexps from 'utils/regexps';

interface Props {
  onSignIn: () => void;
}

const PasswordReqs = styled('div')(() => ({
  background: '#fafafa',
  padding: '8px 12px',
  borderRadius: 6,
}));

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    business: yup.string(),
    email: yup.string().trim().email().required(),
    password: yup.string().trim().matches(regexps.password).required(),
  })
  .required();

const onSubmit: SubmitHandler<SignUpType> = (data) => {
  console.log(data);
};

const SignUpForm: FC<Props> = ({ onSignIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Input placeholder='First name' {...register('firstName')} isInvalid={!!errors.firstName} />
            {errors.firstName && (
              <Text color='red' fontSize='sm'>
                {errors.firstName.message}
              </Text>
            )}
          </Stack>
          <Stack spacing={1}>
            <Input placeholder='Last name' {...register('lastName')} isInvalid={!!errors.lastName} />
            {errors.lastName && (
              <Text color='red' fontSize='sm'>
                {errors.lastName.message}
              </Text>
            )}
          </Stack>
          <Input placeholder='What do you do?' {...register('business')} />
          <Stack spacing={1}>
            <Input placeholder='E-mail' {...register('email')} isInvalid={!!errors.email} />
            {errors.email && (
              <Text color='red' fontSize='sm'>
                {errors.email.message && 'Wrong email format'}
              </Text>
            )}
          </Stack>
          <Stack spacing={1}>
            <Input placeholder='Password' type='password' {...register('password')} isInvalid={!!errors.password} />
            {errors.password && (
              <Text color='red' fontSize='sm'>
                {errors.password.message && 'Wrong password format'}
              </Text>
            )}
            <PasswordReqs>
              <Text color='gray.400' fontSize='sm'>
                Password must contain:<br />
                - more then 8 symbols<br />
                - Aa-Zz letters<br />
                - /*#- symbols<br />
                - numbers
              </Text>
            </PasswordReqs>
          </Stack>
        </Stack>
        <Stack spacing={4} direction='row'>
          <Button width='100%' onClick={onSignIn}>
            Sign In
          </Button>
          <Button width='100%' variant='solid' colorScheme='brand' type='submit'>
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default SignUpForm;
