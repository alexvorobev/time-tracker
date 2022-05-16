import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { ErrorResponse, eventStream, get, post, remove, update } from 'utils/api';
import { useAuth } from 'controllers/auth/useAuth';
import { ResultType } from 'utils/responseType';
import { useModal } from 'controllers/modals/useModal';
import useErrorHandler from 'hooks/useErrorHandler';

import { Project, Tracker } from './types';

interface ProjectsContextType {
  projects: Project[];
  trackers: Tracker[];
  toggleTracker: (projectId: number) => void;
  createProject: (title: string) => void;
  updateProject: (id: number, title: string) => void;
  deleteProject: (projectId: number) => void;
}

const noop = () => {};

const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  trackers: [],
  toggleTracker: noop,
  createProject: noop,
  updateProject: noop,
  deleteProject: noop,
});

export const ProjectsProvider: FC = ({ children }) => {
  const { isAuthorized } = useAuth();
  const { closeModal } = useModal();
  const [projects, setProjects] = useState<Project[]>([]);
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const toast = useToast();
  const onErrorHandler = useErrorHandler();

  useEffect(() => {
    const eventSource = eventStream();

    // eslint-disable-next-line unicorn/prefer-add-event-listener
    eventSource.onmessage = (message) => {
      console.log(message);
      get<Tracker[]>('/tracker')
        .then((response) => {
          if (response) {
            const { data } = response;
            setTrackers(data);
          }
        })
        .catch(() => {});
    };
  }, []);

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
    [closeModal, projects, toast],
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
    [closeModal, toast, projects],
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
    [closeModal, projects, toast],
  );

  useEffect(() => {
    if (isAuthorized) {
      get<Tracker[]>('/tracker')
        .then((response) => {
          if (response) {
            const { data } = response;
            setTrackers(data);
          }
        })
        .catch(onErrorHandler);
    }
  }, [isAuthorized, onErrorHandler]);

  useEffect(() => {
    if (isAuthorized) {
      get<Project[]>('/projects')
        .then((response) => {
          if (response) {
            const { data } = response;
            setProjects(data);
          }
        })
        .catch(onErrorHandler);
    }
  }, [isAuthorized, onErrorHandler]);

  return (
    <ProjectsContext.Provider
      value={{ projects, trackers, toggleTracker, createProject, updateProject, deleteProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
