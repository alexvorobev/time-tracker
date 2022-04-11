import { FC } from 'react';
import styled from '@emotion/styled';
import { Stack, Text } from '@chakra-ui/react';

const LayoutContainer = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  maxWidth: 1016,
  margin: '41px auto 80px',
  minHeight: 'calc(100vh - 121px)',
  boxSizing: 'border-box',
}));

const LayoutGrid = styled('div')(() => ({
  display: 'grid',
  columnGap: 128,
  gridTemplateColumns: 'auto 600px',
  height: '100%',
}));

const FormContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
}));

const FormWrapper = styled('div')(() => ({
  minHeight: 500,
  width: '100%',
}));

const IllustrationBlock = styled('div')(() => ({
  background: 'var(--chakra-colors-gray-50)',
}));

const LoginLayout: FC = ({ children }) => (
  <LayoutContainer>
    <Stack spacing={2} width='100%'>
      <Text fontSize='2xl' fontWeight={800}>
        TimeTracker
      </Text>
      <LayoutGrid>
        <FormContainer>
          <FormWrapper>{children}</FormWrapper>
        </FormContainer>
        <IllustrationBlock />
      </LayoutGrid>
    </Stack>
  </LayoutContainer>
);

export default LoginLayout;
