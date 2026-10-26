const DAY_MS = 24 * 60 * 60 * 1000;

export interface EventModeSite {
  eventMode: string;
  eventModeLeadDays?: number | null;
}

export interface EventModeEdition {
  startAt: string;
  endAt: string;
}

export function isEventMode(
  site: EventModeSite,
  edition: EventModeEdition | null | undefined,
  now: number
): boolean {
  if (site.eventMode === 'on') {
    return true;
  }
  if (site.eventMode === 'off') {
    return false;
  }
  const startAt = Date.parse(edition?.startAt ?? '');
  const endAt = Date.parse(edition?.endAt ?? '');
  if (Number.isNaN(startAt) || Number.isNaN(endAt)) {
    return false;
  }
  const leadDays = site.eventModeLeadDays;
  const start = leadDays === null || leadDays === undefined ? -Infinity : startAt - leadDays * DAY_MS;
  return start <= now && now < endAt + DAY_MS;
}
