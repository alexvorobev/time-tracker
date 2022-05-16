import { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { Button, Checkbox, Stack, Text } from '@chakra-ui/react';

import { Project } from 'controllers/projects/types';
import floatToTime from 'utils/floatToTime';
import AddIcon from 'icons/AddIcon';
import { ListProvider, useListState } from 'hooks/useListState';
import AddFragmentModal from 'components/modals/AddFragmentModal';

type Fragment = {
  id: number;
  date: Date;
  amount: number;
  project: Partial<Project>;
  user: string;
  from?: Date;
  to?: Date;
};

interface Props {
  fragments: Fragment[];
  projectId?: number;
}

interface FragmentRowProps {
  isHeader?: boolean;
}

const FragmentRow = styled('div')<FragmentRowProps>(({ isHeader }) => ({
  display: 'flex',
  width: '100%',
  padding: '16px 0',
  gap: 16,
  borderBottom: '1px solid #e1e1e1',
  borderTop: isHeader ? '1px solid #e1e1e1' : 0,
  fontSize: 16,
  fontWeight: isHeader ? '700' : 'normal',

  ':last-child': {
    border: 0,
  },
}));

const DateCell = styled('div')(() => ({
  flex: '0 0 120px',
}));

const UnitCell = styled('div')(() => ({
  flex: '0 0 240px',
}));

const TimeCell = styled('div')(() => ({
  flex: '1 1 100%',
}));

const CheckboxCell = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: '0 0 64px',
}));

const ActionRow = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: 16,
  alignItems: 'center',
}));

const FragmentsList: FC<Props> = ({ fragments, projectId }) => {
  const { isSelectedAll, onSelectAll, selectedItems, onSelectItem } = useListState();
  const isEditDisabled = isSelectedAll || selectedItems.length !== 1;
  const isDeleteDisabled = selectedItems.length === 0 || isSelectedAll;

  const renderedHeaderRow = useMemo(
    () => (
      <FragmentRow isHeader>
        <CheckboxCell>
          <Checkbox colorScheme='brand' isChecked={isSelectedAll} onChange={onSelectAll} />
        </CheckboxCell>
        <DateCell>Date</DateCell>
        <UnitCell>Project</UnitCell>
        <TimeCell>From</TimeCell>
        <TimeCell>To</TimeCell>
        <TimeCell>Amount</TimeCell>
        <UnitCell>User</UnitCell>
      </FragmentRow>
    ),
    [isSelectedAll, onSelectAll],
  );

  const renderedActionRow = useMemo(
    () => (
      <ActionRow>
        <Stack direction='row'>
          {!projectId && (
            <Button size='sm' leftIcon={<AddIcon size={16} />}>
              Add
            </Button>
          )}
          <Button colorScheme='brand' disabled={isEditDisabled} size='sm'>
            Edit
          </Button>
          <Button colorScheme='red' disabled={isDeleteDisabled} size='sm'>
            Delete
          </Button>
        </Stack>
        <Text fontSize='sm' color='gray.500'>
          {fragments.length} items
        </Text>
      </ActionRow>
    ),
    [fragments.length, isDeleteDisabled, isEditDisabled, projectId],
  );

  return (
    <>
      <Stack spacing={0}>
        {renderedActionRow}
        {renderedHeaderRow}
        {fragments.map(({ id, date, project, from, to, user, amount }) => (
          <FragmentRow key={id}>
            <CheckboxCell>
              <Checkbox
                isChecked={selectedItems.includes(id) || isSelectedAll}
                colorScheme='brand'
                onChange={() => onSelectItem(id)}
              />
            </CheckboxCell>
            <DateCell>{dayjs(date).format('DD.MM.YYYY')}</DateCell>
            <UnitCell>{project.title ?? 'Unknown project'}</UnitCell>
            <TimeCell>{from ? dayjs(from).format('hh:mm') : '-'}</TimeCell>
            <TimeCell>{to ? dayjs(to).format('hh:mm') : '-'}</TimeCell>
            <TimeCell>{floatToTime(amount)}</TimeCell>
            <UnitCell>{user}</UnitCell>
          </FragmentRow>
        ))}
      </Stack>
      <AddFragmentModal />
    </>
  );
};

const WrappedFragmentsList: FC<Props> = ({ fragments }) => (
  <ListProvider>
    <FragmentsList fragments={fragments} />
  </ListProvider>
);

export default WrappedFragmentsList;
