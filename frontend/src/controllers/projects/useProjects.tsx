import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react';

import { get, post } from 'utils/api';
import { useAuth } from 'controllers/auth/useAuth';

import { Project, Tracker } from './types';

interface ProjectsContextType {
  projects: Project[];
  trackers: Tracker[];
  toggleTracker: (projectId: number) => void;
}

const noop = () => {};

const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  trackers: [],
  toggleTracker: noop,
});

export const ProjectsProvider: FC = ({ children }) => {
  const { isAuthorized } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  console.log({ setTrackers });

  const toggleTracker = useCallback((project: number) => {
    post('/tracker', { project })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
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

  return <ProjectsContext.Provider value={{ projects, trackers, toggleTracker }}>{children}</ProjectsContext.Provider>;
};

export const useProjects = () => useContext(ProjectsContext);
