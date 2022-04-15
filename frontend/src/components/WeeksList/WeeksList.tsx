import { FC } from 'react';

import AddWeekModal from 'components/modals/AddWeekModal';

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

const onClose = () => {
  console.log('onClose');
};

const WeeksList: FC<Props> = ({ weeks }) => {
  const renderedModal = <AddWeekModal onClose={onClose} />;

  return (
    <div>
      <WeekItem isHeader />
      {weeks?.map((item) => (
        <WeekItem data={item} key={item.id} />
      ))}
      {renderedModal}
    </div>
  );
};

export default WeeksList;
