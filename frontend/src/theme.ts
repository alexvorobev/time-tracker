import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: 'rgb(42 88 254 / 15%)',
      500: '#2A59FE',
      600: '#254DDB',
      700: '#173bb8',
      activeTab: '#F1F1F1',
    },
    dark: {
      50: 'rgb(42 88 254 / 15%)',
      500: '#333333',
      600: '#111111',
      700: '#000000',
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
