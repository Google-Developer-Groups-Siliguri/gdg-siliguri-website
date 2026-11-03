export const LOADED_ICONS = new Set([
  'add',
  'arrow_back',
  'arrow_forward',
  'arrow_outward',
  'chevron_right',
  'close',
  'confirmation_number',
  'diversity_3',
  'event_upcoming',
  'group_add',
  'handshake',
  'location_on',
  'mail',
  'menu',
  'record_voice_over',
  'shop',
]);

export function iconOr(name: string, fallback: string): string {
  return LOADED_ICONS.has(name) ? name : fallback;
}
