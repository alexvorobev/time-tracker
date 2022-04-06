import { FC } from 'react';
import { Checkbox, Text } from '@chakra-ui/react';

import WeekItem, {
  ActionCell,
  CheckboxCell,
  DateCell,
  DayCell,
  ProjectsCell,
  WeekWrapper,
} from './components/WeekItem';

type WeekDays = [number, number, number, number, number, number, number];

export type Week = {
  id: number;
  weekStart: Date;
  days: WeekDays;
  summary: number;
};

interface Props {
  weeks?: Week[];
}

const WeeksList: FC<Props> = ({ weeks }) => {
  return (
    <>
      <WeekWrapper>
        <CheckboxCell>
          <Checkbox></Checkbox>
        </CheckboxCell>
        <DateCell>
          <Text>Date</Text>
        </DateCell>
        <DayCell>
          <Text>Mon</Text>
        </DayCell>
        <DayCell>
          <Text>Tue</Text>
        </DayCell>
        <DayCell>
          <Text>Wed</Text>
        </DayCell>
        <DayCell>
          <Text>Thu</Text>
        </DayCell>
        <DayCell>
          <Text>Fri</Text>
        </DayCell>
        <DayCell>
          <Text>Sat</Text>
        </DayCell>
        <DayCell>
          <Text>Sun</Text>
        </DayCell>
        <DayCell>
          <Text>Total</Text>
        </DayCell>
        <ProjectsCell>
          <Text>Project</Text>
        </ProjectsCell>
        <ActionCell />
      </WeekWrapper>
      <div>
        {weeks?.map((item) => (
          <WeekItem data={item} key={item.id} />
        ))}
      </div>
    </>
  );
};

export default WeeksList;
