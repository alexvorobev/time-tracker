import { Stack, Input, Text, Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { UpdateUserType } from 'controllers/auth/types';
import { useAuth } from 'controllers/auth/useAuth';

const schema = yup
  .object({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().trim().email(),
    password: yup.string(),
    newPassword: yup.string(),
    repeatPassword: yup.string(),
  })
  .required();

const UpdateUserForm = () => {
  const { userInfo } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserType>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
    },
  });

  const onSubmit = useCallback((data?: UpdateUserType) => {
    console.log({ data });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Text fontSize='large' fontWeight='bold'>
          User info
        </Text>
        <Stack spacing={1}>
          <Input value='alexvorobev01@gmail.com' isReadOnly isDisabled />
        </Stack>
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
        <Stack spacing={2} direction='row'>
          <Button type='submit' variant='solid' colorScheme='brand'>
            Save
          </Button>
          <Button onClick={() => reset()}>Reset</Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default UpdateUserForm;
