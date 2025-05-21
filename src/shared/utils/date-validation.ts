import moment, * as moments from 'moment';
export const isISODate = (timestamp : string) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(timestamp)) return false;
  const d = new Date(timestamp); 
  return !isNaN(d.getTime()) && d.toISOString()===timestamp; // valid date 
}

export const isFutureDate = (isoDateString: string)  => {
  const inputDate = new Date(isoDateString);

  if (isNaN(inputDate.getTime())) {
    return false;
  }

  const now = new Date();

  return inputDate.getTime() > now.getTime();
}