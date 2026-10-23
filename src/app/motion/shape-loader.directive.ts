import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { ScrollMotionService } from './scroll-motion.service';

const MORPH_INTERVAL_MS = 650;
const TURN_DEG = 140;

@Directive({
  selector: '[appShapeLoader]',
  host: {
    '[style.clip-path]': "'var(--s-' + appShapeLoader()[0] + ')'",
    '[style.transition]':
      "'clip-path var(--sp-fast-d) var(--sp-fast), rotate var(--sp-default-d) var(--sp-default)'",
  },
})
export class ShapeLoaderDirective {
  readonly appShapeLoader = input.required<string[]>();

  constructor() {
    const el: HTMLElement = inject(ElementRef).nativeElement;
    const motion = inject(ScrollMotionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (motion.reducedMotion) {
        return;
      }
      let index = 0;
      let rotation = 0;
      const timer = setInterval(() => {
        const shapes = this.appShapeLoader();
        index = (index + 1) % shapes.length;
        rotation += TURN_DEG;
        el.style.clipPath = `var(--s-${shapes[index]})`;
        el.style.rotate = `${rotation}deg`;
      }, MORPH_INTERVAL_MS);
      destroyRef.onDestroy(() => clearInterval(timer));
    });
  }
}
