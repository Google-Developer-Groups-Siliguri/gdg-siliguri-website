import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { ScrollMotionService, easeToward } from './scroll-motion.service';

@Directive({ selector: '[appParallax]' })
export class ParallaxDirective {
  readonly appParallax = input.required<number>();

  constructor() {
    const el: HTMLElement = inject(ElementRef).nativeElement;
    const motion = inject(ScrollMotionService);
    const destroyRef = inject(DestroyRef);
    let offset: number | null = null;

    afterNextRender(() => {
      const unregister = motion.register((y) => {
        offset = easeToward(offset, y * this.appParallax(), 0.1);
        el.style.translate = `0 ${offset.toFixed(2)}px`;
      });
      destroyRef.onDestroy(unregister);
    });
  }
}
