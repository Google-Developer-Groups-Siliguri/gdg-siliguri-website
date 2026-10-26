import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, PLATFORM_ID, Signal, afterNextRender, inject, signal } from '@angular/core';

const MINUTE_MS = 60_000;

export function injectMinuteClock(): Signal<number> {
  const now = signal(0);
  if (isPlatformBrowser(inject(PLATFORM_ID))) {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      now.set(Date.now());
      const timer = setInterval(() => now.set(Date.now()), MINUTE_MS);
      destroyRef.onDestroy(() => clearInterval(timer));
    });
  }
  return now;
}
