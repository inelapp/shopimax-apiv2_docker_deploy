import { monthStart, tzDate, format, dayEnd } from '@formkit/tempo';

export const isValidDateString = (value: any): boolean => {
  if (typeof value !== 'string') return false;
  const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:[+-]\d{2}:\d{2}|Z)$/;
  if (!dateFormat.test(value)) return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
};

const formatDateToFilter = (date: Date): Date => {
  return format({
    date,
    format: 'YYYY-MM-DDTHH:mm:ssZ',
    tz: 'America/Lima',
    locale: 'en'
  }) as unknown as Date;
};

export const getDatefilters = (
  fromDate?: string,
  toDate?: string,
  zone: string = 'America/Lima'
): { fromDate: Date | undefined; toDate: Date | undefined } => {
  let parsedFromDate: Date | string | undefined = formatDateToFilter(monthStart(tzDate(new Date(), zone)));
  let parsedToDate: Date | string | undefined = formatDateToFilter(dayEnd(tzDate(new Date(), zone)));

  if (fromDate && toDate) {
    parsedFromDate = formatDateToFilter(tzDate(fromDate, zone));
    parsedToDate = formatDateToFilter(tzDate(toDate, zone));
  } else if (fromDate) {
    parsedFromDate = formatDateToFilter(tzDate(fromDate, zone));
  } else if (toDate) {
    parsedToDate = formatDateToFilter(tzDate(toDate, zone));
  }
  return {
    fromDate: parsedFromDate,
    toDate: parsedToDate
  };
};
