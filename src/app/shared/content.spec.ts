import bundleEditionExample from '../generated/examples/bundle-edition-2026.json';
import bundleHomeExample from '../generated/examples/bundle-home.json';
import edition2025Fixture from '../generated/fixtures/edition-2025.json';
import edition2026Fixture from '../generated/fixtures/edition-2026.json';
import homeFixture from '../generated/fixtures/home.json';
import type {
  EditionBundle,
  HomeBundle,
  SessionDoc,
  SpeakerDoc,
  TeamDoc,
  TrackDoc,
} from '../services/bundle-types';
import { exampleBundle } from '../services/firestore-rest.testing';
import {
  safeMapsEmbedUrl,
  splitEventRows,
  toDevfestView,
  toEventRows,
  toEventsView,
  toHomeView,
  toScheduleItems,
  toSiteView,
  toSocials,
  toSpeakerCards,
  toSponsorGroups,
  toTeam,
  toTeamMember,
  toTestimonials,
  trackChip,
} from './content';
import { toDevfestEdition } from './devfest-edition';

const home = homeFixture as unknown as HomeBundle;
const edition2025 = edition2025Fixture as unknown as EditionBundle;
const edition2026 = edition2026Fixture as unknown as EditionBundle;
const BEFORE_2026 = Date.parse('2026-10-26T06:00:00Z');
const AFTER_2025 = Date.parse('2025-12-01T00:00:00Z');

const TRACKS: TrackDoc[] = [
  { id: 'ai', label: 'AI', color: '#4285F4', order: 10 },
  { id: 'data', label: 'Data', color: '#7B1FA2', order: 50 },
  { id: 'bad', label: 'Bad', color: 'purple', order: 60 },
];

function session(overrides: Partial<SessionDoc>): SessionDoc {
  return {
    id: 's',
    title: 'Talk',
    type: 'talk',
    startAt: '2025-11-16T04:30:00.000Z',
    endAt: '2025-11-16T05:15:00.000Z',
    speakerIds: [],
    speakers: [],
    order: 10,
    ...overrides,
  };
}

