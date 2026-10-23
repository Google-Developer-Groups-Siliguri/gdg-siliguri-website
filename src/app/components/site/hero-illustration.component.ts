import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ParallaxDirective } from 'src/app/motion/parallax.directive';
import { RevealDirective } from 'src/app/motion/reveal.directive';

@Component({
  selector: 'app-hero-illustration',
  imports: [ParallaxDirective, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative block min-w-0 flex-[1_1_360px] h-[clamp(360px,44vw,540px)]' },
  template: `
    <div
      [appParallax]="-0.05"
      role="img"
      aria-label="Kanchenjunga and the Darjeeling toy train"
      class="ill absolute right-0 top-0 aspect-square w-[min(72%,380px)] bg-pri-c text-on-pri-c transition-[scale] duration-[900ms] ease-bounce [clip-path:var(--s-cookie9)] hover:[scale:1.04]"
    >
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position:absolute;inset:8%;width:84%;height:84%;overflow:hidden"><g style="animation:spin 24s linear infinite;animation-play-state:var(--ps)"><circle cx="156" cy="40" r="9" vector-effect="non-scaling-stroke"></circle><path d="M156 24 v-5 M156 56 v5 M140 40 h-5 M172 40 h5 M145 29 l-3 -3 M167 51 l3 3 M145 51 l-3 3 M167 29 l3 -3" vector-effect="non-scaling-stroke"></path></g>
        <g style="animation:drift 7s ease-in-out infinite;animation-play-state:var(--ps)"><path d="M22 48 h34 a6 6 0 0 0 -6 -9 a9 9 0 0 0 -16 0 a6 6 0 0 0 -12 9 z" vector-effect="non-scaling-stroke"></path></g><g style="animation:fly 4s ease-in-out infinite;animation-play-state:var(--ps)"><path d="M92 28 q3 -3 6 0 q3 -3 6 0" vector-effect="non-scaling-stroke"></path><path d="M108 22 q2.5 -2.5 5 0 q2.5 -2.5 5 0" vector-effect="non-scaling-stroke"></path></g>
        <path d="M6 118 L36 90 L54 102 L80 74 L96 86 L118 64 L150 98 L170 84 L194 112" vector-effect="non-scaling-stroke" opacity=".45"></path>
        <path d="M6 136 L50 82 L66 100 L104 44 L132 84 L148 68 L194 132" vector-effect="non-scaling-stroke"></path>
        <path d="M93 58 L104 44 L116 61 L110 57 L104 63 L98 57 Z" vector-effect="non-scaling-stroke"></path><path d="M43 91 L50 82 L57 92 L53 89 L48 93 Z" vector-effect="non-scaling-stroke"></path><path d="M142 75 L148 68 L155 77 L151 74 Z" vector-effect="non-scaling-stroke"></path>
        <path d="M14 156 l6 -14 l6 14 z M20 156 v4 M28 158 l5 -12 l5 12 z M33 158 v3 M166 122 l5 -12 l5 12 z M171 122 v3 M178 126 l4 -10 l4 10 z" vector-effect="non-scaling-stroke"></path>
        <path d="M8 176 H192" vector-effect="non-scaling-stroke"></path><path d="M8 180 H192" stroke-dasharray="3 5" vector-effect="non-scaling-stroke" style="animation:rail .5s linear infinite;animation-play-state:var(--ps)"></path><path d="M8 184 H192" vector-effect="non-scaling-stroke"></path>
        <g style="animation:bob .6s ease-in-out infinite;animation-play-state:var(--ps)">
        <path d="M28 166 l-6 8 h8" vector-effect="non-scaling-stroke"></path><circle cx="31" cy="152" r="3" vector-effect="non-scaling-stroke"></circle>
        <rect x="34" y="144" width="44" height="22" rx="6" vector-effect="non-scaling-stroke"></rect><path d="M46 144 v22 M60 144 v22" vector-effect="non-scaling-stroke"></path>
        <path d="M43 132 h12 M45 132 v12 M53 132 v12" vector-effect="non-scaling-stroke"></path><path d="M64 144 a5 5 0 0 1 10 0" vector-effect="non-scaling-stroke"></path>
        <rect x="78" y="130" width="24" height="36" rx="3" vector-effect="non-scaling-stroke"></rect><path d="M75 130 h30" vector-effect="non-scaling-stroke"></path><rect x="83" y="136" width="14" height="10" rx="2" vector-effect="non-scaling-stroke"></rect>
        <path d="M102 160 h6" vector-effect="non-scaling-stroke"></path><rect x="108" y="140" width="40" height="26" rx="4" vector-effect="non-scaling-stroke"></rect><path d="M105 140 h46" vector-effect="non-scaling-stroke"></path>
        <rect x="113" y="146" width="8" height="8" rx="1.5" vector-effect="non-scaling-stroke"></rect><rect x="124" y="146" width="8" height="8" rx="1.5" vector-effect="non-scaling-stroke"></rect><rect x="135" y="146" width="8" height="8" rx="1.5" vector-effect="non-scaling-stroke"></rect>
        <path d="M148 160 h6" vector-effect="non-scaling-stroke"></path><rect x="154" y="140" width="40" height="26" rx="4" vector-effect="non-scaling-stroke"></rect><path d="M151 140 h46" vector-effect="non-scaling-stroke"></path><rect x="159" y="146" width="8" height="8" rx="1.5" vector-effect="non-scaling-stroke"></rect><rect x="170" y="146" width="8" height="8" rx="1.5" vector-effect="non-scaling-stroke"></rect>
        </g>
        <g style="animation:spin 1.2s linear infinite;animation-play-state:var(--ps)"><circle cx="46" cy="170" r="6" vector-effect="non-scaling-stroke"></circle><path d="M40 170 H52 M46 164 V176" vector-effect="non-scaling-stroke"></path></g><g style="animation:spin 1.2s linear infinite;animation-play-state:var(--ps)"><circle cx="66" cy="170" r="6" vector-effect="non-scaling-stroke"></circle><path d="M60 170 H72 M66 164 V176" vector-effect="non-scaling-stroke"></path></g><g style="animation:spin 1.2s linear infinite;animation-play-state:var(--ps)"><circle cx="92" cy="170" r="6" vector-effect="non-scaling-stroke"></circle><path d="M86 170 H98 M92 164 V176" vector-effect="non-scaling-stroke"></path></g><g style="animation:spin 1.2s linear infinite;animation-play-state:var(--ps)"><circle cx="118" cy="170" r="5" vector-effect="non-scaling-stroke"></circle><path d="M113 170 H123 M118 165 V175" vector-effect="non-scaling-stroke"></path></g><g style="animation:spin 1.2s linear infinite;animation-play-state:var(--ps)"><circle cx="140" cy="170" r="5" vector-effect="non-scaling-stroke"></circle><path d="M135 170 H145 M140 165 V175" vector-effect="non-scaling-stroke"></path></g><g style="animation:spin 1.2s linear infinite;animation-play-state:var(--ps)"><circle cx="164" cy="170" r="5" vector-effect="non-scaling-stroke"></circle><path d="M159 170 H169 M164 165 V175" vector-effect="non-scaling-stroke"></path></g><g style="animation:spin 1.2s linear infinite;animation-play-state:var(--ps)"><circle cx="186" cy="170" r="5" vector-effect="non-scaling-stroke"></circle><path d="M181 170 H191 M186 165 V175" vector-effect="non-scaling-stroke"></path></g><path d="M46 170 H66" vector-effect="non-scaling-stroke"></path>
        <circle cx="49" cy="124" r="5" vector-effect="non-scaling-stroke" style="animation:smoke 2.4s ease-out infinite;animation-play-state:var(--ps)"></circle>
        <circle cx="49" cy="124" r="5" vector-effect="non-scaling-stroke" style="animation:smoke 2.4s ease-out infinite -.8s;animation-play-state:var(--ps)"></circle>
        <circle cx="49" cy="124" r="5" vector-effect="non-scaling-stroke" style="animation:smoke 2.4s ease-out infinite -1.6s;animation-play-state:var(--ps)"></circle></svg>
    </div>
    <div
      [appParallax]="0.04"
      role="img"
      aria-label="Tea garden"
      class="ill absolute left-0 top-[38%] aspect-square w-[min(42%,220px)] bg-ter-c text-on-ter-c transition-[scale] duration-[900ms] ease-bounce [clip-path:var(--s-clover4)] hover:[scale:1.04]"
    >
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position:absolute;inset:8%;width:84%;height:84%;overflow:hidden"><circle cx="160" cy="40" r="9" vector-effect="non-scaling-stroke"></circle><g style="animation:drift 6s ease-in-out infinite;animation-play-state:var(--ps)"><path d="M112 52 h34 a6 6 0 0 0 -6 -9 a9 9 0 0 0 -16 0 a6 6 0 0 0 -12 9 z" vector-effect="non-scaling-stroke"></path></g><g style="animation:fly 4.5s ease-in-out infinite;animation-play-state:var(--ps)"><path d="M30 40 q3 -3 6 0 q3 -3 6 0" vector-effect="non-scaling-stroke"></path><path d="M46 34 q2.5 -2.5 5 0 q2.5 -2.5 5 0" vector-effect="non-scaling-stroke"></path></g>
        <path d="M0 94 Q50 60 100 80 T200 70" vector-effect="non-scaling-stroke"></path><path d="M0 108 Q60 86 120 100 T200 94" vector-effect="non-scaling-stroke" opacity=".45"></path>
        <g style="animation:sway 4s ease-in-out infinite;animation-play-state:var(--ps)" class="pivot-bottom"><path d="M58 106 V64" vector-effect="non-scaling-stroke"></path><path d="M46 70 q12 -14 24 0 z M44 82 q14 -12 28 0 z M48 94 q10 -10 20 0 z" vector-effect="non-scaling-stroke"></path></g>
        <g style="animation:sway 4.6s ease-in-out infinite -1s;animation-play-state:var(--ps)" class="pivot-bottom"><path d="M92 98 V68" vector-effect="non-scaling-stroke"></path><path d="M84 74 q8 -10 16 0 z M82 84 q10 -9 20 0 z" vector-effect="non-scaling-stroke"></path></g>
        <g style="animation:rowsway 3s ease-in-out infinite;animation-play-state:var(--ps)"><path d="M-6 124 q10 -14 20 0 q10 -14 20 0 q10 -14 20 0 q10 -14 20 0 q10 -14 20 0 q10 -14 20 0 q10 -14 20 0 q10 -14 20 0 q10 -14 20 0 q10 -14 20 0" vector-effect="non-scaling-stroke"></path><path d="M4 115 v-3 M24 115 v-3 M44 115 v-3 M64 115 v-3 M84 115 v-3 M104 115 v-3 M124 115 v-3 M144 115 v-3 M164 115 v-3" vector-effect="non-scaling-stroke"></path></g><g style="animation:rowsway 3s ease-in-out infinite -1s;animation-play-state:var(--ps)"><path d="M-6 150 q11 -15.399999999999999 22 0 q11 -15.399999999999999 22 0 q11 -15.399999999999999 22 0 q11 -15.399999999999999 22 0 q11 -15.399999999999999 22 0 q11 -15.399999999999999 22 0 q11 -15.399999999999999 22 0 q11 -15.399999999999999 22 0 q11 -15.399999999999999 22 0 q11 -15.399999999999999 22 0" vector-effect="non-scaling-stroke"></path><path d="M5 140.1 v-3 M27 140.1 v-3 M49 140.1 v-3 M71 140.1 v-3 M93 140.1 v-3 M115 140.1 v-3 M137 140.1 v-3 M159 140.1 v-3 M181 140.1 v-3" vector-effect="non-scaling-stroke"></path></g><g style="animation:rowsway 3s ease-in-out infinite -2s;animation-play-state:var(--ps)"><path d="M-6 178 q12 -16.799999999999997 24 0 q12 -16.799999999999997 24 0 q12 -16.799999999999997 24 0 q12 -16.799999999999997 24 0 q12 -16.799999999999997 24 0 q12 -16.799999999999997 24 0 q12 -16.799999999999997 24 0 q12 -16.799999999999997 24 0 q12 -16.799999999999997 24 0 q12 -16.799999999999997 24 0" vector-effect="non-scaling-stroke"></path><path d="M6 167.2 v-3 M30 167.2 v-3 M54 167.2 v-3 M78 167.2 v-3 M102 167.2 v-3 M126 167.2 v-3 M150 167.2 v-3 M174 167.2 v-3 M198 167.2 v-3" vector-effect="non-scaling-stroke"></path></g>
        <g style="animation:sway 3.4s ease-in-out infinite;animation-play-state:var(--ps)" class="pivot-bottom"><path d="M168 198 q-6 -30 6 -60" vector-effect="non-scaling-stroke"></path><path d="M170 170 q-18 -4.666666666666667 -18 -14 q3.6 2.8000000000000003 18 14 z" vector-effect="non-scaling-stroke"></path><path d="M171 160 q18 -4.666666666666667 18 -14 q-3.6 2.8000000000000003 -18 14 z" vector-effect="non-scaling-stroke"></path><path d="M172 148 q-16 -4 -16 -12 q3.2 2.4000000000000004 16 12 z" vector-effect="non-scaling-stroke"></path><path d="M173 140 q14 -5.333333333333333 14 -16 q-2.8000000000000003 3.2 -14 16 z" vector-effect="non-scaling-stroke"></path></g>
        <g style="animation:fall 3.2s ease-in infinite;animation-play-state:var(--ps)"><path d="M120 60 q8 -2 8 -6 q-1.6 1.2000000000000002 -8 6 z" vector-effect="non-scaling-stroke"></path></g></svg>
    </div>
    <div
      [appParallax]="0.08"
      role="img"
      aria-label="Coronation Bridge"
      class="ill absolute bottom-0 left-[34%] aspect-square w-[min(32%,170px)] bg-sec-c text-on-sec-c transition-[scale] duration-[900ms] ease-bounce [clip-path:var(--s-circle)] hover:[scale:1.04]"
    >
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position:absolute;inset:8%;width:84%;height:84%;overflow:hidden"><g style="animation:drift 6s ease-in-out infinite;animation-play-state:var(--ps)"><path d="M120 40 h34 a6 6 0 0 0 -6 -9 a9 9 0 0 0 -16 0 a6 6 0 0 0 -12 9 z" vector-effect="non-scaling-stroke"></path></g><g style="animation:fly 4s ease-in-out infinite;animation-play-state:var(--ps)"><path d="M36 30 q3 -3 6 0 q3 -3 6 0" vector-effect="non-scaling-stroke"></path><path d="M52 24 q2.5 -2.5 5 0 q2.5 -2.5 5 0" vector-effect="non-scaling-stroke"></path></g>
        <path d="M0 70 Q40 44 84 60 T200 50" vector-effect="non-scaling-stroke"></path><path d="M0 82 Q60 64 120 76 T200 70" vector-effect="non-scaling-stroke" opacity=".45"></path>
        <path d="M30 96 V76 h7 M170 96 V76 h-7" vector-effect="non-scaling-stroke"></path><circle cx="38" cy="78" r="2" vector-effect="non-scaling-stroke"></circle><circle cx="162" cy="78" r="2" vector-effect="non-scaling-stroke"></circle>
        <g style="animation:cross 4s linear infinite;animation-play-state:var(--ps)"><rect x="0" y="86" width="22" height="8" rx="3" vector-effect="non-scaling-stroke"></rect><path d="M5 86 l3 -5 h7 l3 5" vector-effect="non-scaling-stroke"></path></g>
        <path d="M8 96 H192 M8 104 H192" vector-effect="non-scaling-stroke"></path><path d="M8 100 H192" stroke-dasharray="1 5" vector-effect="non-scaling-stroke"></path>
        <path d="M30 150 Q100 40 170 150" vector-effect="non-scaling-stroke"></path><path d="M42 150 Q100 58 158 150" vector-effect="non-scaling-stroke"></path>
        <path d="M46 124 V104 M60 108 V104 M56 112 V104 M72 92 V104 M86 86 V104 M100 84 V104 M114 86 V104 M128 92 V104 M144 112 V104 M154 124 V104" vector-effect="non-scaling-stroke"></path>
        <path d="M20 104 V158 H40 V104 M18 104 h24 M160 104 V158 H180 V104 M158 104 h24" vector-effect="non-scaling-stroke"></path>
        <path d="M24 120 h12 M24 136 h12 M164 120 h12 M164 136 h12" vector-effect="non-scaling-stroke"></path>
        <g style="overflow:hidden"><g style="animation:flow 1.6s linear infinite;animation-play-state:var(--ps)"><path d="M-20 168 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0" vector-effect="non-scaling-stroke"></path></g><g style="animation:flow 1.6s linear infinite -.8s;animation-play-state:var(--ps)"><path d="M-20 182 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0" vector-effect="non-scaling-stroke"></path></g><g style="animation:flow 1.6s linear infinite -.4s;animation-play-state:var(--ps)"><path d="M-20 194 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0" vector-effect="non-scaling-stroke"></path></g></g>
        <g style="animation:drift 5s ease-in-out infinite;animation-play-state:var(--ps)"><path d="M112 176 h26 l-5 6 h-16 z M125 176 v-16 l9 13 h-9" vector-effect="non-scaling-stroke"></path></g></svg>
    </div>
    <span
      appReveal="4"
      class="absolute left-[2%] top-[10%] flex h-11 items-center gap-2 rounded-[22px] bg-srf-3 pl-3 pr-[18px] font-manrope text-sm font-bold shadow-[0_12px_28px_-14px_rgba(0,0,0,.5)]"
    >
      <span class="h-3.5 w-3.5 bg-pri [clip-path:var(--s-sunny)]"></span>North Bengal &amp; Sikkim
    </span>
  `,
})
export class HeroIllustrationComponent {}
