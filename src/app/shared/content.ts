import type {
  BlogDoc,
  CommunityEventDoc,
  EditionBundle,
  EditionInfo,
  FaqDoc,
  HomeBundle,
  Media,
  PartnerDoc,
  PastEditionDoc,
  SessionDoc,
  SiteInfo,
  SiteLinks,
  SpeakerDoc,
  SponsorDoc,
  TeamDoc,
  TestimonialDoc,
  TrackDoc,
} from '../services/bundle-types';
import { toDevfestEdition } from './devfest-edition';
import { isEventMode } from './event-mode';
import {
  BlogPost,
  DevfestEdition,
  DevfestView,
  EditionSections,
  EventRow,
  EventsView,
  FaqView,
  HomeView,
  ImageView,
  MemberLink,
  PartnerView,
  PastDevfestView,
  Recap,
  ScheduleItem,
  SiteSections,
  SiteView,
  SocialView,
  SpeakerCard,
  SponsorGroup,
  SponsorView,
  TeamMember,
  TeamRoleView,
  Testimonial,
  TrackChip,
  TrackColors,
} from './view-models';
import { DEFAULT_TIME_ZONE, titleMonth, zonedDay, zonedTime } from './zoned-date';

export const DEFAULT_JOIN_URL = 'https://gdg.community.dev/gdg-siliguri/';
export const DEFAULT_EMAIL = 'gdgsiliguri@gmail.com';
const DEFAULT_AUTHOR_PHOTO = 'assets/images/gdg.png';

export const TRACK_COLORS: Record<string, TrackColors> = {
  AI: { bg: '#F8D8D8', fg: '#5C1A1A' },
  App: { bg: '#FFE7A5', fg: '#4A3500' },
  Cloud: { bg: '#C3ECF6', fg: '#063A46' },
  Web: { bg: '#CCF6C5', fg: '#123B0C' },
};

const NEUTRAL_TRACK: TrackColors = { bg: 'var(--srf-3)', fg: 'var(--on-srf)' };

export const SPEAKER_SHAPES: Record<string, string> = {
  AI: 'arch',
  App: 'cookie9',
  Cloud: 'clover4',
  Web: 'cookie6',
};
const DEFAULT_SPEAKER_SHAPE = 'cookie6';

export const SPONSOR_TIERS = [
  { tier: 'platinum', label: 'Platinum' },
  { tier: 'gold', label: 'Gold' },
  { tier: 'silver', label: 'Silver' },
  { tier: 'bronze', label: 'Bronze' },
  { tier: 'community', label: 'Community partners' },
  { tier: 'venue', label: 'Venue partner' },
  { tier: 'media', label: 'Media partners' },
];

const SOCIAL_NETWORKS: { key: keyof SiteLinks; name: string }[] = [
  { key: 'x', name: 'X' },
  { key: 'linkedin', name: 'LinkedIn' },
  { key: 'instagram', name: 'Instagram' },
  { key: 'facebook', name: 'Facebook' },
  { key: 'github', name: 'GitHub' },
  { key: 'youtube', name: 'YouTube' },
  { key: 'medium', name: 'Medium' },
  { key: 'website', name: 'Website' },
];

const MEMBER_LINKS: { key: 'linkedin' | 'x' | 'github'; short: string; label: string }[] = [
  { key: 'linkedin', short: 'in', label: 'LinkedIn' },
  { key: 'x', short: 'X', label: 'X' },
  { key: 'github', short: 'GH', label: 'GitHub' },
];

const TALK_TYPES = new Set(['keynote', 'talk', 'workshop', 'panel', 'lightning']);
const MAPS_EMBED = /^https:\/\/www\.google\.com\/maps\/embed\?/;
const HEX_COLOR = /^#[0-9a-f]{6}$/i;

const ALL_SITE_SECTIONS: SiteSections = {
  team: true,
  events: true,
  testimonials: true,
  faqs: true,
  blogs: true,
  showcase: false,
  pastEditions: true,
};

export function splitName(name: string): { first: string; last: string } {
  const [first = '', ...rest] = name.trim().split(/\s+/);
  return { first, last: rest.join(' ') };
}

export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function compactTime(time: string): string {
  return time.replace(/^0/, '').replace(':00', '');
}

