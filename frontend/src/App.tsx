import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes as RotesList } from 'react-router-dom';

import './App.css';
import Dashboard from 'pages/Dashboard';
import HomePage from 'pages/Dashboard/pages/HomePage';
import SettingsPage from 'pages/Dashboard/pages/SettingsPage';
import ProjectsPage from 'pages/Dashboard/pages/ProjectsPage';
import Routes from 'routes';

function App() {
  return (
    <ChakraProvider>
      <RotesList>
        <Route path='/' element={<Dashboard />}>
          <Route path={Routes.HOME} element={<HomePage />} />
          <Route path={Routes.PROJECTS} element={<ProjectsPage />} />
          <Route path={Routes.SETTINGS} element={<SettingsPage />} />
        </Route>
      </RotesList>
    </ChakraProvider>
  );
}

export default App;
