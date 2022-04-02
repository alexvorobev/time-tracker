import { background, Button, Stack, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { FC } from "react";
import LogoutButton from "../../navigation/LogoutButton";
import HomeIcon from "./icons/HomeIcon";
import ProjectsIcon from "./icons/ProjectsIcon";
import SettingsIcons from "./icons/SettingsIcon";

const MainWrapper = styled.div(`
    display: grid;
    grid-template-columns: 2fr 10fr;
    gap: 24px;
    max-width: 1224px;
    margin: 0 auto;
    height: 100vh;
    padding: 32px 0 48px;
`);

const NavigationItem = styled(Button)(`
    justify-content: flex-start;
`);

const NavigationBar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ContentWrapper = styled.div`
    padding-left: 0px;
`;

const MainLayout:FC = ({children}) =>
<MainWrapper>
    <NavigationBar>
        <Stack spacing={10}>
            <Text fontSize="2xl" fontWeight={800} textAlign='center'>TimeTracker</Text>
            <Stack spacing={2}>
                <NavigationItem variant='ghost' leftIcon={<HomeIcon />} iconSpacing={3}>Dashboard</NavigationItem>
                <NavigationItem variant='ghost' leftIcon={<ProjectsIcon />} iconSpacing={3}>Projects</NavigationItem>
                <NavigationItem variant='ghost' leftIcon={<SettingsIcons />} iconSpacing={3}>Settings</NavigationItem>
            </Stack>
        </Stack>

        <div>
            <LogoutButton />
        </div>
    </NavigationBar>
    <ContentWrapper>
        {children}
    </ContentWrapper>
</MainWrapper>;

export default MainLayout;