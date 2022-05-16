import { FC } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { useModal } from 'controllers/modals/useModal';
import { Modals } from 'controllers/modals/types';
import TimeInput from 'components/core/TimeInput';

interface FragmentFields {
  date: Date;
  from: number;
  to: string;
}
// /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
const TIME_MASK = [/^([0-2])/, /([0-9])/, ':', /[0-5]/, /[0-9]/];

const AddFragmentModal: FC = () => {
  const { isModalOpen, closeModal } = useModal();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isOpen = isModalOpen(Modals.AddFragmentModal);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FragmentFields>();

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onSubmit: SubmitHandler<FragmentFields> = (data) => {
    console.log(data);
  };

  return (
    <Modal isOpen={false} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add manual time</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction='column' spacing={4}>
              <Input placeholder='Date' {...register('date')} isInvalid={!!errors.date} />
              <Stack direction='row' spacing={4} alignItems='center'>
                <TimeInput />
                <Input
                  as={InputMask}
                  mask={TIME_MASK}
                  placeholder='10:30'
                  {...register('from')}
                  isInvalid={!!errors.from}
                />
                <Text fontSize='xl' fontWeight='bold'>
                  -
                </Text>
                <Input placeholder='11:30' {...register('from')} isInvalid={!!errors.from} />
                <span />
                <Text fontSize='large' fontWeight='bold'>
                  Total:
                </Text>
                <Input placeholder='Total' readOnly />
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={closeModal}>
              Cancel
            </Button>
            <Button colorScheme='brand' ml={3} type='submit'>
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddFragmentModal;
