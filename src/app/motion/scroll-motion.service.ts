import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

type Step = (scrollY: number) => void;

@Injectable({ providedIn: 'root' })
export class ScrollMotionService {
  readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly reducedMotion =
    this.isBrowser && matchMedia('(prefers-reduced-motion: reduce)').matches;

  private readonly steps = new Set<Step>();
  private frame = 0;

  register(step: Step): () => void {
    if (!this.isBrowser || this.reducedMotion) {
      return () => {};
    }
    this.steps.add(step);
    this.start();
    return () => {
      this.steps.delete(step);
      if (!this.steps.size) {
        cancelAnimationFrame(this.frame);
        this.frame = 0;
      }
    };
  }

  private start(): void {
    if (this.frame) {
      return;
    }
    const loop = () => {
      const y = scrollY;
      this.steps.forEach((step) => step(y));
      this.frame = requestAnimationFrame(loop);
    };
    this.frame = requestAnimationFrame(loop);
  }
}

export function easeToward(current: number | null, target: number, factor: number): number {
  return current === null ? target : current + (target - current) * factor;
}
