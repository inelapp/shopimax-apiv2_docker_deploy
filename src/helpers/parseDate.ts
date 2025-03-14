import { format, tzDate } from '@formkit/tempo';

export function parseDate(date: string | Date, timeZone: string = 'America/Lima'): any {
  const zoneDate = tzDate(date, timeZone);
  return format(zoneDate, 'DD-MM-YYYY, HH:mm:ss a', 'en');
}
