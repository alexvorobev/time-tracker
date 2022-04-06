import dayjs from 'dayjs';

const formatDate = (date: Date) => dayjs(date).format('DD.MM.YYYY');

export default formatDate;
