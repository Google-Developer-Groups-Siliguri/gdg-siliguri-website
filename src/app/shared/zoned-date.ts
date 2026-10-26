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

export function zoneOffsetMinutes(ms: number, timeZone: string): number {
  const p = zonedParts(ms, timeZone);
  const seconds = Math.floor(ms / 1000) % 60;
  const wall = Date.UTC(Number(p.year), p.month - 1, p.day, p.hour, p.minute, seconds);
  return Math.round((wall - (Math.floor(ms / 1000) * 1000)) / 60000);
}

export function isoWithOffset(ms: number, timeZone: string): string {
  const offset = zoneOffsetMinutes(ms, timeZone);
  const local = new Date(ms + offset * 60000).toISOString().slice(0, 19);
  const sign = offset < 0 ? '-' : '+';
  const abs = Math.abs(offset);
  const hh = String(Math.floor(abs / 60)).padStart(2, '0');
  const mm = String(abs % 60).padStart(2, '0');
  return `${local}${sign}${hh}:${mm}`;
}

export function zonedDate(ms: number, timeZone: string): string {
  const { year, month, day } = zonedParts(ms, timeZone);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function parseWallTime(value: string | undefined, timeZone: string): number {
  if (!value) {
    return NaN;
  }
  const iso = value.trim().replace(' ', 'T');
  if (/[zZ]|[+-]\d\d:?\d\d$/.test(iso)) {
    return Date.parse(iso);
  }
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?)?$/);
  if (!match) {
    return NaN;
  }
  const [, y, mo, d, h = '0', mi = '0', s = '0'] = match;
  const wall = Date.UTC(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s));
  const guess = wall - zoneOffsetMinutes(wall, timeZone) * 60000;
  return wall - zoneOffsetMinutes(guess, timeZone) * 60000;
}
