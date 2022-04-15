import { Stack, Input, Text, Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { UpdateUserType } from 'controllers/useAuth';
import regexps from 'utils/regexps';

const schema = yup
  .object({
    password: yup.string().matches(regexps.password),
    newPassword: yup.string().matches(regexps.password),
    repeatPassword: yup.string().matches(regexps.password),
  })
  .required();

const UpdateUserPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback((data?: UpdateUserType) => {
    console.log({ data });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Text fontSize='large' fontWeight='bold'>
          Password
        </Text>
        <Stack spacing={1}>
          <Input type='password' placeholder='Password' {...register('password')} isInvalid={!!errors.password} />
          {errors.password && (
            <Text color='red' fontSize='sm'>
              {errors.password.message && 'Wrong password format'}
            </Text>
          )}
        </Stack>
        <Stack spacing={1}>
          <Input
            type='password'
            placeholder='New password'
            {...register('newPassword')}
            isInvalid={!!errors.newPassword}
          />
          {errors.newPassword && (
            <Text color='red' fontSize='sm'>
              {errors.newPassword.message && 'Wrong password format'}
            </Text>
          )}
        </Stack>
        <Stack spacing={1}>
          <Input
            type='password'
            placeholder='Repeat password'
            {...register('repeatPassword')}
            isInvalid={!!errors.repeatPassword}
          />
          {errors.repeatPassword && (
            <Text color='red' fontSize='sm'>
              {errors.repeatPassword.message && 'Wrong password format'}
            </Text>
          )}
        </Stack>
        <div>
          <Button type='submit' variant='solid' colorScheme='brand'>
            Save
          </Button>
        </div>
      </Stack>
    </form>
  );
};

export default UpdateUserPasswordForm;
