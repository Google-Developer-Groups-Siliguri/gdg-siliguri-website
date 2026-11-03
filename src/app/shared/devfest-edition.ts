import type { EditionInfo } from '../services/bundle-types';
import { CallCard, DevfestEdition } from './view-models';
import {
  isoWithOffset,
  titleMonth,
  zoneLabel,
  zonedDay,
  zonedParts,
  zonedTime,
} from './zoned-date';

function compactUtc(ms: number): string {
  return new Date(ms).toISOString().replace(/[-:]|\.\d{3}/g, '');
}

export function calendarLink(
  name: string,
  startsAt: number,
  endsAt: number,
  venue: string,
  details = `${name} by GDG Siliguri`
): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: name,
    dates: `${compactUtc(startsAt)}/${compactUtc(endsAt)}`,
    location: venue,
    details,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

const CALLS = [
  {
    key: 'speakers',
    lead: 'Call for',
    rest: 'speakers',
    body: 'Share what you have built or learned on the DevFest stage.',
    icon: 'record_voice_over',
    shape: 'sunny',
  },
  {
    key: 'sponsors',
    lead: 'Call for',
    rest: 'sponsors',
    body: 'Back the event and meet hundreds of developers from the region.',
    icon: 'handshake',
    shape: 'clover4',
  },
  {
    key: 'partners',
    lead: 'Call for community',
    rest: 'partners',
    body: 'Bring your community along and help us spread the word.',
    icon: 'diversity_3',
    shape: 'cookie6',
  },
] as const;

function toCalls(edition: EditionInfo, ticketUrl: string, ticketsOpen: boolean): CallCard[] {
  const tickets: CallCard = {
    key: 'tickets',
    lead: 'Register for',
    rest: 'tickets',
    body: 'Save your seat for a day of talks, codelabs and workshops.',
    icon: 'confirmation_number',
    shape: 'cookie9',
    url: ticketUrl,
    open: ticketsOpen,
  };
  const calls = CALLS.map((call) => ({
    ...call,
    url: edition.calls?.[call.key]?.url ?? '',
    open: !!edition.calls?.[call.key]?.open,
  }));
  return [tickets, ...calls].filter((call) => /^https:\/\//.test(call.url));
}

function isBefore(now: number, iso: string | undefined): boolean {
  const at = Date.parse(iso ?? '');
  return Number.isNaN(at) || now < at;
}

function isAfter(now: number, iso: string | undefined): boolean {
  const at = Date.parse(iso ?? '');
  return Number.isNaN(at) || now >= at;
}

export function toDevfestEdition(
  edition: EditionInfo | null | undefined,
  now: number
): DevfestEdition | null {
  const startsAt = Date.parse(edition?.startAt ?? '');
  if (!edition || Number.isNaN(startsAt)) {
    return null;
  }
  const parsedEnd = Date.parse(edition.endAt);
  const endsAt = Number.isNaN(parsedEnd) || parsedEnd <= startsAt ? startsAt : parsedEnd;
  const zone = edition.timeZone;
  const { day, mon, year } = zonedDay(startsAt, zone);
  const month = titleMonth(mon);
  const start = zonedTime(startsAt, zone);
  const end = zonedTime(endsAt, zone);
  const zoneName = zoneLabel(startsAt, zone);
  const name = edition.title || `DevFest Siliguri ${year}`;
  const venue = edition.venue?.name?.trim() ?? '';
  const ticketUrl = edition.registration?.url ?? '';
  const isUpcoming = startsAt > now;
  const registrationOpen =
    !!edition.sections?.registration &&
    !!ticketUrl &&
    isUpcoming &&
    isAfter(now, edition.registration?.opensAt) &&
    isBefore(now, edition.registration?.closesAt);
  return {
    name,
    year: String(edition.year || year),
    startsAt,
    day,
    month,
    weekday: zonedParts(startsAt, zone).weekday,
    dateLabel: `${Number(day)} ${month}`,
    startLabel: start.short,
    hoursLabel:
      endsAt > startsAt
        ? `${start.label} to ${end.label} ${zoneName}`
        : `From ${start.short} ${zoneName}`,
    zoneLabel: zoneName,
    endsAt,
    isUpcoming,
    isPast: endsAt <= now,
    registrationOpen,
    ticketUrl,
    calls: isUpcoming ? toCalls(edition, ticketUrl, registrationOpen) : [],
    venue,
    mapsUrl: edition.venue?.mapsUrl ?? '',
    summary: edition.summary ?? '',
    theme: edition.theme ?? '',
    stack: edition.techStack ?? [],
    calendarUrl: calendarLink(name, startsAt, endsAt, venue),
    bannerUrl: edition.banner?.url ?? '',
    startIso: isoWithOffset(startsAt, zone),
    endIso: isoWithOffset(endsAt, zone),
    address: edition.venue?.address?.trim() ?? '',
  };
}
