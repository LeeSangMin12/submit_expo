import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const day_now = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
};

export const now_year = () => {
  return dayjs().year();
};

export const now_month = () => {
  return dayjs().month() + 1;
};

export const now_date = () => {
  return dayjs().date();
};

export const now_time = () => {
  return `${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`;
};

export const now_date_array = () => {
  return [now_year(), now_month(), now_date()];
};