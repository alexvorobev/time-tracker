const minsInHr = 60;

const formatTime = (data: number): string => {
  let sign: string | number = data >= 0 ? 1 : -1;
  data = data * sign;
  const hour = Math.floor(data);
  let decpart = data - hour;
  const min = 1 / minsInHr;
  decpart = min * Math.round(decpart / min);
  let minute = Math.floor(decpart * minsInHr).toString();

  if (minute.length < 2) {
    minute = '0' + minute;
  }

  sign = sign === 1 ? '' : '-';

  return `${sign}${hour}:${minute}`;
};

export default formatTime;
