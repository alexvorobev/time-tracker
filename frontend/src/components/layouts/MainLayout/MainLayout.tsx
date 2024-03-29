import { FC } from 'react';
import { Stack, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import LogoutButton from 'components/navigation/LogoutButton';
import NavigationButton from 'components/navigation/NavigationButton';
import Routes from 'routes';
import { ListProvider } from 'hooks/useListState';
import TrackersList from 'components/navigation/TrackersList';
import AddTrackerModal from 'components/modals/AddTrackerModal';

import HomeIcon from './icons/HomeIcon';
import ProjectsIcon from './icons/ProjectsIcon';
import SettingsIcons from './icons/SettingsIcon';

const MainWrapper = styled.div(`
    display: grid;
    grid-template-columns: 2fr 10fr;
    gap: 24px;
    width: calc(100vw - 128px);
    max-width: 1864px;
    margin: 0 auto;
    height: 100vh;
    padding: 32px 0 48px;
`);

const NavigationBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 100vh;
  position: sticky;
  top: 32px;
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  max-width: 184px;
`;

const ContentWrapper = styled.div`
  padding-left: 0px;
  padding-bottom: 128px;
`;

const MainLayout: FC = ({ children }) => (
  <MainWrapper>
    <div>
      <NavigationBar>
        <Stack spacing={10}>
          <Text fontSize='2xl' fontWeight={800} textAlign='center'>
            TimeTracker
          </Text>
          <Stack spacing={2}>
            <NavigationButton icon={<HomeIcon />} to={Routes.HOME}>
              Overview
            </NavigationButton>
            <NavigationButton icon={<ProjectsIcon />} to={Routes.PROJECTS}>
              Projects
            </NavigationButton>
            <NavigationButton icon={<SettingsIcons />} to={Routes.SETTINGS}>
              Settings
            </NavigationButton>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <TrackersList />
          <LogoutButton />
        </Stack>
      </NavigationBar>
    </div>
    <ContentWrapper>
      <ListProvider>{children}</ListProvider>
    </ContentWrapper>
    <AddTrackerModal />
  </MainWrapper>
);

export default MainLayout;
