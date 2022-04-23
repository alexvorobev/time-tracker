import { Outlet } from 'react-router-dom';

import MainLayout from 'components/layouts/MainLayout';
import { ProjectsProvider } from 'controllers/projects/useProjects';

const Dashboard = () => (
  <ProjectsProvider>
    <MainLayout>
      <Outlet />
    </MainLayout>
  </ProjectsProvider>
);

export default Dashboard;
