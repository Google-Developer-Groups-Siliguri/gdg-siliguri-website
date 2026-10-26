import edition2025Fixture from '../generated/fixtures/edition-2025.json';
import homeFixture from '../generated/fixtures/home.json';
import type { EditionBundle, HomeBundle } from '../services/bundle-types';
import { toSiteView } from './content';
import { toDevfestEdition } from './devfest-edition';
import { eventJsonLd, organizationJsonLd } from './structured-data';
import { isoWithOffset, parseWallTime, zonedDate } from './zoned-date';

const home = homeFixture as unknown as HomeBundle;
const edition2025 = edition2025Fixture as unknown as EditionBundle;

describe('structured data', () => {
  it('describes a DevFest as a schema.org Event with zone offsets', () => {
    const ed = toDevfestEdition(edition2025.edition, Date.parse('2025-12-01T00:00:00Z'));
    if (!ed) {
      throw new Error('edition did not map');
    }
    const ld = eventJsonLd(ed, 'https://gdgsiliguri.com/devfest/2025', 'https://gdgsiliguri.com/', 'https://img/x') as Record<string, any>;
    expect(ld['@type']).toBe('Event');
    expect(ld['startDate']).toBe('2025-11-16T08:00:00+05:30');
    expect(ld['endDate']).toBe('2025-11-16T17:30:00+05:30');
    expect(ld['eventAttendanceMode']).toBe('https://schema.org/OfflineEventAttendanceMode');
    expect(ld['location']['name']).toBe('Royal Sarovar Portico');
    expect(ld['location']['address']['streetAddress']).toBe('Sevoke Rd, Ward 42, Siliguri, West Bengal');
    expect(ld['organizer']['name']).toBe('GDG Siliguri');
    expect(ld['offers']).toBeUndefined();
    expect(eventJsonLd({ ...ed, ticketUrl: 'https://t.example/x' }, '', '', '')['offers' as never]).toEqual(
      jasmine.objectContaining({ url: 'https://t.example/x' })
    );
  });

  it('describes the community as an Organization with sameAs links', () => {
    const ld = organizationJsonLd(toSiteView(home.site), 'https://gdgsiliguri.com/', 'https://gdgsiliguri.com/logo.png') as Record<string, any>;
    expect(ld['@type']).toBe('Organization');
    expect(ld['sameAs']).toContain('https://github.com/Google-Developer-Groups-Siliguri');
    expect(ld['email']).toBe('gdgsiliguri@gmail.com');
  });
});

describe('zoned date helpers', () => {
  it('formats ISO strings with the zone offset', () => {
    expect(isoWithOffset(Date.parse('2026-11-14T02:30:00Z'), 'Asia/Kolkata')).toBe('2026-11-14T08:00:00+05:30');
    expect(isoWithOffset(Date.parse('2026-11-14T02:30:00Z'), 'America/New_York')).toBe('2026-11-13T21:30:00-05:00');
    expect(isoWithOffset(Date.parse('2026-07-01T12:00:00Z'), 'America/New_York')).toBe('2026-07-01T08:00:00-04:00');
  });

  it('reads wall-clock times in a zone regardless of the runtime zone', () => {
    expect(parseWallTime('2026-11-14 08:00:00.000', 'Asia/Kolkata')).toBe(Date.parse('2026-11-14T08:00:00+05:30'));
    expect(parseWallTime('2026-11-14', 'Asia/Kolkata')).toBe(Date.parse('2026-11-14T00:00:00+05:30'));
    expect(parseWallTime('2026-03-08T03:30', 'America/New_York')).toBe(Date.parse('2026-03-08T03:30:00-04:00'));
    expect(parseWallTime('2026-11-14T08:00:00Z', 'Asia/Kolkata')).toBe(Date.parse('2026-11-14T08:00:00Z'));
    expect(parseWallTime('not a date', 'Asia/Kolkata')).toBeNaN();
    expect(zonedDate(Date.parse('2026-11-13T20:00:00Z'), 'Asia/Kolkata')).toBe('2026-11-14');
  });
});
