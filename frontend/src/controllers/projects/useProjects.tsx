import { createContext, FC, useContext, useEffect, useState } from 'react';

import { get } from 'utils/api';
import { useAuth } from 'controllers/auth/useAuth';

import { Project } from './types';

interface ProjectsContextType {
  projects: Project[];
}

const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
});

export const ProjectsProvider: FC = ({ children }) => {
  const { isAuthorized } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);

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

  return <ProjectsContext.Provider value={{ projects }}>{children}</ProjectsContext.Provider>;
};

export const useProjects = () => useContext(ProjectsContext);
