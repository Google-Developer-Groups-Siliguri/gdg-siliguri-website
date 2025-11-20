import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  imports: [],
  template: `
    <div class="mb-8">
      <h1
        class="text-[50px] lg:text-[70px] leading-tight tracking-wide font-bold text-[black]"
      >
        {{ title() }}
      </h1>
      @if (subtitle()) {
      <h3 class="text-[25px] text-gray-500">
        {{ subtitle() }}
      </h3>
      }
    </div>
  `,
  styles: ``,
})
export class PageHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>();
}
