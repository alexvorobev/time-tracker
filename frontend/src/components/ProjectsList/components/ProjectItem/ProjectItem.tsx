import { FC } from 'react';
import styled from '@emotion/styled';
import { Checkbox, Text } from '@chakra-ui/react';

import { Project } from 'components/ProjectsList/ProjectsList';
import ListActionButton from 'components/core/ListActionButton';
import floatToTime from 'utils/floatToTime';

interface Props {
  data?: Project;
  isHeader?: boolean;
}

export const ProjectWrapper = styled.div<Pick<Props, 'isHeader'>>`
  display: flex;
  align-items: center;
  gap: 24px;
  height: 64px;
  border-bottom: 1px solid #eaeaea;

  & > * {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:last-child {
    border-color: transparent;
  }

  &:hover {
    background-color: #f3f7fa;
  }

  ${(props) =>
    props.isHeader &&
    `
    background-color: #f3f7fa !important;
    font-weight: 600;
  `}
`;

const CheckboxCell = styled.div`
  flex: 0 0 64px;
  text-align: center;
`;

const TitleCell = styled('div')(() => ({
  flex: '1 1 auto',
}));

const DataCell = styled('div')(() => ({
  flex: '0 0 128px',
}));

const ActionCell = styled('div')(() => ({
  display: 'flex',
  flex: ' 0 0 32px',
  height: 32,
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ProjectItem: FC<Props> = ({ data, isHeader }) => {
  if (isHeader)
    return (
      <ProjectWrapper isHeader>
        <CheckboxCell></CheckboxCell>
        <TitleCell>Project</TitleCell>
        <DataCell>Today</DataCell>
        <DataCell>Week</DataCell>
        <DataCell>Month</DataCell>
        <DataCell>Total</DataCell>
        <ActionCell>
          <ListActionButton />
        </ActionCell>
      </ProjectWrapper>
    );

  if (!data) return null;
  const { name, today, month, week, total } = data;

  return (
    <ProjectWrapper>
      <CheckboxCell>
        <Checkbox></Checkbox>
      </CheckboxCell>
      <TitleCell>{name}</TitleCell>
      <DataCell>{floatToTime(today)}</DataCell>
      <DataCell>{floatToTime(week)}</DataCell>
      <DataCell>
        <Text fontWeight='semibold'>{month}h</Text>
      </DataCell>
      <DataCell>
        <Text fontWeight='semibold'>{total}h</Text>
      </DataCell>
      <ActionCell>
        <ListActionButton />
      </ActionCell>
    </ProjectWrapper>
  );
};

export default ProjectItem;