export function safeMapsEmbedUrl(url: string | undefined): string | null {
  const trimmed = url?.trim() ?? '';
  return MAPS_EMBED.test(trimmed) && !/["'<>\s]/.test(trimmed) ? trimmed : null;
}

export function toImage(media: Media | undefined, fallbackAlt = ''): ImageView {
  return {
    url: media?.url ?? '',
    alt: media?.alt || fallbackAlt,
    ...(media?.width ? { width: media.width } : {}),
    ...(media?.height ? { height: media.height } : {}),
  };
}

export function splitEventRows(
  rows: EventRow[],
  now: number
): { upcoming: EventRow[]; earlier: EventRow[] } {
  return {
    upcoming: rows.filter((e) => e.at >= now).sort((a, b) => a.at - b.at),
    earlier: rows.filter((e) => e.at < now).sort((a, b) => b.at - a.at),
  };
}

export function toSiteSections(sections: Partial<SiteSections> | undefined): SiteSections {
  return { ...ALL_SITE_SECTIONS, ...sections };
}

export function toSocials(links: SiteLinks | undefined): SocialView[] {
  return SOCIAL_NETWORKS.flatMap(({ key, name }) => {
    const url = links?.[key]?.trim();
    return url && /^https:\/\//.test(url)
      ? [{ name, url, icon: `assets/icons/social/${key}.svg` }]
      : [];
  });
}

export function toSiteView(site: SiteInfo | undefined, devfestYear?: number): SiteView {
  return {
    name: site?.name || 'GDG Siliguri',
    description: site?.description ?? '',
    joinUrl: site?.joinUrl || DEFAULT_JOIN_URL,
    email: site?.email || DEFAULT_EMAIL,
    socials: toSocials(site?.links),
    sections: toSiteSections(site?.sections),
    devfestYear: devfestYear ? String(devfestYear) : site?.activeEdition ? String(site.activeEdition) : '',
  };
}

export function trackChip(tracks: TrackDoc[] | undefined, trackId: string | undefined): TrackChip | null {
  const track = trackId ? tracks?.find((t) => t.id === trackId) : undefined;
  if (!track) {
    return null;
  }
  const label = track.label || track.id;
  return { label, ...trackColors(label, track.color) };
}

function trackColors(label: string, color: string | undefined): TrackColors {
  const known = TRACK_COLORS[label];
  if (known) {
    return known;
  }
  if (color && HEX_COLOR.test(color)) {
    return {
      bg: `color-mix(in srgb, ${color} 22%, #fff)`,
      fg: `color-mix(in srgb, ${color} 45%, #000)`,
    };
  }
  return NEUTRAL_TRACK;
}

function sessionClock(session: SessionDoc, timeZone: string): ReturnType<typeof zonedTime> | null {
  const at = Date.parse(session.startAt);
  return Number.isNaN(at) ? null : zonedTime(at, timeZone);
}

function minutesBetween(startAt: string, endAt: string): number {
  const mins = Math.round((Date.parse(endAt) - Date.parse(startAt)) / 60000);
  return Number.isFinite(mins) && mins > 0 ? mins : 0;
}

export function toScheduleItems(
  sessions: SessionDoc[],
  tracks: TrackDoc[],
  timeZone: string
): ScheduleItem[] {
  return sessions.map((s) => {
    const clock = sessionClock(s, timeZone);
    const speakers = (s.speakers ?? []).map((p) => ({
      name: p.name,
      photo: p.photo?.url ? toImage(p.photo, p.name) : null,
    }));
    const mins = minutesBetween(s.startAt, s.endAt);
    return {
      time: clock?.clock ?? '',
      meridiem: clock?.meridiem ?? '',
      start: clock ? `${clock.clock} ${clock.meridiem}` : '',
      mins: mins ? `${mins} min` : '',
      title: s.title,
      speaker: speakers.map((p) => p.name).join(', '),
      speakers,
      track: trackChip(tracks, s.trackId),
      isTalk: speakers.length > 0 || TALK_TYPES.has(s.type),
    };
  });
}

export function toSpeakerCards(
  speakers: SpeakerDoc[],
  sessions: SessionDoc[],
  tracks: TrackDoc[],
  timeZone: string
): SpeakerCard[] {
  const sessionsById = new Map(sessions.map((s) => [s.id, s]));
  return speakers.map((p) => {
    const chip = trackChip(tracks, p.trackId);
    const talk = (p.sessionIds ?? []).map((id) => sessionsById.get(id)).find(Boolean);
    const clock = talk ? sessionClock(talk, timeZone) : null;
    return {
      name: p.name,
      ...splitName(p.name),
      desc: p.headline ?? '',
      photo: toImage(p.photo, p.name),
      track: chip?.label ?? '',
      colors: chip ? { bg: chip.bg, fg: chip.fg } : TRACK_COLORS['Web'],
      shape: (chip && SPEAKER_SHAPES[chip.label]) || DEFAULT_SPEAKER_SHAPE,
      talk: talk?.title ?? '',
      time: clock ? `${clock.clock} ${clock.meridiem}` : '',
    };
  });
}

function toTeamRole(role: string): TeamRoleView {
  return role === 'organizer' || role === 'volunteer' ? role : 'other';
}

export function toTeamMember(m: TeamDoc): TeamMember {
  const links: MemberLink[] = MEMBER_LINKS.flatMap(({ key, short, label }) => {
    const url = m.links?.[key];
    return url ? [{ short, label, url }] : [];
  });
  return {
    name: m.name,
    ...splitName(m.name),
    desc: m.headline ?? '',
    photo: toImage(m.photo, m.name),
    links,
    role: toTeamRole(m.role),
  };
}

export function toTeam(home: HomeBundle): TeamMember[] {
  return home.site.sections.team ? home.team.filter((m) => m.active !== false).map(toTeamMember) : [];
}

export function toTestimonials(testimonials: TestimonialDoc[]): Testimonial[] {
  return testimonials.map((t) => ({
    name: t.name,
    event: t.eventLabel ?? '',
    title: t.title,
    text: t.body,
  }));
}

export function toFaqs(faqs: FaqDoc[]): FaqView[] {
  return faqs.map(({ question, answer }) => ({ question, answer }));
}

export function toSponsor(s: SponsorDoc, tierLabel: string): SponsorView {
  const url = s.url ?? '';
  return {
    name: s.name,
    logo: toImage(s.logo, s.name),
    url,
    host: url ? hostOf(url) : '',
    tier: s.tier,
    tierLabel,
  };
}

export function toSponsorGroups(sponsors: SponsorDoc[]): SponsorGroup[] {
  return SPONSOR_TIERS.map(({ tier, label }) => ({
    tier,
    label,
    sponsors: sponsors.filter((s) => s.tier === tier).map((s) => toSponsor(s, label)),
  })).filter((group) => group.sponsors.length);
}

export function toPartners(partners: PartnerDoc[]): PartnerView[] {
  return partners.map((p) => ({ name: p.name, logo: toImage(p.logo, p.name), url: p.url ?? '' }));
}

export function toEventRows(events: CommunityEventDoc[]): EventRow[] {
  return events
    .map((e) => {
      const at = Date.parse(e.endAt ?? e.startAt);
      const start = Date.parse(e.startAt);
      return {
        ...(Number.isNaN(start) ? { day: '', mon: '', year: '' } : zonedDay(start, e.timeZone)),
        title: e.title,
        where: e.tagline ?? e.venue?.name ?? (e.online ? 'Online' : ''),
        tag: e.tags?.[0] ?? 'Meetup',
        url: e.registration?.url ?? '',
        at,
      };
    })
    .filter((e) => !Number.isNaN(e.at));
}

export function toPastDevfests(
  pastEditions: PastEditionDoc[],
  active: DevfestEdition | null,
  shown: boolean
): PastDevfestView[] {
  if (!shown) {
    return [];
  }
  const latest = active && !active.isUpcoming ? [{ year: active.year, highlight: active.venue }] : [];
  const archive = pastEditions
    .filter((p) => String(p.year) !== active?.year)
    .map((p) => ({ year: String(p.year), highlight: p.highlight ?? '' }));
  return [...latest, ...archive].sort((a, b) => Number(b.year) - Number(a.year));
}

export function toRecap(edition: EditionInfo, sessions: SessionDoc[]): Recap {
  const zone = edition.timeZone || DEFAULT_TIME_ZONE;
  const startsAt = Date.parse(edition.startAt);
  const { day, mon, year } = Number.isNaN(startsAt)
    ? { day: '', mon: '', year: String(edition.year) }
    : zonedDay(startsAt, zone);
  const first = sessions[0];
  const last = sessions[sessions.length - 1];
  const startOf = (s: SessionDoc | undefined) => {
    const clock = s ? sessionClock(s, zone) : null;
    return clock ? compactTime(`${clock.clock} ${clock.meridiem}`) : '';
  };
  return {
    year: String(edition.year || year),
    dateLabel: day ? `${Number(day)} ${titleMonth(mon)}` : '',
    venue: edition.venue?.name?.trim() ?? '',
    firstStart: startOf(first),
    firstTitle: first?.title.toLowerCase() ?? '',
    lastStart: startOf(last),
    lastTitle: last?.title.toLowerCase() ?? '',
  };
}

export function toHomeView(home: HomeBundle, now: number): HomeView {
  const { site, edition } = home;
  const sections = edition.sections;
  return {
    site: toSiteView(site, edition.year),
    edition: toDevfestEdition(edition, now),
    eventMode: isEventMode(site, edition, now),
    faqs: site.sections.faqs ? toFaqs(home.faqs) : [],
    testimonials: site.sections.testimonials ? toTestimonials(home.testimonials) : [],
    sponsors: sections.sponsors ? toSponsorGroups(home.sponsors) : [],
    partners: sections.partners ? toPartners(home.partners) : [],
    events: site.sections.events ? toEventRows(home.events) : [],
  };
}

export function toEventsView(home: HomeBundle, now: number): EventsView {
  const edition = toDevfestEdition(home.edition, now);
  return {
    site: toSiteView(home.site, home.edition.year),
    edition,
    events: home.site.sections.events ? toEventRows(home.events) : [],
    pastDevfests: toPastDevfests(home.pastEditions, edition, home.site.sections.pastEditions),
  };
}

export function toEditionSections(sections: Partial<EditionSections> | undefined): EditionSections {
  return {
    schedule: false,
    speakers: false,
    sponsors: false,
    partners: false,
    faqs: false,
    perks: false,
    notes: false,
    registration: false,
    ...sections,
  };
}

export function toDevfestView(home: HomeBundle, bundle: EditionBundle, now: number): DevfestView {
  const edition = bundle.edition;
  const sections = toEditionSections(edition.sections);
  const zone = edition.timeZone || DEFAULT_TIME_ZONE;
  const sessions = sections.schedule ? bundle.sessions : [];
  const speakers = sections.speakers ? bundle.speakers : [];
  return {
    site: toSiteView(home.site, edition.year),
    edition: toDevfestEdition(edition, now),
    sections,
    schedule: toScheduleItems(sessions, edition.tracks, zone),
    speakers: toSpeakerCards(speakers, bundle.sessions, edition.tracks, zone),
    sponsors: sections.sponsors ? toSponsorGroups(bundle.sponsors) : [],
    partners: sections.partners ? toPartners(bundle.partners) : [],
    faqs: sections.faqs ? toFaqs(bundle.faqs) : [],
    perks: sections.perks ? (edition.perks ?? []) : [],
    notes: sections.notes ? (edition.notes ?? []) : [],
    recap: toRecap(edition, sessions),
    venueEmbedUrl: safeMapsEmbedUrl(edition.venue?.embedUrl),
    pending: {
      schedule: sections.schedule && !sessions.length,
      speakers: sections.speakers && !speakers.length,
    },
  };
}

export function toBlogPosts(blogs: BlogDoc[]): BlogPost[] {
  return blogs.map((b) => ({
    id: b.id,
    title: b.title,
    brief: b.brief,
    slug: b.id,
    coverImage: { url: b.cover?.url ?? '' },
    publishedAt: b.publishedAt,
    author: { name: b.author?.name || 'GDG Siliguri', profilePicture: b.author?.photoUrl || DEFAULT_AUTHOR_PHOTO },
    readTimeInMinutes: b.readMinutes ?? 1,
    url: b.url,
  }));
}
