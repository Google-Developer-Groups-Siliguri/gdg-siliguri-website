import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';
import { ScrollMotionService, easeToward } from './scroll-motion.service';

const FROM_WEIGHT = 200;
const TO_WEIGHT = 800;
const SCROLL_RANGE = 420;

@Directive({ selector: '[appScrollWeight]' })
export class ScrollWeightDirective {
  constructor() {
    const el: HTMLElement = inject(ElementRef).nativeElement;
    const motion = inject(ScrollMotionService);
    const destroyRef = inject(DestroyRef);
    let weight: number | null = null;

    afterNextRender(() => {
      const unregister = motion.register((y) => {
        const target = FROM_WEIGHT + (TO_WEIGHT - FROM_WEIGHT) * Math.min(1, y / SCROLL_RANGE);
        weight = easeToward(weight, target, 0.1);
        el.style.fontWeight = String(Math.round(weight));
      });
      destroyRef.onDestroy(unregister);
    });
  }
}
