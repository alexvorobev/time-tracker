import { FC } from 'react';

import WeekItem from './components/WeekItem';

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
    <div>
      <WeekItem isHeader />
      {weeks?.map((item) => (
        <WeekItem data={item} key={item.id} />
      ))}
    </div>
  );
};

export default WeeksList;
