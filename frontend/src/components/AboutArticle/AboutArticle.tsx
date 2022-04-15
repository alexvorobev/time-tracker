import { Text, Box, Stack, Button, Link } from '@chakra-ui/react';
import styled from '@emotion/styled';

const ActionArticleGrid = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: 32,
  alignItems: 'start',
}));

const SettingsCard = styled(Box)(() => ({
  padding: 24,
  borderRadius: 16,
  height: 'auto',
  flex: '1 1 50%',
}));

const AboutArticle = () => (
  <ActionArticleGrid>
    <Box>
      <Stack spacing={8}>
        <Stack spacing={4}>
          <Text fontSize='2xl' fontWeight='bold'>
            TimeTracker Beta
          </Text>
          <Text>TimeTracker allows you to track your time and analyze your productivity</Text>
        </Stack>
        <Stack spacing={1}>
          <Text fontSize='large' fontWeight='bold'>
            Todo:
          </Text>
          <Text>- Adding several projects</Text>
          <Text>- Activity graph</Text>
        </Stack>
      </Stack>
    </Box>
    <SettingsCard borderWidth={1}>
      <Stack spacing={4}>
        <Text fontSize='large' fontWeight='bold'>
          Alex Vorobev
        </Text>
        <Stack direction='row'>
          <Link isExternal href='https://github.com/alexvorobev'>
            <Button>Github</Button>
          </Link>
          <Link isExternal href='https://www.upwork.com/freelancers/~017e7646ac121982e4'>
            <Button>Upwork</Button>
          </Link>
        </Stack>
      </Stack>
    </SettingsCard>
  </ActionArticleGrid>
);

export default AboutArticle;
