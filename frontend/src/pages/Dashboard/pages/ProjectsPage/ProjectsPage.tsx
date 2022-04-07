import ProjectsList from 'components/ProjectsList';
import { projectsMock } from 'components/ProjectsList/mocks/data';

const ProjectsPage = () => (
  <div>
    <ProjectsList projects={projectsMock} />
  </div>
);

export default ProjectsPage;
