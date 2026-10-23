import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { ScrollMotionService } from './scroll-motion.service';

const STAGGER_MS = 70;

@Directive({
  selector: '[appReveal]',
  host: { 'data-rv': '' },
})
export class RevealDirective {
  readonly appReveal = input(0, { transform: (v: unknown) => numberAttribute(v, 0) });

  private readonly el: HTMLElement = inject(ElementRef).nativeElement;

  constructor() {
    const motion = inject(ScrollMotionService);
    const document = inject(DOCUMENT);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      document.documentElement.classList.remove('rv-pending');
      if (motion.reducedMotion) {
        return;
      }
      Object.assign(this.el.style, { opacity: '0', translate: '0 40px', scale: '.97' });
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            this.reveal();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(this.el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  private reveal(): void {
    const delay = this.appReveal() * STAGGER_MS;
    const style = this.el.style;
    style.transition = [
      `opacity 700ms ease ${delay}ms`,
      `translate 1000ms var(--e-emph) ${delay}ms`,
      `scale 1000ms var(--e-emph) ${delay}ms`,
    ].join(',');
    style.opacity = '1';
    style.translate = '0 0';
    style.scale = '1';
    setTimeout(() => {
      style.transition = '';
      style.translate = '';
      style.scale = '';
    }, delay + 1400);
  }
}
