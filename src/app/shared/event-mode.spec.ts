import { isEventMode } from './event-mode';

const edition = { startAt: '2026-11-14T02:30:00.000Z', endAt: '2026-11-14T12:00:00.000Z' };
const at = (iso: string) => Date.parse(iso);

describe('isEventMode', () => {
  it('follows on and off regardless of dates', () => {
    expect(isEventMode({ eventMode: 'on' }, edition, at('2020-01-01T00:00:00Z'))).toBeTrue();
    expect(isEventMode({ eventMode: 'off' }, edition, at('2026-11-14T05:00:00Z'))).toBeFalse();
  });

  it('is on the whole time before the event in auto mode without lead days', () => {
    expect(isEventMode({ eventMode: 'auto' }, edition, at('2020-01-01T00:00:00Z'))).toBeTrue();
    expect(
      isEventMode({ eventMode: 'auto', eventModeLeadDays: null }, edition, at('2026-11-14T05:00:00Z'))
    ).toBeTrue();
  });

  it('starts lead days before the event in auto mode', () => {
    const site = { eventMode: 'auto', eventModeLeadDays: 30 };
    expect(isEventMode(site, edition, at('2026-10-15T02:29:59Z'))).toBeFalse();
    expect(isEventMode(site, edition, at('2026-10-15T02:30:00Z'))).toBeTrue();
  });

  it('ends 24 hours after the event ends in auto mode', () => {
    const site = { eventMode: 'auto' };
    expect(isEventMode(site, edition, at('2026-11-15T11:59:59Z'))).toBeTrue();
    expect(isEventMode(site, edition, at('2026-11-15T12:00:00Z'))).toBeFalse();
  });

  it('treats unknown modes as auto and needs an edition', () => {
    expect(isEventMode({ eventMode: 'sometimes' }, edition, at('2026-11-20T00:00:00Z'))).toBeFalse();
    expect(isEventMode({ eventMode: 'sometimes' }, edition, at('2026-11-10T00:00:00Z'))).toBeTrue();
    expect(isEventMode({ eventMode: 'auto' }, null, at('2026-11-10T00:00:00Z'))).toBeFalse();
  });
});
