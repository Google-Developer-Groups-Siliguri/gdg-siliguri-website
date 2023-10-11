import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComingSoonCardComponent } from './coming-soon-card.component';

describe('ComingSoonCardComponent', () => {
  let component: ComingSoonCardComponent;
  let fixture: ComponentFixture<ComingSoonCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComingSoonCardComponent]
    });
    fixture = TestBed.createComponent(ComingSoonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
