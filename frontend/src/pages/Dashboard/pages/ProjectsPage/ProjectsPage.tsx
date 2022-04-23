import ProjectsList from 'components/ProjectsList';
import { useProjects } from 'controllers/projects/useProjects';

const ProjectsPage = () => {
  const { projects } = useProjects();

  return (
    <div>
      <ProjectsList projects={projects} />
    </div>
  );
};

export default ProjectsPage;
