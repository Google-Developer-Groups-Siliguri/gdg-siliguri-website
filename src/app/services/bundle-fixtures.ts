import { defer, from, Observable, throwError } from 'rxjs';
import { FIXTURES } from '../generated/fixtures';

export function loadFixture<T>(path: string): Observable<T> {
  const load = FIXTURES[path];
  if (!load) {
    return throwError(() => new Error(`No fixture for ${path} in src/app/generated/fixtures`));
  }
  return defer(() => from(load() as Promise<T>));
}
