import type { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type FsValue =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { nullValue: null }
  | { timestampValue: string }
  | { geoPointValue: { latitude: number; longitude: number } }
  | { mapValue: { fields?: Record<string, FsValue> } }
  | { arrayValue: { values?: FsValue[] } }
  | { referenceValue: string }
  | { bytesValue: string };

export interface FsDocument {
  name: string;
  fields?: Record<string, FsValue>;
  createTime?: string;
  updateTime?: string;
}

export interface FsListResponse {
  documents?: FsDocument[];
  nextPageToken?: string;
}

export interface ListOptions {
  pageSize?: number;
  orderBy?: string;
  pageToken?: string;
}

export interface DocPage<T> {
  items: (T & { id: string })[];
  next?: string;
}

export function decodeValue(value: FsValue): unknown {
  if ('stringValue' in value) {
    return value.stringValue;
  }
  if ('integerValue' in value) {
    return Number(value.integerValue);
  }
  if ('doubleValue' in value) {
    return Number(value.doubleValue);
  }
  if ('booleanValue' in value) {
    return value.booleanValue;
  }
  if ('nullValue' in value) {
    return null;
  }
  if ('timestampValue' in value) {
    return new Date(value.timestampValue).toISOString();
  }
  if ('geoPointValue' in value) {
    return { lat: value.geoPointValue.latitude ?? 0, lng: value.geoPointValue.longitude ?? 0 };
  }
  if ('mapValue' in value) {
    return decodeFields(value.mapValue.fields);
  }
  if ('arrayValue' in value) {
    return (value.arrayValue.values ?? []).map(decodeValue);
  }
  if ('referenceValue' in value) {
    return value.referenceValue;
  }
  if ('bytesValue' in value) {
    return value.bytesValue;
  }
  return null;
}

export function decodeFields(fields: Record<string, FsValue> | undefined): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(fields ?? {}).map(([key, value]) => [key, decodeValue(value)])
  );
}

export function documentId(name: string): string {
  return name.slice(name.lastIndexOf('/') + 1);
}

export function decodeDocument<T>(doc: FsDocument): T & { id: string } {
  return { ...decodeFields(doc.fields), id: documentId(doc.name) } as T & { id: string };
}

export function getDoc<T>(
  http: HttpClient,
  baseUrl: string,
  path: string
): Observable<T & { id: string }> {
  return http.get<FsDocument>(`${baseUrl}/${path}`).pipe(map((doc) => decodeDocument<T>(doc)));
}

export function listDocs<T>(
  http: HttpClient,
  baseUrl: string,
  collection: string,
  { pageSize, orderBy, pageToken }: ListOptions = {}
): Observable<DocPage<T>> {
  const params: Record<string, string> = {};
  if (pageSize) {
    params['pageSize'] = String(pageSize);
  }
  if (orderBy) {
    params['orderBy'] = orderBy;
  }
  if (pageToken) {
    params['pageToken'] = pageToken;
  }
  return http.get<FsListResponse>(`${baseUrl}/${collection}`, { params }).pipe(
    map((res) => ({
      items: (res.documents ?? []).map((doc) => decodeDocument<T>(doc)),
      next: res.nextPageToken || undefined,
    }))
  );
}
