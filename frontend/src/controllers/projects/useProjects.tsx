import { createContext, FC, useContext, useEffect, useState } from 'react';

import { eventStream, get } from 'utils/api';
import { useAuth } from 'controllers/auth/useAuth';
import useErrorHandler from 'hooks/useErrorHandler';

import { Project, Tracker } from './types';
import useProjectCallbacks from './hooks/useProjectCallbacks';

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const { createProject, toggleTracker, updateProject, deleteProject } = useProjectCallbacks(projects, setProjects);
  const onErrorHandler = useErrorHandler();

  useEffect(() => {
    const eventSource = eventStream('/tracker/stream');

    // eslint-disable-next-line unicorn/prefer-add-event-listener
    eventSource.onmessage = (message) => {
      console.log(message);
      get<Tracker[]>('/tracker')
        .then((response) => {
          if (response) {
            const { data } = response;
            console.log({ data });
            setTrackers(data);
          }
        })
        .catch(() => {});
    };
  }, []);

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
