export interface ImageView {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface TrackColors {
  bg: string;
  fg: string;
}

export interface TrackChip extends TrackColors {
  label: string;
}

export interface FaqView {
  question: string;
  answer: string;
}

export interface SocialView {
  name: string;
  url: string;
  icon: string;
}

export interface SiteSections {
  team: boolean;
  events: boolean;
  testimonials: boolean;
  faqs: boolean;
  blogs: boolean;
  showcase: boolean;
  pastEditions: boolean;
}

export interface PageLink {
  path: string;
  label: string;
}

export interface AppLinks {
  android?: string;
  ios?: string;
}

export interface SiteView {
  name: string;
  tagline: string;
  description: string;
  joinUrl: string;
  email: string;
  socials: SocialView[];
  sections: SiteSections;
  devfestYear: string;
  pages: PageLink[];
  appLinks: AppLinks;
}

export interface ScheduleSpeaker {
  name: string;
  photo: ImageView | null;
}

export interface ScheduleItem {
  time: string;
  meridiem: string;
  start: string;
  mins: string;
  title: string;
  speaker: string;
  speakers: ScheduleSpeaker[];
  track: TrackChip | null;
  isTalk: boolean;
  startsAt: number;
  endsAt: number;
  calendarUrl: string;
}

export interface SpeakerCard {
  name: string;
  first: string;
  last: string;
  desc: string;
  photo: ImageView;
  track: string;
  colors: TrackColors;
  shape: string;
  talk: string;
  time: string;
}

export interface MemberLink {
  short: string;
  label: string;
  url: string;
}

export type TeamRoleView = 'organizer' | 'volunteer' | 'other';

export interface TeamMember {
  name: string;
  first: string;
  last: string;
  desc: string;
  photo: ImageView;
  links: MemberLink[];
  role: TeamRoleView;
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

export interface Testimonial {
  name: string;
  event: string;
  title: string;
  text: string;
}

export interface SponsorView {
  name: string;
  logo: ImageView;
  url: string;
  host: string;
  tier: string;
  tierLabel: string;
}

export interface SponsorGroup {
  tier: string;
  label: string;
  sponsors: SponsorView[];
}

export interface PartnerView {
  name: string;
  logo: ImageView;
  url: string;
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
  closesAt: number;
  cover: string;
}

export interface PastDevfestView {
  year: string;
  highlight: string;
  note?: string;
  link?: string;
}

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
  zoneLabel: string;
  endsAt: number;
  isUpcoming: boolean;
  isPast: boolean;
  registrationOpen: boolean;
  ticketUrl: string;
  venue: string;
  mapsUrl: string;
  summary: string;
  theme: string;
  stack: string[];
  calendarUrl: string;
  bannerUrl: string;
}

export interface EditionSections {
  schedule: boolean;
  speakers: boolean;
  sponsors: boolean;
  partners: boolean;
  faqs: boolean;
  perks: boolean;
  notes: boolean;
  registration: boolean;
}

export interface LineupPending {
  schedule: boolean;
  speakers: boolean;
}

export interface HomeView {
  site: SiteView;
  edition: DevfestEdition | null;
  eventMode: boolean;
  faqs: FaqView[];
  testimonials: Testimonial[];
  sponsors: SponsorGroup[];
  partners: PartnerView[];
  events: EventRow[];
  modules: ModuleView[];
  showcase: ShowcaseCard[];
  showcasePath: string;
  blogs: BlogPost[];
  pastDevfests: PastDevfestView[];
}

export interface EventsView {
  site: SiteView;
  edition: DevfestEdition | null;
  events: EventRow[];
  pastDevfests: PastDevfestView[];
}

export interface DevfestView {
  site: SiteView;
  edition: DevfestEdition | null;
  sections: EditionSections;
  schedule: ScheduleItem[];
  speakers: SpeakerCard[];
  sponsors: SponsorGroup[];
  partners: PartnerView[];
  faqs: FaqView[];
  perks: string[];
  notes: string[];
  recap: Recap;
  venueEmbedUrl: string | null;
  pending: LineupPending;
  isActive: boolean;
  highlight: string;
  recapStats: RecapStat[];
  recapLinks: PageLink[];
  modules: ModuleView[];
}

export interface RecapStat {
  value: string;
  label: string;
}

export interface CardItem {
  title: string;
  body: string;
  image: ImageView | null;
  url: string;
  tags: string[];
}

export interface GalleryItem {
  image: ImageView;
  caption: string;
}

export interface LinkItem {
  label: string;
  url: string;
  description: string;
  icon: string;
}

export interface ShowcaseCard {
  id: string;
  title: string;
  summary: string;
  body: string;
  tags: string[];
  team: string[];
  repo: string;
  demo: string;
  video: string;
  images: ImageView[];
  edition: number | null;
}

export type ModuleKind = 'cards' | 'gallery' | 'links' | 'richText' | 'showcase' | 'blogs';

export interface ModuleView {
  id: string;
  type: ModuleKind;
  title: string;
  subtitle: string;
  icon: string;
  slot: string;
  order: number;
  path: string;
  edition: number | null;
  body: string;
  cards: CardItem[];
  gallery: GalleryItem[];
  links: LinkItem[];
  showcase: ShowcaseCard[];
  blogs: BlogPost[];
}

export interface ShowcaseView {
  site: SiteView;
  title: string;
  subtitle: string;
  years: number[];
  year: number;
  items: ShowcaseCard[];
}

export interface ModulePageView {
  site: SiteView;
  module: ModuleView;
}

export type ContentPage =
  | { kind: 'showcase'; showcase: ShowcaseView }
  | { kind: 'module'; page: ModulePageView };

export interface BlogsView {
  posts: BlogPost[];
  pageable: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  coverImage: {
    url: string;
  };
  publishedAt: string;
  author: {
    name: string;
    profilePicture: string;
  };
  readTimeInMinutes: number;
  url: string;
}
