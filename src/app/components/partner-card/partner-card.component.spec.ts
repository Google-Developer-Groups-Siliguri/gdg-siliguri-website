import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerCardComponent } from './partner-card.component';

describe('PartnerCardComponent', () => {
  let component: PartnerCardComponent;
  let fixture: ComponentFixture<PartnerCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PartnerCardComponent]
    });
    fixture = TestBed.createComponent(PartnerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