describe('content mappers (v2)', () => {
  describe('examples from the schema', () => {
    const example = exampleBundle<HomeBundle>('bundles/home', bundleHomeExample);
    const exampleEdition = exampleBundle<EditionBundle>(
      'bundles/edition-2026',
      bundleEditionExample
    );

    it('maps the home example', () => {
      const view = toHomeView(example, BEFORE_2026);
      expect(view.site.devfestYear).toBe('2026');
      expect(view.edition?.name).toBe('DevFest Siliguri 2026');
      expect(view.partners.map((p) => p.name)).toContain('Flutterflow Students Community India');
      expect(view.sponsors).toEqual([]);
    });

    it('maps the edition example', () => {
      const view = toDevfestView(example, exampleEdition, BEFORE_2026);
      expect(view.edition?.dateLabel).toBe('14 Nov');
      expect(view.schedule.map((s) => [s.start, s.title, s.track?.label ?? ''])).toEqual([
        ['08:00 AM', 'Registration', ''],
        ['10:00 AM', 'Supercharge App Dev with Gen AI - Utilery', 'Cloud'],
      ]);
      expect(view.speakers.map((s) => [s.name, s.talk, s.time])).toEqual([
        ['Satish VJ', 'Supercharge App Dev with Gen AI - Utilery', '10:00 AM'],
      ]);
    });
  });

  describe('DevfestEdition', () => {
    it('formats labels in the edition time zone', () => {
      const ed = toDevfestEdition(edition2026.edition, BEFORE_2026);
      expect(ed).toEqual(
        jasmine.objectContaining({
          name: 'DevFest Siliguri 2026',
          year: '2026',
          day: '14',
          month: 'Nov',
          weekday: 'Saturday',
          dateLabel: '14 Nov',
          startLabel: '8 AM',
          hoursLabel: '8:00 AM to 5:30 PM IST',
          zoneLabel: 'IST',
          isUpcoming: true,
          venue: 'ITC Fortune Select Siliguri',
          mapsUrl: 'https://maps.app.goo.gl/pGy6NBJGr9e4P1cE7',
        })
      );
      expect(ed?.startsAt).toBe(Date.parse('2026-11-14T08:00:00+05:30'));
      expect(ed?.calendarUrl).toContain('dates=20261114T023000Z%2F20261114T120000Z');
    });

    it('renders the same labels whatever the runtime time zone is', () => {
      const runtimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const ed = toDevfestEdition(edition2025.edition, AFTER_2025);
      expect(`${ed?.weekday} ${ed?.dateLabel} ${ed?.startLabel} ${ed?.zoneLabel}`)
        .withContext(`runtime zone ${runtimeZone}`)
        .toBe('Sunday 16 Nov 8 AM IST');
      const schedule = toScheduleItems(edition2025.sessions, edition2025.edition.tracks, 'Asia/Kolkata');
      expect(schedule[0].start).withContext(`runtime zone ${runtimeZone}`).toBe('08:00 AM');
      expect(schedule[1].start).toBe('10:00 AM');
    });

    it('follows the edition time zone rather than a fixed offset', () => {
      const ed = toDevfestEdition(
        { ...edition2026.edition, timeZone: 'America/New_York' },
        BEFORE_2026
      );
      expect(ed?.dateLabel).toBe('13 Nov');
      expect(ed?.weekday).toBe('Friday');
      expect(ed?.startLabel).toBe('9:30 PM');
    });

    it('falls back to the default zone for an invalid time zone', () => {
      const ed = toDevfestEdition({ ...edition2026.edition, timeZone: 'Mars/Olympus' }, BEFORE_2026);
      expect(ed?.startLabel).toBe('8 AM');
    });

    it('opens registration only when the section is on, a url exists and the window is open', () => {
      const base = edition2026.edition;
      const open = {
        ...base,
        sections: { ...base.sections, registration: true },
        registration: { url: 'https://example.com/t', closesAt: '2026-11-12T14:30:00.000Z' },
      };
      expect(toDevfestEdition(base, BEFORE_2026)?.registrationOpen).toBeFalse();
      expect(toDevfestEdition(open, BEFORE_2026)?.registrationOpen).toBeTrue();
      expect(toDevfestEdition(open, Date.parse('2026-11-13T00:00:00Z'))?.registrationOpen).toBeFalse();
      expect(
        toDevfestEdition(
          { ...open, registration: { ...open.registration, opensAt: '2026-11-01T00:00:00Z' } },
          BEFORE_2026
        )?.registrationOpen
      ).toBeFalse();
    });
  });

  describe('DevFest 2026 (real data, lineup off)', () => {
    const view = toDevfestView(home, edition2026, BEFORE_2026);

    it('hides schedule, speakers and sponsors', () => {
      expect(view.sections.schedule).toBeFalse();
      expect(view.schedule).toEqual([]);
      expect(view.speakers).toEqual([]);
      expect(view.sponsors).toEqual([]);
      expect(view.pending).toEqual({ schedule: false, speakers: false });
    });

    it('shows partners, FAQs, perks, notes and the venue map', () => {
      expect(view.partners.length).toBe(11);
      expect(view.faqs.length).toBeGreaterThan(0);
      expect(view.perks.length).toBeGreaterThan(0);
      expect(view.notes.length).toBeGreaterThan(0);
      expect(view.venueEmbedUrl).toMatch(/^https:\/\/www\.google\.com\/maps\/embed\?pb=/);
      expect(view.edition?.registrationOpen).toBeFalse();
    });
  });

  describe('DevFest 2025 (real data, full lineup)', () => {
    const view = toDevfestView(home, edition2025, AFTER_2025);

    it('maps the schedule with tracks and speakers', () => {
      expect(view.schedule.length).toBe(12);
      const [registration, firstTalk] = view.schedule;
      expect(registration).toEqual(
        jasmine.objectContaining({
          time: '08:00',
          meridiem: 'AM',
          mins: '120 min',
          title: 'Registration',
          isTalk: false,
          track: null,
        })
      );
      expect(firstTalk.speaker).toBe('Satish VJ');
      expect(firstTalk.speakers[0].photo?.url).toContain('Satish%20VJ');
      expect(firstTalk.track).toEqual({ label: 'Cloud', bg: '#C3ECF6', fg: '#063A46' });
      expect(view.recap.firstStart).toBe('8 AM');
      expect(view.recap.venue).toBe('Royal Sarovar Portico');
    });

    it('maps speakers with their session', () => {
      expect(view.speakers.length).toBe(7);
      const ekta = view.speakers.find((s) => s.name === 'Ekta Shah');
      expect(ekta).toEqual(
        jasmine.objectContaining({
          first: 'Ekta',
          last: 'Shah',
          track: 'AI',
          shape: 'arch',
          talk: 'Agentic AI in Finance: Automating Workflows from Code to Compliance',
          time: '10:50 AM',
        })
      );
    });

    it('groups sponsors by tier in schema order', () => {
      expect(view.sponsors.map((g) => g.tier)).toEqual(['platinum', 'gold']);
      expect(view.sponsors[0].sponsors[0].name).toBe('Google for Developers');
      expect(view.sponsors[1].sponsors.map((s) => s.name)).toEqual([
        'Rise in',
        'Stellar',
        'Cyber Help India',
      ]);
    });
  });

  describe('schedule and speakers edge cases', () => {
    it('joins multiple speakers and tolerates unknown types and tracks', () => {
      const items = toScheduleItems(
        [
          session({
            type: 'fireside' as SessionDoc['type'],
            trackId: 'nope',
            speakers: [
              { id: 'a', name: 'Ada Lovelace' },
              { id: 'b', name: 'Alan Turing', photo: { url: 'https://ik.imagekit.io/x/a.png', alt: '' } },
            ],
          }),
          session({ type: 'mystery' as SessionDoc['type'], title: 'Something' }),
        ],
        TRACKS,
        'Asia/Kolkata'
      );
      expect(items[0].speaker).toBe('Ada Lovelace, Alan Turing');
      expect(items[0].speakers[0].photo).toBeNull();
      expect(items[0].speakers[1].photo?.alt).toBe('Alan Turing');
      expect(items[0].isTalk).toBeTrue();
      expect(items[0].track).toBeNull();
      expect(items[1].isTalk).toBeFalse();
    });

    it('derives colours for tracks outside the pastel palette', () => {
      expect(trackChip(TRACKS, 'ai')).toEqual({ label: 'AI', bg: '#F8D8D8', fg: '#5C1A1A' });
      expect(trackChip(TRACKS, 'data')?.bg).toContain('#7B1FA2');
      expect(trackChip(TRACKS, 'bad')).toEqual({
        label: 'Bad',
        bg: 'var(--srf-3)',
        fg: 'var(--on-srf)',
      });
      expect(trackChip(TRACKS, undefined)).toBeNull();
    });

    it('gives speakers without a known track a default look', () => {
      const speaker: SpeakerDoc = {
        id: 'x',
        name: 'Grace Hopper',
        headline: 'Rear Admiral',
        photo: { url: 'https://ik.imagekit.io/x/g.png', alt: '' },
        trackId: 'unknown',
        order: 10,
        sessionIds: ['missing'],
      };
      const [card] = toSpeakerCards([speaker], [], TRACKS, 'Asia/Kolkata');
      expect(card.track).toBe('');
      expect(card.shape).toBe('cookie6');
      expect(card.talk).toBe('');
      expect(card.photo.alt).toBe('Grace Hopper');
    });
  });

  describe('home bundle (real data)', () => {
    const view = toHomeView(home, BEFORE_2026);

    it('maps the site and switches', () => {
      expect(view.eventMode).toBeTrue();
      expect(view.site.sections.events).toBeFalse();
      expect(view.site.joinUrl).toBe('https://gdg.community.dev/gdg-siliguri/');
      expect(view.events).toEqual([]);
    });

    it('maps socials to local icons in a stable order', () => {
      expect(view.site.socials.map((s) => s.name)).toEqual([
        'X',
        'LinkedIn',
        'Instagram',
        'Facebook',
        'GitHub',
      ]);
      expect(view.site.socials[0].icon).toBe('assets/icons/social/x.svg');
    });

    it('maps testimonials and FAQs', () => {
      expect(view.testimonials[0]).toEqual(
        jasmine.objectContaining({ name: 'Aditya Gurung', event: "@Devfest'22" })
      );
      expect(view.faqs[0].question).toBe('What is GDG Siliguri?');
    });

    it('maps the team by role', () => {
      const team = toTeam(home);
      expect(team.length).toBe(19);
      expect(team.find((m) => m.name === 'Debajit Mallick')?.role).toBe('organizer');
      expect(team.some((m) => m.role === 'volunteer')).toBeTrue();
    });

    it('hides past editions when the section is off', () => {
      expect(toEventsView(home, BEFORE_2026).pastDevfests).toEqual([]);
      expect(toSiteView(home.site).devfestYear).toBe('2026');
    });
  });

  describe('small mappers', () => {
    it('maps team roles, treating unknown roles as other', () => {
      const member: TeamDoc = {
        id: 'a',
        name: 'Debajit Mallick',
        role: 'organizer',
        headline: 'Software Engineer',
        photo: { url: 'https://ik.imagekit.io/x/d.webp', alt: 'Debajit Mallick', width: 400, height: 500 },
        links: { linkedin: 'https://linkedin.com/in/d', github: 'https://github.com/d' },
        active: true,
        order: 10,
      };
      const mapped = toTeamMember(member);
      expect(mapped.role).toBe('organizer');
      expect(mapped.links.map((l) => l.short)).toEqual(['in', 'GH']);
      expect(mapped.photo).toEqual({
        url: 'https://ik.imagekit.io/x/d.webp',
        alt: 'Debajit Mallick',
        width: 400,
        height: 500,
      });
      expect(toTeamMember({ ...member, role: 'mentor' as TeamDoc['role'] }).role).toBe('other');
      expect(toTeamMember({ ...member, role: 'alumni' }).role).toBe('other');
    });

    it('maps testimonials', () => {
      expect(
        toTestimonials([
          { id: 't', name: 'A', title: 'Great', body: 'Loved it', featured: true, order: 1 },
        ])
      ).toEqual([{ name: 'A', event: '', title: 'Great', text: 'Loved it' }]);
    });

    it('hides sponsors with unknown tiers', () => {
      const logo = { url: 'https://ik.imagekit.io/x/l.png', alt: '' };
      const groups = toSponsorGroups([
        { id: 'm', name: 'Media Co', tier: 'media', logo, order: 10 },
        { id: 'p', name: 'Plat', tier: 'platinum', logo, url: 'https://www.plat.dev/', order: 10 },
        { id: 'u', name: 'Unknown', tier: 'diamond' as 'gold', logo, order: 10 },
      ]);
      expect(groups.map((g) => g.label)).toEqual(['Platinum', 'Media partners']);
      expect(groups[0].sponsors[0].host).toBe('plat.dev');
    });

    it('drops non-https social links', () => {
      expect(toSocials({ x: 'http://twitter.com/a', github: 'https://github.com/a' })).toEqual([
        { name: 'GitHub', url: 'https://github.com/a', icon: 'assets/icons/social/github.svg' },
      ]);
    });

    it('accepts only Google Maps embed URLs', () => {
      expect(safeMapsEmbedUrl('https://www.google.com/maps/embed?pb=!1m18')).toBe(
        'https://www.google.com/maps/embed?pb=!1m18'
      );
      expect(safeMapsEmbedUrl('https://evil.example.com/maps/embed?pb=1')).toBeNull();
      expect(safeMapsEmbedUrl('javascript:alert(1)')).toBeNull();
      expect(safeMapsEmbedUrl('https://www.google.com/maps/embed?pb=1" onload="x')).toBeNull();
      expect(safeMapsEmbedUrl(undefined)).toBeNull();
    });

    it('splits community events by end time', () => {
      const rows = toEventRows([
        {
          id: 'past',
          title: 'Past meetup',
          startAt: '2026-01-10T04:30:00.000Z',
          timeZone: 'Asia/Kolkata',
        },
        {
          id: 'next',
          title: 'Next meetup',
          startAt: '2026-10-25T04:30:00.000Z',
          endAt: '2026-10-27T12:00:00.000Z',
          timeZone: 'Asia/Kolkata',
          registration: { url: 'https://example.com/r' },
          tags: ['Workshop'],
        },
      ]);
      const { upcoming, earlier } = splitEventRows(rows, BEFORE_2026);
      expect(upcoming.map((e) => [e.title, e.day, e.mon, e.tag])).toEqual([
        ['Next meetup', '25', 'OCT', 'Workshop'],
      ]);
      expect(earlier.map((e) => e.title)).toEqual(['Past meetup']);
    });
  });
});
