import { ik, srcset } from './image';

const MASTER = 'https://ik.imagekit.io/gdgsiliguri1/teams/Debajit%20Mallick.webp';

describe('image helpers', () => {
  it('appends ImageKit transforms', () => {
    expect(ik(MASTER, { w: 400, h: 400, fit: 'face' })).toBe(`${MASTER}?tr=w-400,h-400,fo-face`);
    expect(ik(MASTER, { w: 320.4 })).toBe(`${MASTER}?tr=w-320`);
    expect(ik(MASTER, { w: 88, h: 88, fit: 'contain' })).toBe(`${MASTER}?tr=w-88,h-88,c-at_max`);
    expect(ik(`${MASTER}?updatedAt=1`, { w: 100 })).toBe(`${MASTER}?updatedAt=1&tr=w-100`);
  });

  it('leaves other URLs and already transformed URLs alone', () => {
    expect(ik('https://example.com/a.png', { w: 100 })).toBe('https://example.com/a.png');
    expect(ik('assets/images/gdg.png', { w: 100 })).toBe('assets/images/gdg.png');
    expect(ik(`${MASTER}?tr=w-10`, { w: 100 })).toBe(`${MASTER}?tr=w-10`);
    expect(ik(MASTER)).toBe(MASTER);
    expect(ik('', { w: 100 })).toBe('');
  });

  it('builds a srcset', () => {
    expect(srcset(MASTER)).toBe(
      [320, 640, 960, 1280].map((w) => `${MASTER}?tr=w-${w} ${w}w`).join(', ')
    );
    expect(srcset(MASTER, [200, 400], { fit: 'face', aspect: 1 })).toBe(
      `${MASTER}?tr=w-200,h-200,fo-face 200w, ${MASTER}?tr=w-400,h-400,fo-face 400w`
    );
    expect(srcset('https://example.com/a.png')).toBe('');
  });
});
