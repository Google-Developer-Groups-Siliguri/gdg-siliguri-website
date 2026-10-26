import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import modulesExample from '../../generated/examples/modules.json';
import showcaseExample from '../../generated/examples/showcase.json';
import type { ModuleDoc, ShowcaseDoc } from '../../services/bundle-types';
import { resolveMarkers } from '../../services/firestore-rest.testing';
import { toModuleView } from '../../shared/modules';
import { ModuleView } from '../../shared/view-models';
import { ModuleHostComponent } from './module-host.component';

const modules = modulesExample as unknown as ModuleDoc[];
const showcase = [{ ...(resolveMarkers(showcaseExample) as ShowcaseDoc), id: 'krishimitra' }];

function view(index: number): ModuleView {
  const mapped = toModuleView(modules[index], { showcase, blogs: [] });
  if (!mapped) {
    throw new Error(`module ${index} did not map`);
  }
  return mapped;
}

describe('ModuleHostComponent', () => {
  let fixture: ComponentFixture<ModuleHostComponent>;
  let ref: ComponentRef<ModuleHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModuleHostComponent],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(ModuleHostComponent);
    ref = fixture.componentRef;
  });

  function render(module: ModuleView, limit: number | null = null): HTMLElement {
    ref.setInput('module', module);
    ref.setInput('limit', limit);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders showcase cards with repo and demo links', () => {
    const el = render(view(0));
    expect(el.querySelector('h3')?.textContent).toContain('KrishiMitra');
    expect(el.querySelector('a[href="https://github.com/priya/krishimitra"]')).toBeTruthy();
    expect(el.querySelector('img')?.getAttribute('src')).toContain('tr=w-640,h-360');
  });

  it('renders links with a fallback icon for icons the font does not ship', () => {
    const el = render(view(1));
    const icons = Array.from(el.querySelectorAll('.ms')).map((i) => i.textContent?.trim());
    expect(icons).toEqual(['menu', 'arrow_outward']);
  });

  it('renders the gallery', () => {
    const el = render(view(2));
    expect(el.querySelectorAll('button img').length).toBe(2);
  });

  it('sanitises markdown in cards and rich text', () => {
    const cards = render(view(3));
    expect(cards.querySelector('strong')?.textContent).toBe('Gemini');
    expect(cards.innerHTML).not.toContain('<script');
    const rich = render(view(4));
    expect(rich.querySelector('h1')?.textContent).toBe('Be kind');
    expect(rich.innerHTML).not.toContain('onerror');
  });

  it('limits items and offers a link to the module page', () => {
    const many = { ...view(1), links: Array.from({ length: 8 }, (_, i) => ({ label: `L${i}`, url: `https://e.com/${i}`, description: '', icon: '' })) };
    const el = render(many, 6);
    expect(el.querySelectorAll('a[target="_blank"]').length).toBe(6);
    expect(el.querySelector('a[href="/resources"]')?.textContent).toContain('See all');
  });
});
