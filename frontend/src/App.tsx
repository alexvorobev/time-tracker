import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
