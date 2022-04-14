import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

const tabsList = ['User', 'About'];

const activeStyle = {
  background: 'gray.100',
};

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
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SettingsPage;
