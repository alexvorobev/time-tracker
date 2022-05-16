import { FragmentsPeriod } from '../dto/find-fragments.dto';

const getDateByPeriod = (period: FragmentsPeriod) => {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);

  switch (period) {
    case FragmentsPeriod.ALL:
      return undefined;
    case FragmentsPeriod.MONTH:
      return date.setDate(date.getDate() - 30);
    case FragmentsPeriod.WEEK:
      return date.setDate(date.getDate() - 7);
    case FragmentsPeriod.TODAY:
      return date;
    default:
      return undefined;
  }

  return date;
};

export default getDateByPeriod;
