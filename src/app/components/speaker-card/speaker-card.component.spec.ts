import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerCardComponent } from './speaker-card.component';

describe('SpeakerCardComponent', () => {
  let component: SpeakerCardComponent;
  let fixture: ComponentFixture<SpeakerCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SpeakerCardComponent]
    });
    fixture = TestBed.createComponent(SpeakerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
