import { Stack, Input, Text, Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { UpdateUserType } from 'controllers/useAuth';

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
          User info
        </Text>
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
        <div>
          <Button type='submit' variant='solid'>
            Save
          </Button>
        </div>
      </Stack>
    </form>
  );
};

export default UpdateUserForm;
