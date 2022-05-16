import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

import { useModal } from 'controllers/modals/useModal';
import { update, ErrorResponse, remove, post } from 'utils/api';
import { Project } from '../types';
import { ResultType } from 'utils/responseType';

const useProjectCallbacks = (projects: Project[], setProjects: (data: Project[]) => void) => {
  const { closeModal } = useModal();
  const toast = useToast();

  const toggleTracker = useCallback((project: number) => {
    post('/tracker', { project })
      .then((data) => {
        console.log(data);
      })
      .catch((error: ErrorResponse) => {
        console.log(error);
      });
  }, []);

  const createProject = useCallback(
    (title: string) => {
      post<Pick<Project, 'title'>, ResultType<Project>>('/projects', { title })
        .then((response) => {
          if (response) {
            const { data } = response;
            setProjects([...projects, data]);
            closeModal();
            toast({
              title: `Project ${data.title} created.`,
              description: "We've successfully created a new project for you!",
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
          }
        })
        .catch((error: ErrorResponse) => {
          toast({
            title: 'Error!',
            description: 'Something gone wrong!',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        });
    },
    [closeModal, projects, setProjects, toast],
  );

  const deleteProject = useCallback(
    (id: number) => {
      remove(`/projects/${id}`)
        .then((response) => {
          if (response) {
            const { data } = response;
            setProjects(projects.filter((item) => item.id !== id));
            closeModal();
            toast({
              title: `Project ${data.title} removed.`,
              description: "We've successfully removed a project for you!",
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
          }
        })
        .catch((error: ErrorResponse) => {
          toast({
            title: 'Error!',
            description: 'Something gone wrong!',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        });
    },
    [closeModal, projects, setProjects, toast],
  );

  const updateProject = useCallback(
    (id, title: string) => {
      update(`/projects/${id}`, { title })
        .then((response) => {
          if (response) {
            const { data } = response;
            const { id: updatedId, title: updatedTitle } = data;
            const index = projects.findIndex((item) => item.id === updatedId);
            const updatedProject = projects[index];
            updatedProject.title = updatedTitle;
            setProjects([...projects.filter((item) => item.id !== updatedId), updatedProject]);
            closeModal();
            toast({
              title: `Project ${updatedTitle} updated.`,
              description: "We've successfully updated a project for you!",
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
          }
        })
        .catch((error: ErrorResponse) => {
          toast({
            title: 'Error!',
            description: 'Something gone wrong!',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        });
    },
    [closeModal, toast, projects, setProjects],
  );

  return {
    createProject,
    toggleTracker,
    updateProject,
    deleteProject,
  };
};

export default useProjectCallbacks;
