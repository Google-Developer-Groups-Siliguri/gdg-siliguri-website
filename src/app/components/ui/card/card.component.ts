import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div
      class="rounded-xl border shadow bg-card text-card-foreground"
      [class]="className"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  @Input() className?: string;
}

@Component({
  selector: 'app-card-header',
  standalone: true,
  template: `
    <div class="flex flex-col space-y-1.5 p-6" [class]="className">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardHeaderComponent {
  @Input() className?: string;
}

@Component({
  selector: 'app-card-title',
  standalone: true,
  template: `
    <div class="font-semibold tracking-tight leading-none" [class]="className">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardTitleComponent {
  @Input() className?: string;
}

@Component({
  selector: 'app-card-description',
  standalone: true,
  template: `
    <div class="text-sm text-muted-foreground" [class]="className">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardDescriptionComponent {
  @Input() className?: string;
}

@Component({
  selector: 'app-card-content',
  standalone: true,
  template: `
    <div class="p-6 pt-0" [class]="className">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardContentComponent {
  @Input() className?: string;
}

@Component({
  selector: 'app-card-footer',
  standalone: true,
  template: `
    <div class="flex items-center p-6 pt-0" [class]="className">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardFooterComponent {
  @Input() className?: string;
}

// export {
//   CardComponent,
//   CardHeaderComponent,
//   CardTitleComponent,
//   CardDescriptionComponent,
//   CardContentComponent,
//   CardFooterComponent,
// };
