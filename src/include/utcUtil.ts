export const getTodayTimeRange = () => {
  const fromDate = getTodayStart();
  const toDate = getTodayEnd();

  const params = {
    fromDate,
    toDate
  }

  return params;
}

export const getWeekTimeRange = () => {
  const fromDate = getTodayStart() - 604800000;
  const toDate = getTodayEnd();

  const params = {
    fromDate,
    toDate
  }

  return params;
}

export const getTodayStart = () => {
  const todayObj = new Date();
  todayObj.setHours(0,0,0,0);
  return todayObj.getTime();
}

export const getTodayEnd = () => {
  const todayObj = new Date();
  todayObj.setHours(11,59,59,59);
  return todayObj.getTime();
}

export const getUTCTime = (time: number) => {
  return time + new Date().getTimezoneOffset() * 60000;
}