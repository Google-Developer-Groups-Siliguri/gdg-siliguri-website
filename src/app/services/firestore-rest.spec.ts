import bundleHomeExample from '../generated/examples/bundle-home.json';
import editionExample from '../generated/examples/edition-2026.json';
import { decodeDocument, decodeValue, documentId, FsValue } from './firestore-rest';
import { resolveMarkers, toFsDocument } from './firestore-rest.testing';

describe('firestore-rest decoder', () => {
  it('decodes scalar values', () => {
    expect(decodeValue({ stringValue: 'GDG' })).toBe('GDG');
    expect(decodeValue({ integerValue: '2026' })).toBe(2026);
    expect(decodeValue({ doubleValue: 4.5 })).toBe(4.5);
    expect(decodeValue({ booleanValue: false })).toBeFalse();
    expect(decodeValue({ nullValue: null })).toBeNull();
    expect(decodeValue({ referenceValue: 'projects/p/databases/(default)/documents/team/a' })).toBe(
      'projects/p/databases/(default)/documents/team/a'
    );
  });

  it('decodes timestamps to ISO strings', () => {
    expect(decodeValue({ timestampValue: '2026-11-14T02:30:00Z' })).toBe('2026-11-14T02:30:00.000Z');
    expect(decodeValue({ timestampValue: '2026-10-26T06:23:34.438123Z' })).toBe(
      '2026-10-26T06:23:34.438Z'
    );
  });

  it('decodes geo points to lat/lng', () => {
    expect(decodeValue({ geoPointValue: { latitude: 26.74, longitude: 88.45 } })).toEqual({
      lat: 26.74,
      lng: 88.45,
    });
  });

  it('decodes empty and nested maps and arrays', () => {
    const value: FsValue = {
      mapValue: {
        fields: {
          empty: { mapValue: {} },
          list: { arrayValue: {} },
          nested: {
            arrayValue: {
              values: [{ mapValue: { fields: { order: { integerValue: '10' } } } }],
            },
          },
        },
      },
    };
    expect(decodeValue(value)).toEqual({ empty: {}, list: [], nested: [{ order: 10 }] });
  });

  it('takes the document id from the resource name', () => {
    expect(documentId('projects/p/databases/(default)/documents/bundles/edition-2026')).toBe(
      'edition-2026'
    );
  });

  it('round-trips the bundle-home example', () => {
    const doc = toFsDocument('bundles/home', bundleHomeExample);
    const decoded = decodeDocument<Record<string, unknown>>(doc);
    expect(decoded).toEqual({
      ...(resolveMarkers(bundleHomeExample) as Record<string, unknown>),
      id: 'home',
    });
    expect(decoded['generatedAt']).toBe('2026-10-26T04:30:05.000Z');
    expect((decoded['edition'] as { startAt: string }).startAt).toBe('2026-11-14T02:30:00.000Z');
  });

  it('round-trips an edition with a geo point', () => {
    const decoded = decodeDocument<{ venue: { geo: { lat: number; lng: number } } }>(
      toFsDocument('editions/2026', editionExample)
    );
    expect(decoded.id).toBe('2026');
    expect(decoded.venue.geo).toEqual({ lat: 26.7402775, lng: 88.4556026 });
  });
});
