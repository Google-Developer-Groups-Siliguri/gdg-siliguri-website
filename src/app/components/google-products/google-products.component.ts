import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeadingComponent } from '../ui/section-heading/section-heading';

@Component({
  selector: 'app-google-products',
  imports: [SectionHeadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './google-products.component.html',
})
export class GoogleProductsComponent {}
