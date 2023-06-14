import { DateTime } from 'luxon';

const convert2FullDateTime = (time) => {
  const timestamp = time;
  const date = new Date(timestamp);
  const lux = date.toISOString();
  const dt = DateTime.fromISO(lux);
  dt.toLocaleString(DateTime.DATETIME_FULL);

  return dt.toLocaleString(DateTime.DATETIME_FULL);
};

export default convert2FullDateTime;
