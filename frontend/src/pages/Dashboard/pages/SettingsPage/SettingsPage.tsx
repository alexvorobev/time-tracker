import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

import UpdateUserForm from 'components/forms/UpdateUserForm';

const tabsList = ['User', 'About'];

const activeStyle = {
  background: 'gray.100',
};

const UserSettingsGrid = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 32,
}));

const SettingsCard = styled(Box)(() => ({
  padding: 24,
  borderRadius: 16,
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
              <UpdateUserForm />
            </SettingsCard>
          </UserSettingsGrid>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SettingsPage;
