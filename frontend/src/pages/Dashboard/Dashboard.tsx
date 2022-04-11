import { Outlet } from 'react-router-dom';

import MainLayout from 'components/layouts/MainLayout';

const Dashboard = () => (
  <>
    <MainLayout>
      <Outlet />
    </MainLayout>
  </>
);

export default Dashboard;
