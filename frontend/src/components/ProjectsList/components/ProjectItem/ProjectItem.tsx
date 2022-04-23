import { FC } from 'react';
import styled from '@emotion/styled';
import { Checkbox, MenuItem, Text } from '@chakra-ui/react';

import ListActionButton from 'components/core/ListActionButton';
import floatToTime from 'utils/floatToTime';
import DeleteIcon from 'icons/DeleteIcon';
import EditIcon from 'icons/EditIcon';
import AddIcon from 'icons/AddIcon';
import { Project } from 'controllers/projects/types';

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
          <ListActionButton>
            <MenuItem icon={<AddIcon size={16} />} isDisabled>
              Add project
            </MenuItem>
          </ListActionButton>
        </ActionCell>
      </ProjectWrapper>
    );

  if (!data) return null;
  const { title, today, month, week, total } = data;
  const monthLabel = month || '0';
  const totalLabel = total || '0';

  return (
    <ProjectWrapper>
      <CheckboxCell>
        <Checkbox></Checkbox>
      </CheckboxCell>
      <TitleCell>{title}</TitleCell>
      <DataCell>{floatToTime(today || 0)}</DataCell>
      <DataCell>{floatToTime(week || 0)}</DataCell>
      <DataCell>
        <Text fontWeight='semibold'>{monthLabel}h</Text>
      </DataCell>
      <DataCell>
        <Text fontWeight='semibold'>{totalLabel}h</Text>
      </DataCell>
      <ActionCell>
        <ListActionButton>
          <MenuItem icon={<EditIcon size={16} />} isDisabled>
            Edit
          </MenuItem>
          <MenuItem icon={<DeleteIcon size={16} />} isDisabled>
            Delete
          </MenuItem>
        </ListActionButton>
      </ActionCell>
    </ProjectWrapper>
  );
};

export default ProjectItem;
