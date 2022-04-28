import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { get, post, remove } from 'utils/api';
import { useAuth } from 'controllers/auth/useAuth';
import { ResultType } from 'utils/responseType';
import { useModal } from 'controllers/modals/useModal';

import { Project, Tracker } from './types';

interface ProjectsContextType {
  projects: Project[];
  trackers: Tracker[];
  toggleTracker: (projectId: number) => void;
  deleteProject: (projectId: number) => void;
  createProject: (title: string) => void;
}

const noop = () => {};

const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  trackers: [],
  toggleTracker: noop,
  deleteProject: noop,
  createProject: noop,
});

export const ProjectsProvider: FC = ({ children }) => {
  const { isAuthorized } = useAuth();
  const { closeModal } = useModal();
  const [projects, setProjects] = useState<Project[]>([]);
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const toast = useToast();

  const toggleTracker = useCallback((project: number) => {
    post('/tracker', { project })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
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
        .catch((error) => {
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
        .catch((error) => {
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
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (isAuthorized) {
      get<Project[]>('/projects')
        .then((response) => {
          if (response) {
            const { data } = response;
            setProjects(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isAuthorized]);

  return (
    <ProjectsContext.Provider value={{ projects, trackers, toggleTracker, createProject, deleteProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
