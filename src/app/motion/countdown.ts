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

function plural(value: number, unit: string): string {
  return `${value} ${unit}${value === 1 ? '' : 's'}`;
}

export function countdownLabel(target: number, now: number): string {
  const minutes = Math.max(0, Math.floor((target - now) / 60000));
  if (!minutes) {
    return 'Starting now';
  }
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;
  const parts = [
    days ? plural(days, 'day') : '',
    hours ? plural(hours, 'hour') : '',
    mins ? plural(mins, 'minute') : '',
  ].filter(Boolean);
  return `${parts.join(', ')} to go`;
}
