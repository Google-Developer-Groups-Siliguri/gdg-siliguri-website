import { EventData, Schedule } from '../services/data.service';
import { istDay, parseIstDate, venueName } from './content';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

export interface DevfestEdition {
  name: string;
  year: string;
  startsAt: number;
  day: string;
  month: string;
  weekday: string;
  dateLabel: string;
  startLabel: string;
  hoursLabel: string;
  isUpcoming: boolean;
  registrationOpen: boolean;
  ticketUrl: string;
  venue: string;
  mapsUrl: string;
  summary: string;
  theme: string;
  stack: string[];
  calendarUrl: string;
}

function compactUtc(ms: number): string {
  return new Date(ms).toISOString().replace(/[-:]|\.\d{3}/g, '');
}

function calendarLink(name: string, startsAt: number, endsAt: number, venue: string): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: name,
    dates: `${compactUtc(startsAt)}/${compactUtc(endsAt)}`,
    location: venue,
    details: `${name} by GDG Siliguri`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

function endOfDay(startsAt: number, schedule: Schedule[]): number {
  const last = schedule[schedule.length - 1];
  const date = new Date(startsAt + IST_OFFSET_MS).toISOString().slice(0, 10);
  const end = last ? parseIstDate(`${date} ${to24h(last.endTime)}`) : NaN;
  return Number.isNaN(end) || end <= startsAt ? startsAt + 10 * 60 * 60 * 1000 : end;
}

function istTimeLabel(ms: number): string {
  const d = new Date(ms + IST_OFFSET_MS);
  const hours = d.getUTCHours();
  const minutes = d.getUTCMinutes();
  const suffix = hours < 12 ? 'AM' : 'PM';
  const hour12 = hours % 12 || 12;
  return minutes ? `${hour12}:${String(minutes).padStart(2, '0')} ${suffix}` : `${hour12} ${suffix}`;
}

function hoursLabel(startsAt: number, schedule: Schedule[]): string {
  const first = schedule[0]?.startTime.replace(/^0/, '');
  const last = schedule[schedule.length - 1]?.endTime.replace(/^0/, '');
  return first && last ? `${first} to ${last} IST` : `From ${istTimeLabel(startsAt)} IST`;
}

function to24h(time: string): string {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) {
    return '00:00:00';
  }
  let hours = Number(match[1]) % 12;
  if (match[3]?.toUpperCase() === 'PM') {
    hours += 12;
  }
  return `${String(hours).padStart(2, '0')}:${match[2]}:00`;
}

export function toDevfestEdition(
  event: EventData | null | undefined,
  schedule: Schedule[],
  now: number
): DevfestEdition | null {
  const startsAt = parseIstDate(event?.eventDateTime);
  if (!event || Number.isNaN(startsAt)) {
    return null;
  }
  const { day, mon, year } = istDay(startsAt);
  const month = mon.charAt(0) + mon.slice(1).toLowerCase();
  const name = `DevFest Siliguri ${year}`;
  const venue = venueName(event.eventVenue?.name);
  const registrationEnds = parseIstDate(event.registrationExpiryDateTime);
  const isUpcoming = startsAt > now;
  return {
    name,
    year,
    startsAt,
    day,
    month,
    weekday: WEEKDAYS[new Date(startsAt + IST_OFFSET_MS).getUTCDay()],
    dateLabel: `${Number(day)} ${month}`,
    startLabel: istTimeLabel(startsAt),
    hoursLabel: hoursLabel(startsAt, schedule),
    isUpcoming,
    registrationOpen:
      !!event.eventTicketURL &&
      isUpcoming &&
      (Number.isNaN(registrationEnds) || registrationEnds > now),
    ticketUrl: event.eventTicketURL,
    venue,
    mapsUrl: event.eventVenue?.mapsURL ?? '',
    summary: event.bannerDescription ?? '',
    theme: event.theme ?? '',
    stack: event.techStack ?? [],
    calendarUrl: calendarLink(name, startsAt, endOfDay(startsAt, schedule), event.eventVenue?.name ?? ''),
  };
}
