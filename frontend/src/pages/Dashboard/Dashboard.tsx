import { Outlet } from 'react-router-dom';

import MainLayout from 'components/layouts/MainLayout';
import { ProjectsProvider } from 'controllers/projects/useProjects';
import { ModalProvider } from 'controllers/modals/useModal';

const Dashboard = () => (
  <ModalProvider>
    <ProjectsProvider>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </ProjectsProvider>
  </ModalProvider>
);

export default Dashboard;
