import DOMPurify from 'dompurify';
import { Marked } from 'marked';

const markdown = new Marked({
  gfm: true,
  async: false,
  renderer: {
    html: () => '',
  },
});

export function renderMarkdown(source: string | undefined): string {
  const html = markdown.parse(source ?? '', { async: false });
  return DOMPurify.isSupported ? DOMPurify.sanitize(html) : html;
}
