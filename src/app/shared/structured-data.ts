import { DevfestEdition, SiteView } from './view-models';

const SCHEMA = 'https://schema.org';
const LOCALITY = 'Siliguri';
const REGION = 'West Bengal';
const COUNTRY = 'IN';

export function organizationJsonLd(site: SiteView, siteUrl: string, logoUrl: string): object {
  return {
    '@context': SCHEMA,
    '@type': 'Organization',
    name: site.name,
    url: siteUrl,
    logo: logoUrl,
    email: site.email,
    ...(site.description ? { description: site.description } : {}),
    sameAs: site.socials.map((s) => s.url),
  };
}

export function eventJsonLd(
  edition: DevfestEdition,
  pageUrl: string,
  siteUrl: string,
  imageUrl: string
): object {
  return {
    '@context': SCHEMA,
    '@type': 'Event',
    name: edition.name,
    startDate: edition.startIso,
    endDate: edition.endIso,
    eventAttendanceMode: `${SCHEMA}/OfflineEventAttendanceMode`,
    eventStatus: `${SCHEMA}/EventScheduled`,
    url: pageUrl,
    ...(edition.summary ? { description: edition.summary } : {}),
    ...(imageUrl ? { image: [imageUrl] } : {}),
    location: {
      '@type': 'Place',
      name: edition.venue || LOCALITY,
      address: {
        '@type': 'PostalAddress',
        ...(edition.address ? { streetAddress: edition.address } : {}),
        addressLocality: LOCALITY,
        addressRegion: REGION,
        addressCountry: COUNTRY,
      },
    },
    organizer: { '@type': 'Organization', name: 'GDG Siliguri', url: siteUrl },
    ...(edition.ticketUrl
      ? { offers: { '@type': 'Offer', url: edition.ticketUrl, availability: `${SCHEMA}/InStock` } }
      : {}),
  };
}
