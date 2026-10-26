import { FsDocument, FsValue } from './firestore-rest';

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const DOCUMENTS_ROOT = 'projects/demo-gdg-siliguri/databases/(default)/documents';

function isObject(value: Json): value is { [key: string]: Json } {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function toFsValue(value: Json): FsValue {
  if (value === null) {
    return { nullValue: null };
  }
  if (typeof value === 'string') {
    return { stringValue: value };
  }
  if (typeof value === 'boolean') {
    return { booleanValue: value };
  }
  if (typeof value === 'number') {
    return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  }
  if (Array.isArray(value)) {
    return { arrayValue: value.length ? { values: value.map(toFsValue) } : {} };
  }
  if (typeof value['$timestamp'] === 'string') {
    return { timestampValue: new Date(value['$timestamp']).toISOString().replace('.000Z', 'Z') };
  }
  const geo = value['$geopoint'];
  if (Array.isArray(geo)) {
    return { geoPointValue: { latitude: Number(geo[0]), longitude: Number(geo[1]) } };
  }
  const entries = Object.entries(value);
  return {
    mapValue: entries.length
      ? { fields: Object.fromEntries(entries.map(([k, v]) => [k, toFsValue(v)])) }
      : {},
  };
}

export function toFsDocument(path: string, data: object): FsDocument {
  return {
    name: `${DOCUMENTS_ROOT}/${path}`,
    fields: Object.fromEntries(Object.entries(data).map(([k, v]) => [k, toFsValue(v as Json)])),
    createTime: '2026-10-26T04:30:00.000000Z',
    updateTime: '2026-10-26T04:30:05.000000Z',
  };
}

export function resolveMarkers(input: unknown): unknown {
  const value = input as Json;
  if (Array.isArray(value)) {
    return value.map(resolveMarkers);
  }
  if (!isObject(value)) {
    return value;
  }
  if (typeof value['$timestamp'] === 'string') {
    return new Date(value['$timestamp']).toISOString();
  }
  const geo = value['$geopoint'];
  if (Array.isArray(geo)) {
    return { lat: Number(geo[0]), lng: Number(geo[1]) };
  }
  return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolveMarkers(v)]));
}

export function exampleBundle<T>(path: string, data: unknown): T & { id: string } {
  return { ...(resolveMarkers(data) as T), id: path.slice(path.lastIndexOf('/') + 1) };
}
