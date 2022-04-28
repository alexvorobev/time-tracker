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
} from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Project } from 'controllers/projects/types';
import { useModal } from 'controllers/modals/useModal';
import { Modals } from 'controllers/modals/types';
import { useProjects } from 'controllers/projects/useProjects';

type CreateProjectFields = Pick<Project, 'title'>;

const schema = yup
  .object({
    title: yup.string().required(),
  })
  .required();

const AddProjectModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectFields>({
    resolver: yupResolver(schema),
  });
  const { isModalOpen, closeModal } = useModal();
  const { createProject } = useProjects();
  const isOpen = isModalOpen(Modals.AddProjectModal);

  const onSubmit: SubmitHandler<CreateProjectFields> = (data) => {
    if (data) {
      createProject(data.title);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>New project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder='Project title' {...register('title')} isInvalid={!!errors.title} />
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

export default AddProjectModal;
