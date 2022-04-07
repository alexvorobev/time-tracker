import { ChakraProvider } from '@chakra-ui/react';

import ProjectsList from '.';

import { projectsMock } from './mocks/data';

export default {
  title: 'Data view/ProjectsList',
  component: ProjectsList,
  providers: [ChakraProvider],
};

export const normal = () => <ProjectsList projects={projectsMock} />;
