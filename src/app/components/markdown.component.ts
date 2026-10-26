import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { renderMarkdown } from '../shared/markdown';

@Component({
  selector: 'app-markdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'md block' },
  template: `<div [innerHTML]="html()"></div>`,
})
export class MarkdownComponent {
  readonly source = input.required<string>();

  protected readonly html = computed(() => renderMarkdown(this.source()));
}
