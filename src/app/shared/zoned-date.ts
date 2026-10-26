export const DEFAULT_TIME_ZONE = 'Asia/Kolkata';
export const MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];
const LOCALE = 'en-IN';

export interface ZonedParts {
  year: string;
  month: number;
  day: number;
  weekday: string;
  hour: number;
  minute: number;
}

const partFormatters = new Map<string, Intl.DateTimeFormat>();
const zoneFormatters = new Map<string, Intl.DateTimeFormat>();

function validZone(timeZone: string | undefined): string {
  if (!timeZone) {
    return DEFAULT_TIME_ZONE;
  }
  try {
    new Intl.DateTimeFormat(LOCALE, { timeZone });
    return timeZone;
  } catch {
    return DEFAULT_TIME_ZONE;
  }
}

function cached(
  cache: Map<string, Intl.DateTimeFormat>,
  timeZone: string,
  options: Intl.DateTimeFormatOptions
): Intl.DateTimeFormat {
  const zone = validZone(timeZone);
  let format = cache.get(zone);
  if (!format) {
    format = new Intl.DateTimeFormat(LOCALE, { ...options, timeZone: zone });
    cache.set(zone, format);
  }
  return format;
}

export function zonedParts(ms: number, timeZone: string): ZonedParts {
  const parts = cached(partFormatters, timeZone, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(ms);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '';
  return {
    year: part('year'),
    month: Number(part('month')),
    day: Number(part('day')),
    weekday: part('weekday'),
    hour: Number(part('hour')) % 24,
    minute: Number(part('minute')),
  };
}

export function zonedDay(ms: number, timeZone: string): { day: string; mon: string; year: string } {
  const { day, month, year } = zonedParts(ms, timeZone);
  return { day: String(day).padStart(2, '0'), mon: MONTHS[month - 1] ?? '', year };
}

export function titleMonth(mon: string): string {
  return mon.charAt(0) + mon.slice(1).toLowerCase();
}

export interface ZonedTime {
  clock: string;
  meridiem: string;
  label: string;
  short: string;
}

export function zonedTime(ms: number, timeZone: string): ZonedTime {
  const { hour, minute } = zonedParts(ms, timeZone);
  const meridiem = hour < 12 ? 'AM' : 'PM';
  const hour12 = hour % 12 || 12;
  const mm = String(minute).padStart(2, '0');
  return {
    clock: `${String(hour12).padStart(2, '0')}:${mm}`,
    meridiem,
    label: `${hour12}:${mm} ${meridiem}`,
    short: minute ? `${hour12}:${mm} ${meridiem}` : `${hour12} ${meridiem}`,
  };
}

export function zoneLabel(ms: number, timeZone: string): string {
  const parts = cached(zoneFormatters, timeZone, { timeZoneName: 'short' }).formatToParts(ms);
  return parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
}
