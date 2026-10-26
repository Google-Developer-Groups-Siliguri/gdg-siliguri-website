import { toDevfestEdition, toLegacyDevfestView, parseLegacyDate } from './legacy-content';

const event = {
  bannerDescription: 'DevFest',
  communityDescription: 'GDG',
  eventDateTime: '2026-11-14 08:00:00.000',
  bannerImages: { large: 'https://ik.imagekit.io/x/large.png', long: '', medium: '', small: '', aisummit: '' },
  communityEmail: 'gdgsiliguri@gmail.com',
  communityJoinLink: 'https://gdg.community.dev/gdg-siliguri/',
  eventTicketURL: 'https://tickets.example.com',
  registrationExpiryDateTime: '2026-11-12 20:00:00.000',
  eventVenue: { imageURL: '', mapsURL: 'https://maps.app.goo.gl/x', name: 'ITC FORTUNE SELECT SILIGURI, Siliguri' },
  socialMediaLinks: [],
  pointsToNote: { enabled: true, data: ['Bring ID'] },
  perks: { enabled: false, data: [] },
};
const schedule = [
  { durationInMins: '120', startTime: '08:00 AM', endTime: '10:00 AM', timeZone: 'IST', title: 'Registration', subTitle: '', image: '' },
  { durationInMins: '45', startTime: '10:00 AM', endTime: '05:30 PM', timeZone: 'IST', title: 'Keynote', subTitle: 'Ada', image: '' },
];

describe('legacy content mappers', () => {
  it('reads RTDB dates as IST without a fixed offset', () => {
    expect(parseLegacyDate('2026-11-14 08:00:00.000')).toBe(Date.parse('2026-11-14T08:00:00+05:30'));
  });

  it('maps the legacy event to the same edition view model', () => {
    const ed = toDevfestEdition(event, schedule, Date.parse('2026-10-26T00:00:00Z'));
    expect(ed).toEqual(
      jasmine.objectContaining({
        weekday: 'Saturday',
        dateLabel: '14 Nov',
        startLabel: '8 AM',
        hoursLabel: '8:00 AM to 5:30 PM IST',
        venue: 'Itc Fortune Select Siliguri',
        registrationOpen: true,
        startIso: '2026-11-14T08:00:00+05:30',
        endIso: '2026-11-14T17:30:00+05:30',
      })
    );
  });

  it('builds session instants for the legacy schedule', () => {
    const view = toLegacyDevfestView(
      {
        event,
        speakers: { enabled: true, data: [] },
        schedule: { enabled: true, data: schedule },
        faqs: { enabled: false, data: [] },
        sponsors: { enabled: false },
        partners: { enabled: false, data: [] },
      },
      Date.parse('2026-10-26T00:00:00Z')
    );
    expect(view.schedule[1].startsAt).toBe(Date.parse('2026-11-14T10:00:00+05:30'));
    expect(view.schedule[1].calendarUrl).toContain('dates=20261114T043000Z%2F20261114T120000Z');
    expect(view.notes).toEqual(['Bring ID']);
  });
});
