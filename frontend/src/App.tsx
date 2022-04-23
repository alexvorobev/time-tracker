import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes as RotesList } from 'react-router-dom';

import './App.css';
import Dashboard from 'pages/Dashboard';
import HomePage from 'pages/Dashboard/pages/HomePage';
import SettingsPage from 'pages/Dashboard/pages/SettingsPage';
import ProjectsPage from 'pages/Dashboard/pages/ProjectsPage';
import Routes from 'routes';
import LoginPage from 'pages/Login';
import { AuthProvider } from 'controllers/auth/useAuth';

import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <RotesList>
          <Route path='/' element={<Dashboard />}>
            <Route path={Routes.HOME} element={<HomePage />} />
            <Route path={Routes.PROJECTS} element={<ProjectsPage />} />
            <Route path={Routes.SETTINGS} element={<SettingsPage />} />
          </Route>
          <Route path='/login' element={<LoginPage />} />
        </RotesList>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
