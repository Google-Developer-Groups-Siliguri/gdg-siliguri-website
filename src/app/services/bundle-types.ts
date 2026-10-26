import type { BundleEdition, BundleEditions, BundleHome } from '../generated/content';

export type HomeBundle = BundleHome;
export type EditionBundle = BundleEdition;
export type EditionsBundle = BundleEditions;
export type BlogDoc = HomeBundle['blogs'][number];

export type SiteInfo = HomeBundle['site'];
export type SiteLinks = SiteInfo['links'];
export type HomeEdition = HomeBundle['edition'];
export type FullEdition = EditionBundle['edition'];
export type EditionInfo = HomeEdition & Partial<Pick<FullEdition, 'techStack'>>;
export type Media = HomeEdition['banner'];
export type TrackDoc = HomeEdition['tracks'][number];
export type SessionDoc = EditionBundle['sessions'][number];
export type SpeakerDoc = EditionBundle['speakers'][number];
export type SponsorDoc = EditionBundle['sponsors'][number];
export type PartnerDoc = EditionBundle['partners'][number];
export type FaqDoc = EditionBundle['faqs'][number];
export type TeamDoc = HomeBundle['team'][number];
export type TestimonialDoc = HomeBundle['testimonials'][number];
export type CommunityEventDoc = HomeBundle['events'][number];
export type PastEditionDoc = HomeBundle['pastEditions'][number];
export type ModuleDoc = HomeBundle['modules'][number];
export type ModuleItemDoc = NonNullable<ModuleDoc['items']>[number];
export type ShowcaseDoc = EditionBundle['showcase'][number];
export type EditionSummaryDoc = EditionsBundle['items'][number];
