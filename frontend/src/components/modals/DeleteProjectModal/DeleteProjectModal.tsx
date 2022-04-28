import { FC, useCallback, useRef } from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';

import { Modals } from 'controllers/modals/types';
import { useModal } from 'controllers/modals/useModal';
import { useProjects } from 'controllers/projects/useProjects';

interface Props {
  id?: number;
}

const DeleteProjectModal: FC<Props> = ({ id }) => {
  const { isModalOpen, closeModal } = useModal();
  const { deleteProject, projects } = useProjects();
  const isOpen = isModalOpen(Modals.DeleteProjectModal);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const project = projects.find((item) => item.id === id);

  const onDelete = useCallback(() => (!!id ? deleteProject(id) : () => {}), [deleteProject, id]);

  return (
    <AlertDialog isOpen={isOpen} onClose={closeModal} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete {project?.title || ''} project
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={closeModal}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteProjectModal;
