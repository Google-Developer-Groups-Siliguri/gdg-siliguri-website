import type {
  CommunityPartners,
  EventData,
  Events,
  FAQ,
  Feedbacks,
  Members,
  PastDevfest,
  Schedule,
  SOCIAL,
  Sponsors,
} from '../services/legacy-data.service';
import { calendarLink } from './devfest-edition';
import {
  DEFAULT_EMAIL,
  DEFAULT_JOIN_URL,
  SPEAKER_SHAPES,
  TRACK_COLORS,
  compactTime,
  hostOf,
  safeMapsEmbedUrl,
  splitName,
  toSiteSections,
} from './content';
import {
  DevfestEdition,
  DevfestView,
  EditionSections,
  EventRow,
  EventsView,
  FaqView,
  HomeView,
  MemberLink,
  PartnerView,
  PastDevfestView,
  Recap,
  ScheduleItem,
  SiteView,
  SocialView,
  SpeakerCard,
  SponsorGroup,
  SponsorView,
  TeamMember,
  Testimonial,
  TrackChip,
} from './view-models';
import { MONTHS } from './zoned-date';

export type Track = 'AI' | 'App' | 'Cloud' | 'Web';

export type LegacyEventData = EventData & {
  eventMode?: boolean;
  eventVenue?: EventData['eventVenue'] & { mapsURLweb?: string };
};

export interface Toggle<T> {
  enabled: boolean;
  data: T[];
}

