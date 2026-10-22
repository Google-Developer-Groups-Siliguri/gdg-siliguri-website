import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type M3ShapeName =
  | 'circle'
  | 'pill'
  | 'arch'
  | 'semicircle'
  | 'cookie4'
  | 'cookie6'
  | 'cookie9'
  | 'cookie12'
  | 'clover4'
  | 'clover8'
  | 'sunny'
  | 'very-sunny'
  | 'flower';

interface Scallop {
  lobes: number;
  depth: number;
}

const SCALLOPS: Partial<Record<M3ShapeName, Scallop>> = {
  cookie4: { lobes: 4, depth: 0.1 },
  cookie6: { lobes: 6, depth: 0.08 },
  cookie9: { lobes: 9, depth: 0.065 },
  cookie12: { lobes: 12, depth: 0.05 },
  clover4: { lobes: 4, depth: 0.3 },
  clover8: { lobes: 8, depth: 0.18 },
  sunny: { lobes: 8, depth: 0.09 },
  'very-sunny': { lobes: 8, depth: 0.16 },
  flower: { lobes: 8, depth: 0.12 },
};

const STATIC_PATHS: Partial<Record<M3ShapeName, string>> = {
  circle: 'M50 0A50 50 0 1 1 50 100A50 50 0 1 1 50 0Z',
  pill: 'M30 0H70A30 30 0 0 1 70 100H30A30 30 0 0 1 30 0Z',
  arch: 'M0 100V50A50 50 0 0 1 100 50V100Z',
  semicircle: 'M0 75A50 50 0 0 1 100 75Z',
};

const SAMPLE_COUNT = 240;

function scallopPath({ lobes, depth }: Scallop): string {
  const radius = 50 / (1 + depth);
  const points = Array.from({ length: SAMPLE_COUNT }, (_, i) => {
    const angle = (i / SAMPLE_COUNT) * Math.PI * 2;
    const r = radius * (1 + depth * Math.cos(lobes * angle));
    const x = 50 + r * Math.cos(angle - Math.PI / 2);
    const y = 50 + r * Math.sin(angle - Math.PI / 2);
    return `${x.toFixed(2)} ${y.toFixed(2)}`;
  });
  return `M${points.join('L')}Z`;
}

export function m3ShapePath(shape: M3ShapeName): string {
  const scallop = SCALLOPS[shape];
  return scallop ? scallopPath(scallop) : STATIC_PATHS[shape] ?? STATIC_PATHS.circle!;
}

export function m3ShapeMask(shape: M3ShapeName): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='${m3ShapePath(shape)}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

@Component({
  selector: 'app-m3-shape',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block', 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 100 100" class="h-full w-full overflow-visible" fill="currentColor">
      <path [attr.d]="path()" />
    </svg>
  `,
})
export class M3ShapeComponent {
  readonly shape = input<M3ShapeName>('circle');
  protected readonly path = computed(() => m3ShapePath(this.shape()));
}
