import { useCallback } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Modals } from 'controllers/modals/types';
import { useModal } from 'controllers/modals/useModal';
import { useProjects } from 'controllers/projects/useProjects';
import PlayIcon from 'components/navigation/TrackersList/components/TrackerButton/icons/PlayIcon';

interface CreateTrackerFields {
  project: number;
}

const AddTrackerModal = () => {
  const { isModalOpen, closeModal } = useModal();
  const { handleSubmit, register } = useForm<CreateTrackerFields>({});
  const { projects, trackers, toggleTracker } = useProjects();
  const isOpen = isModalOpen(Modals.AddTrackerModal);

  const renderedOptionsList = projects.map(({ id, title }) => (
    <option value={id} key={id} disabled={trackers.findIndex((item) => item.project === id) >= 0}>
      {title}
    </option>
  ));

  const onSubmit: SubmitHandler<CreateTrackerFields> = useCallback(
    (data) => {
      if (data) {
        toggleTracker(+data.project);
        closeModal();
      }
    },
    [toggleTracker, closeModal],
  );

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>New project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select placeholder='Select project...' {...register('project')}>
              {renderedOptionsList}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={closeModal}>
              Cancel
            </Button>
            <Button colorScheme='brand' ml={3} type='submit' rightIcon={<PlayIcon size={24} />}>
              Run
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddTrackerModal;
