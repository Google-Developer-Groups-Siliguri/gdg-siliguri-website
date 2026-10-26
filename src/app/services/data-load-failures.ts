import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataLoadFailures {
  private readonly errors: Error[] = [];

  record(error: Error): void {
    this.errors.push(error);
  }

  first(): Error | undefined {
    return this.errors[0];
  }
}
