import { FC } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';

import { Week } from '../..';
import { Checkbox } from '@chakra-ui/react';
import formatDate from 'utils/formatDate';

interface Props {
  data?: Week;
}

export const WeekWrapper = styled.div`
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

  &.header {
    background-color: #f3f7fa;
    border-bottom: 1px solid transparent;
  }
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

const WeekItem: FC<Props> = ({ data }) => {
  if (!data) return null;
  const { weekStart, days, summary } = data;
  const formattedDate = formatDate(weekStart);

  const renderedDaysList = days.map((item, index) => <DayCell key={`${weekStart}_${index}`}>{item}h</DayCell>);

  return (
    <WeekWrapper>
      <CheckboxCell>
        <Checkbox></Checkbox>
      </CheckboxCell>
      <DateCell>{formattedDate}</DateCell>
      {renderedDaysList}
      <DayCell>{summary}h</DayCell>
      <ProjectsCell>Default</ProjectsCell>
      <ActionCell>a</ActionCell>
    </WeekWrapper>
  );
};

export default WeekItem;
