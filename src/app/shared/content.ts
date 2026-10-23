import { Events, Feedbacks, Members, Schedule, SOCIAL, Sponsors } from '../services/data.service';

export type Track = 'AI' | 'App' | 'Cloud' | 'Web';

export const TRACK_COLORS: Record<Track, { bg: string; fg: string }> = {
  AI: { bg: '#F8D8D8', fg: '#5C1A1A' },
  App: { bg: '#FFE7A5', fg: '#4A3500' },
  Cloud: { bg: '#C3ECF6', fg: '#063A46' },
  Web: { bg: '#CCF6C5', fg: '#123B0C' },
};

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

export function parseIstDate(value: string | undefined): number {
  if (!value) {
    return NaN;
  }
  const iso = value.trim().replace(' ', 'T');
  const hasZone = /[zZ]|[+-]\d\d:?\d\d$/.test(iso);
  const withTime = iso.includes('T') ? iso : `${iso}T00:00:00`;
  return new Date(hasZone ? withTime : `${withTime}+05:30`).getTime();
}

export function istDay(ms: number): { day: string; mon: string; year: string } {
  const d = new Date(ms + IST_OFFSET_MS);
  return {
    day: String(d.getUTCDate()).padStart(2, '0'),
    mon: MONTHS[d.getUTCMonth()],
    year: String(d.getUTCFullYear()),
  };
}

export function trackOf(value: string | undefined): Track | null {
  return value && value in TRACK_COLORS ? (value as Track) : null;
}

export function splitName(name: string): { first: string; last: string } {
  const [first, ...rest] = name.trim().split(/\s+/);
  return { first, last: rest.join(' ') };
}

export function venueName(fullAddress: string | undefined): string {
  const name = (fullAddress ?? '').split(',')[0].trim();
  return name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function compactTime(time: string): string {
  return time.replace(/^0/, '').replace(':00', '');
}

export interface ScheduleItem {
  time: string;
  meridiem: string;
  start: string;
  mins: string;
  title: string;
  speaker: string;
  photo: string;
  track: Track | null;
  isTalk: boolean;
}

export function toScheduleItems(schedule: Schedule[], speakers: Members[]): ScheduleItem[] {
  return schedule.map((s) => {
    const [time, meridiem = ''] = s.startTime.trim().split(/\s+/);
    const speaker = speakers.find((p) => p.name === s.subTitle);
    return {
      time,
      meridiem,
      start: s.startTime,
      mins: `${s.durationInMins} min`,
      title: s.title,
      speaker: s.subTitle,
      photo: s.image,
      track: trackOf(speaker?.designation),
      isTalk: !!s.subTitle,
    };
  });
}

export interface SpeakerCard {
  name: string;
  first: string;
  last: string;
  desc: string;
  photo: string;
  track: string;
  colors: { bg: string; fg: string };
  shape: string;
  talk: string;
  time: string;
}

const SPEAKER_SHAPES: Record<Track, string> = {
  AI: 'arch',
  App: 'cookie9',
  Cloud: 'clover4',
  Web: 'cookie6',
};

export function toSpeakerCards(speakers: Members[], schedule: Schedule[]): SpeakerCard[] {
  return speakers.map((p) => {
    const slot = schedule.find((s) => s.subTitle === p.name);
    const track = trackOf(p.designation) ?? 'Web';
    return {
      name: p.name,
      ...splitName(p.name),
      desc: p.description,
      photo: p.profilePictureURL,
      track: p.designation,
      colors: TRACK_COLORS[track],
      shape: SPEAKER_SHAPES[track],
      talk: slot?.title ?? '',
      time: slot?.startTime ?? '',
    };
  });
}

export interface MemberLink {
  short: string;
  label: string;
  url: string;
}

export interface TeamMember {
  name: string;
  first: string;
  last: string;
  desc: string;
  photo: string;
  links: MemberLink[];
}

export function toTeamMember(m: Members): TeamMember {
  const links: MemberLink[] = [
    { short: 'in', label: 'LinkedIn', url: m.linkedInURL },
    { short: 'X', label: 'X', url: m.twitterURL },
    { short: 'GH', label: 'GitHub', url: m.githubURL },
  ].filter((l) => !!l.url);
  return {
    name: m.name,
    ...splitName(m.name),
    desc: m.description,
    photo: m.profilePictureURL,
    links,
  };
}

export interface Recap {
  year: string;
  dateLabel: string;
  venue: string;
  firstStart: string;
  firstTitle: string;
  lastStart: string;
  lastTitle: string;
}

export function toRecap(eventDateTime: string, venue: string, schedule: Schedule[]): Recap {
  const { day, mon, year } = istDay(parseIstDate(eventDateTime));
  const first = schedule[0];
  const last = schedule[schedule.length - 1];
  return {
    year,
    dateLabel: `${Number(day)} ${mon.charAt(0)}${mon.slice(1).toLowerCase()}`,
    venue: venueName(venue),
    firstStart: first ? compactTime(first.startTime) : '',
    firstTitle: first?.title.toLowerCase() ?? '',
    lastStart: last ? compactTime(last.startTime) : '',
    lastTitle: last?.title.toLowerCase() ?? '',
  };
}

export interface Testimonial {
  name: string;
  event: string;
  title: string;
  text: string;
}

export function toTestimonials(feedbacks: Feedbacks[]): Testimonial[] {
  return feedbacks.map((f) => ({
    name: f.name,
    event: f.eventAttended,
    title: f.feedbackTitle,
    text: f.feedbackDescription,
  }));
}

export interface SponsorView {
  name: string;
  icon: string;
  url: string;
  host: string;
}

export function toSponsor(s: Sponsors): SponsorView {
  return { name: s.sponsorName, icon: s.icon, url: s.socialMediaLink, host: hostOf(s.socialMediaLink) };
}

export interface SocialView {
  name: string;
  url: string;
  icon: string;
}

export function toSocials(links: SOCIAL[] | undefined): SocialView[] {
  return (links ?? []).map((s) => ({
    name: s.name === 'Twitter' ? 'X' : s.name,
    url: s.url,
    icon: s.image,
  }));
}

export interface EventRow {
  day: string;
  mon: string;
  year: string;
  title: string;
  where: string;
  tag: string;
  url: string;
  at: number;
}

export function splitCommunityEvents(events: Events[], now: number): {
  upcoming: EventRow[];
  earlier: EventRow[];
} {
  const rows: EventRow[] = events
    .map((e) => {
      const at = parseIstDate(e.eventDate);
      return {
        ...istDay(at),
        title: e.name,
        where: e.tagline,
        tag: 'Meetup',
        url: e.registrationLink,
        at,
      };
    })
    .filter((e) => !Number.isNaN(e.at));
  return {
    upcoming: rows.filter((e) => e.at >= now).sort((a, b) => a.at - b.at),
    earlier: rows.filter((e) => e.at < now).sort((a, b) => b.at - a.at),
  };
}
