import { Outlet } from 'react-router-dom';

import MainLayout from 'components/layouts/MainLayout';
import { ProjectsProvider } from 'controllers/projects/useProjects';
import { ModalProvider } from 'controllers/modals/useModal';

const Dashboard = () => (
  <ProjectsProvider>
    <ModalProvider>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </ModalProvider>
  </ProjectsProvider>
);

export default Dashboard;
