import { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Input,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react';

interface Props {
  onClose?: () => void;
}

const AddWeekModal: FC<Props> = ({ onClose }) => {
  return (
    <Modal
      size='3xl'
      isOpen
      onClose={function (): void {
        throw new Error('Function not implemented.');
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New week</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={8}>
            <Stack direction='row' alignItems='center' spacing={4}>
              <div>
                <Input placeholder='dd.mm.yyyy' />
              </div>
              <Text colorScheme='brand'>
                Please, input first day of the week. It should be <u>Monday</u>
              </Text>
            </Stack>
            <Stack spacing={2} direction='row'>
              <div>
                <Text fontSize='small' mb={2}>
                  Monday
                </Text>
                <Input value='8:40' />
              </div>
              <div>
                <Text fontSize='small' mb={2}>
                  Tuesday
                </Text>
                <Input value='8:40' />
              </div>
              <div>
                <Text fontSize='small' mb={2}>
                  Wednesday
                </Text>
                <Input value='8:40' />
              </div>
              <div>
                <Text fontSize='small' mb={2}>
                  Thursday
                </Text>
                <Input value='8:40' />
              </div>
              <div>
                <Text fontSize='small' mb={2}>
                  Friday
                </Text>
                <Input value='8:40' />
              </div>
              <div>
                <Text fontSize='small' mb={2}>
                  Saturday
                </Text>
                <Input value='8:40' />
              </div>
              <div>
                <Text fontSize='small' mb={2}>
                  Sunday
                </Text>
                <Input value='8:40' />
              </div>
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='brand' ml={3} onClick={onClose}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddWeekModal;
