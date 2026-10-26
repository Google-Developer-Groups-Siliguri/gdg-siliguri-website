import type { Media } from '../services/bundle-types';
import { ImageView } from './view-models';

export type ImageFit = 'cover' | 'contain' | 'face';

export interface ImageSize {
  w?: number;
  h?: number;
  fit?: ImageFit;
}

export const DEFAULT_WIDTHS = [320, 640, 960, 1280];

const IMAGEKIT_HOST = 'ik.imagekit.io';
const FIT_PARAMS: Record<ImageFit, string> = {
  cover: 'c-maintain_ratio',
  contain: 'c-at_max',
  face: 'fo-face',
};

export function isImageKit(url: string): boolean {
  try {
    return new URL(url).hostname === IMAGEKIT_HOST;
  } catch {
    return false;
  }
}

function positive(value: number | undefined): number | undefined {
  return value && value > 0 ? Math.round(value) : undefined;
}

export function ik(url: string, { w, h, fit }: ImageSize = {}): string {
  if (!url || !isImageKit(url) || /[?&]tr=/.test(url)) {
    return url;
  }
  const width = positive(w);
  const height = positive(h);
  const params = [
    width && `w-${width}`,
    height && `h-${height}`,
    fit && FIT_PARAMS[fit],
  ].filter(Boolean);
  if (!params.length) {
    return url;
  }
  const [base, hash = ''] = url.split('#');
  const joiner = base.includes('?') ? '&' : '?';
  return `${base}${joiner}tr=${params.join(',')}${hash ? `#${hash}` : ''}`;
}

export interface SrcsetOptions {
  fit?: ImageFit;
  aspect?: number;
}

export function srcset(
  url: string,
  widths: number[] = DEFAULT_WIDTHS,
  { fit, aspect }: SrcsetOptions = {}
): string {
  if (!url || !isImageKit(url)) {
    return '';
  }
  return widths
    .map((w) => `${ik(url, { w, h: aspect ? w / aspect : undefined, fit })} ${w}w`)
    .join(', ');
}

export function toImage(media: Media | undefined, fallbackAlt = ''): ImageView {
  return {
    url: media?.url ?? '',
    alt: media?.alt || fallbackAlt,
    ...(media?.width ? { width: media.width } : {}),
    ...(media?.height ? { height: media.height } : {}),
  };
}
