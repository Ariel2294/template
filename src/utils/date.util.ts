import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export function getLocalDate(
  date: Date,
  format = 'YYYY-MM-DD HH:mm:ss',
): string {
  return date ? dayjs(date).tz('America/El_Salvador').format(format) : null;
}
