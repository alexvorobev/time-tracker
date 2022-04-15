import { FC, useMemo } from 'react';
import styled from '@emotion/styled';
import { Checkbox, Text } from '@chakra-ui/react';

import { Week } from '../..';
import formatDate from 'utils/formatDate';
import formatTime from 'utils/formatTime';
import { useListState } from 'controllers/useListState';
import ListActionButton from 'components/core/ListActionButton';

interface Props {
  data?: Week;
  isHeader?: boolean;
}

export const WeekWrapper = styled.div<Pick<Props, 'isHeader'>>`
  display: flex;
  align-items: center;
  gap: 24px;
  height: 64px;
  border-bottom: 1px solid #eaeaea;
  position: relative;

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

export const CheckboxCell = styled.div`
  flex: 0 0 64px;
  text-align: center;
`;

export const DateCell = styled.div`
  flex: 0 0 92px;
  text-align: center;
`;

export const DayCell = styled.div`
  flex: 0 0 48px;
  text-align: center;
`;

export const ProjectsCell = styled.div`
  flex: 1 0 73px;
  text-align: center;
`;

export const ActionCell = styled.div`
  flex: 0 0 32px;
  text-align: center;
`;

const WeekItem: FC<Props> = ({ data, isHeader }) => {
  const { selectedItems, onSelectItem } = useListState();
  const { id } = data || { id: -1 };
  const isSelected = useMemo(() => selectedItems.includes(id), [id, selectedItems]);

  const renderedHeaderVariant = (
    <WeekWrapper isHeader>
      <CheckboxCell>{/* <Checkbox isChecked={isSelectedAll} onChange={onSelectAll}></Checkbox> */}</CheckboxCell>
      <DateCell>Date</DateCell>
      <DayCell>Mon</DayCell>
      <DayCell>Tue</DayCell>
      <DayCell>Wed</DayCell>
      <DayCell>Thu</DayCell>
      <DayCell>Fri</DayCell>
      <DayCell>Sat</DayCell>
      <DayCell>Sun</DayCell>
      <DayCell>Total</DayCell>
      <ProjectsCell>Project</ProjectsCell>
      <ActionCell>
        <ListActionButton />
      </ActionCell>
    </WeekWrapper>
  );

  if (isHeader) return renderedHeaderVariant;

  if (!data) return null;
  const { weekStart, days, summary } = data;
  const formattedDate = formatDate(weekStart);

  const renderedDaysList = days.map((item, index) => (
    <DayCell key={`${weekStart}_${index}`}>{formatTime(item)}</DayCell>
  ));

  return (
    <WeekWrapper>
      <CheckboxCell>
        <Checkbox isChecked={isSelected} onChange={() => onSelectItem(id)}></Checkbox>
      </CheckboxCell>
      <DateCell>{formattedDate}</DateCell>
      {renderedDaysList}
      <DayCell>
        <Text fontWeight='semibold'>{formatTime(summary)}</Text>
      </DayCell>
      <ProjectsCell>Default</ProjectsCell>
      <ActionCell>
        <ListActionButton />
      </ActionCell>
    </WeekWrapper>
  );
};

export default WeekItem;
