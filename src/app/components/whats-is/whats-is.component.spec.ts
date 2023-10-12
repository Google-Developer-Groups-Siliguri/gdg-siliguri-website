import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsIsComponent } from './whats-is.component';

describe('WhatsIsComponent', () => {
  let component: WhatsIsComponent;
  let fixture: ComponentFixture<WhatsIsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WhatsIsComponent]
    });
    fixture = TestBed.createComponent(WhatsIsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
