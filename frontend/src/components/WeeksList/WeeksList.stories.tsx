import { ChakraProvider } from '@chakra-ui/react';

import { weeksMock } from './mocks/data';
import WeeksList from './WeeksList';

export default {
  title: 'Data view/WeeksList',
  component: WeeksList,
  providers: [ChakraProvider],
};

export const normal = () => <WeeksList weeks={weeksMock} />;
