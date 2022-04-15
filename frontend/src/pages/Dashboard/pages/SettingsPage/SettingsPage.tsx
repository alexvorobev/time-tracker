import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import AboutArticle from 'components/AboutArticle';

import UpdateUserForm from 'components/forms/UpdateUserForm';
import UpdateUserPasswordForm from 'components/forms/UpdateUserPasswordForm';

const tabsList = ['User', 'About'];

const activeStyle = {
  background: 'gray.100',
};

const UserSettingsGrid = styled('div')(() => ({
  display: 'flex',
  gap: 32,
  alignItems: 'flex-start',
}));

const SettingsCard = styled(Box)(() => ({
  padding: 24,
  borderRadius: 16,
  height: 'auto',
  flex: '1 1 50%',
}));

const SettingsPage = () => {
  return (
    <Tabs variant='soft-rounded'>
      <TabList gap={4}>
        {tabsList.map((item) => (
          <Tab key={item} _selected={activeStyle} _hover={activeStyle}>
            {item}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        <TabPanel>
          <UserSettingsGrid>
            <SettingsCard borderWidth='1px'>
              <UpdateUserForm />
            </SettingsCard>
            <SettingsCard borderWidth='1px'>
              <UpdateUserPasswordForm />
            </SettingsCard>
          </UserSettingsGrid>
        </TabPanel>
        <TabPanel>
          <AboutArticle />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SettingsPage;