export interface LegacySponsors {
  enabled: boolean;
  gold?: Sponsors[];
  platinum?: Sponsors[];
  silver?: Sponsors[];
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const LEGACY_PLAY_STORE_URL = 'https://play.google.com/store/search?q=GDG%20Siliguri&c=apps';

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

export function venueName(fullAddress: string | undefined): string {
  const name = (fullAddress ?? '').split(',')[0].trim();
  return name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export function trackOf(value: string | undefined): Track | null {
  return value && value in TRACK_COLORS ? (value as Track) : null;
}

function legacyTrackChip(value: string | undefined): TrackChip | null {
  const track = trackOf(value);
  return track ? { label: track, ...TRACK_COLORS[track] } : null;
}

function enabled<T>(toggle: Toggle<T> | null | undefined): T[] {
  return toggle?.enabled ? (toggle.data ?? []) : [];
}

function sessionInstant(eventDateTime: string | undefined, time: string): number {
  const startsAt = parseIstDate(eventDateTime);
  if (Number.isNaN(startsAt)) {
    return NaN;
  }
  const date = new Date(startsAt + IST_OFFSET_MS).toISOString().slice(0, 10);
  return parseIstDate(`${date} ${to24h(time)}`);
}

export function toScheduleItems(
  schedule: Schedule[],
  speakers: Members[],
  event?: EventData | null
): ScheduleItem[] {
  const venue = event?.eventVenue?.name?.trim() ?? '';
  return schedule.map((s) => {
    const [time, meridiem = ''] = s.startTime.trim().split(/\s+/);
    const speaker = speakers.find((p) => p.name === s.subTitle);
    const startsAt = sessionInstant(event?.eventDateTime, s.startTime);
    const endsAt = sessionInstant(event?.eventDateTime, s.endTime);
    const timed = !Number.isNaN(startsAt) && !Number.isNaN(endsAt) && endsAt > startsAt;
    return {
      time,
      meridiem,
      start: s.startTime,
      mins: `${s.durationInMins} min`,
      title: s.title,
      speaker: s.subTitle,
      speakers: s.subTitle
        ? [{ name: s.subTitle, photo: s.image ? { url: s.image, alt: s.subTitle } : null }]
        : [],
      track: legacyTrackChip(speaker?.designation),
      isTalk: !!s.subTitle,
      startsAt: timed ? startsAt : 0,
      endsAt: timed ? endsAt : 0,
      calendarUrl: timed ? calendarLink(s.title, startsAt, endsAt, venue, s.subTitle) : '',
    };
  });
}

export function toSpeakerCards(speakers: Members[], schedule: Schedule[]): SpeakerCard[] {
  return speakers.map((p) => {
    const slot = schedule.find((s) => s.subTitle === p.name);
    const track = trackOf(p.designation) ?? 'Web';
    return {
      name: p.name,
      ...splitName(p.name),
      desc: p.description,
      photo: { url: p.profilePictureURL, alt: p.name },
      track: p.designation,
      colors: TRACK_COLORS[track],
      shape: SPEAKER_SHAPES[track],
      talk: slot?.title ?? '',
      time: slot?.startTime ?? '',
    };
  });
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
    photo: { url: m.profilePictureURL, alt: m.name },
    links,
    role: m.designation === 'Organizer' ? 'organizer' : 'volunteer',
  };
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

export function toTestimonials(feedbacks: Feedbacks[]): Testimonial[] {
  return feedbacks.map((f) => ({
    name: f.name,
    event: f.eventAttended,
    title: f.feedbackTitle,
    text: f.feedbackDescription,
  }));
}

export function toSponsor(s: Sponsors, tier: string, tierLabel: string): SponsorView {
  return {
    name: s.sponsorName,
    logo: { url: s.icon, alt: s.sponsorName },
    url: s.socialMediaLink,
    host: hostOf(s.socialMediaLink),
    tier,
    tierLabel,
  };
}

export function toSponsorGroups(sponsors: LegacySponsors | null | undefined): SponsorGroup[] {
  if (!sponsors?.enabled) {
    return [];
  }
  return [
    { tier: 'platinum', label: 'Platinum', list: sponsors.platinum },
    { tier: 'gold', label: 'Gold', list: sponsors.gold },
    { tier: 'silver', label: 'Silver', list: sponsors.silver },
  ]
    .map(({ tier, label, list }) => ({
      tier,
      label,
      sponsors: (list ?? []).map((s) => toSponsor(s, tier, label)),
    }))
    .filter((group) => group.sponsors.length);
}

export function toPartners(partners: CommunityPartners[]): PartnerView[] {
  return partners.map((p) => ({
    name: p.communityName,
    logo: { url: p.icon, alt: p.communityName },
    url: p.socialMediaLink,
  }));
}

export function toFaqs(faqs: FAQ[]): FaqView[] {
  return faqs.map(({ question, answer }) => ({ question, answer }));
}

export function toSocials(links: SOCIAL[] | undefined): SocialView[] {
  return (links ?? []).map((s) => ({
    name: s.name === 'Twitter' ? 'X' : s.name,
    url: s.url,
    icon: s.image,
  }));
}

export function toEventRows(events: Events[]): EventRow[] {
  return events
    .map((e) => {
      const at = parseIstDate(e.eventDate);
      return {
        ...istDay(at),
        title: e.name,
        where: e.tagline,
        tag: 'Meetup',
        url: e.registrationLink,
        at,
        closesAt: parseIstDate(e.registrationDate),
        cover: e.coverImg ?? '',
      };
    })
    .filter((e) => !Number.isNaN(e.at));
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
  const endsAt = endOfDay(startsAt, schedule);
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
    zoneLabel: 'IST',
    endsAt,
    isUpcoming,
    isPast: endsAt <= now,
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
    calendarUrl: calendarLink(name, startsAt, endsAt, event.eventVenue?.name ?? ''),
    bannerUrl: event.bannerImages?.large ?? '',
  };
}

function legacyEmbedUrl(event: LegacyEventData | null | undefined): string | null {
  const raw = event?.eventVenue?.mapsURLweb ?? '';
  return safeMapsEmbedUrl(raw.split('"')[0]);
}

export function toLegacySiteView(event: LegacyEventData | null | undefined): SiteView {
  const at = parseIstDate(event?.eventDateTime);
  return {
    name: 'GDG Siliguri',
    tagline: '',
    description: event?.communityDescription ?? '',
    joinUrl: event?.communityJoinLink || DEFAULT_JOIN_URL,
    email: event?.communityEmail || DEFAULT_EMAIL,
    socials: toSocials(event?.socialMediaLinks),
    sections: toSiteSections(undefined),
    devfestYear: Number.isNaN(at) ? '' : istDay(at).year,
    pages: [],
    appLinks: { android: LEGACY_PLAY_STORE_URL },
  };
}

export interface LegacyHomeSources {
  event: LegacyEventData | null | undefined;
  gdgFaqs: Toggle<FAQ> | null | undefined;
  feedbacks: Toggle<Feedbacks> | null | undefined;
  sponsors: LegacySponsors | null | undefined;
  partners: Toggle<CommunityPartners> | null | undefined;
  events: Toggle<Events> | null | undefined;
}

export function toLegacyHomeView(sources: LegacyHomeSources, now: number): HomeView {
  return {
    site: toLegacySiteView(sources.event),
    edition: toDevfestEdition(sources.event, [], now),
    eventMode: sources.event?.eventMode !== false,
    faqs: toFaqs(enabled(sources.gdgFaqs)),
    testimonials: toTestimonials(enabled(sources.feedbacks)),
    sponsors: toSponsorGroups(sources.sponsors),
    partners: toPartners(enabled(sources.partners)),
    events: toEventRows(enabled(sources.events)),
    modules: [],
    showcase: [],
    showcasePath: '',
    blogs: [],
    pastDevfests: [],
  };
}

export function toLegacyTeam(teams: Toggle<Members> | null | undefined): TeamMember[] {
  return enabled(teams).map(toTeamMember);
}

export interface LegacyEventsSources {
  event: LegacyEventData | null | undefined;
  events: Toggle<Events> | null | undefined;
  speakers: Toggle<Members> | null | undefined;
  schedule: Toggle<Schedule> | null | undefined;
  pastDevfests: Toggle<PastDevfest> | null | undefined;
}

export function toLegacyEventsView(sources: LegacyEventsSources, now: number): EventsView {
  const edition = toDevfestEdition(sources.event, sources.schedule?.data ?? [], now);
  const speakers = sources.speakers?.data?.length ?? 0;
  const sessions = sources.schedule?.data?.length ?? 0;
  const latest: PastDevfestView[] =
    edition && !edition.isUpcoming
      ? [
          {
            year: edition.year,
            highlight: edition.venue,
            note: [speakers && `${speakers} speakers`, sessions && `${sessions} sessions`]
              .filter(Boolean)
              .join(' · '),
          },
        ]
      : [];
  const archive = enabled(sources.pastDevfests).filter(
    (p) => p.year !== edition?.year && p.year !== undefined
  );
  return {
    site: toLegacySiteView(sources.event),
    edition,
    events: toEventRows(enabled(sources.events)),
    pastDevfests: [...latest, ...archive].sort((a, b) => Number(b.year) - Number(a.year)),
  };
}

export interface LegacyDevfestSources {
  event: LegacyEventData | null | undefined;
  speakers: Toggle<Members> | null | undefined;
  schedule: Toggle<Schedule> | null | undefined;
  faqs: Toggle<FAQ> | null | undefined;
  sponsors: LegacySponsors | null | undefined;
  partners: Toggle<CommunityPartners> | null | undefined;
}

export function toLegacyDevfestView(sources: LegacyDevfestSources, now: number): DevfestView {
  const { event } = sources;
  const schedule = enabled(sources.schedule);
  const allSpeakers = sources.speakers?.data ?? [];
  const speakers = sources.speakers?.enabled ? toSpeakerCards(allSpeakers, schedule) : [];
  const sections: EditionSections = {
    schedule: !!sources.schedule?.enabled,
    speakers: !!sources.speakers?.enabled,
    sponsors: !!sources.sponsors?.enabled,
    partners: !!sources.partners?.enabled,
    faqs: !!sources.faqs?.enabled,
    perks: !!event?.perks?.enabled,
    notes: !!event?.pointsToNote?.enabled,
    registration: !!event?.eventTicketURL,
  };
  return {
    site: toLegacySiteView(event),
    edition: toDevfestEdition(event, schedule, now),
    sections,
    schedule: toScheduleItems(schedule, allSpeakers, event),
    speakers,
    sponsors: toSponsorGroups(sources.sponsors),
    partners: toPartners(enabled(sources.partners)),
    faqs: toFaqs(enabled(sources.faqs)),
    perks: event?.perks?.enabled ? event.perks.data : [],
    notes: event?.pointsToNote?.enabled ? event.pointsToNote.data : [],
    recap: toRecap(event?.eventDateTime ?? '', event?.eventVenue?.name ?? '', schedule),
    venueEmbedUrl: legacyEmbedUrl(event),
    pending: { schedule: !schedule.length, speakers: !speakers.length },
    isActive: true,
    highlight: '',
    recapStats: [],
    recapLinks: [],
    modules: [],
  };
}
