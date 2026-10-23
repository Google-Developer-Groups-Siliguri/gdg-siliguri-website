import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, PLATFORM_ID, Signal, computed, inject, signal } from '@angular/core';

export interface Countdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function injectCountdown(target: () => number): Signal<Countdown> {
  const now = signal(Date.now());
  if (isPlatformBrowser(inject(PLATFORM_ID))) {
    const timer = setInterval(() => now.set(Date.now()), 1000);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }
  return computed(() => {
    const total = Math.max(0, Math.floor((target() - now()) / 1000));
    return {
      days: pad(Math.floor(total / 86400)),
      hours: pad(Math.floor((total % 86400) / 3600)),
      minutes: pad(Math.floor((total % 3600) / 60)),
      seconds: pad(total % 60),
    };
  });
}
