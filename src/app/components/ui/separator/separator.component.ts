import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-separator',
  standalone: true,
  template: `
    <div
      [class]="
        'shrink-0 bg-border ' +
        (orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]') +
        (className ? ' ' + className : '')
      "
      role="separator"
      [attr.aria-orientation]="orientation"
    ></div>
  `,
})
export class SeparatorComponent {
  @Input() className?: string;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
}
