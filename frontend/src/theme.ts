import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      500: '#2A59FE',
      600: '#557AFE',
      activeTab: '#F1F1F1',
    },
    gray: {
      100: '#F3F4F6',
    },
  },
  shadows: {
    outline: 0,
  },
});

export default theme;
