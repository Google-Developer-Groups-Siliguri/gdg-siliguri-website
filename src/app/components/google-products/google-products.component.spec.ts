import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleProductsComponent } from './google-products.component';

describe('GoogleProductsComponent', () => {
  let component: GoogleProductsComponent;
  let fixture: ComponentFixture<GoogleProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GoogleProductsComponent]
    });
    fixture = TestBed.createComponent(GoogleProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
