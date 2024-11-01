import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevfestHeroComponent } from './devfest-hero.component';

describe('DevfestHeroComponent', () => {
  let component: DevfestHeroComponent;
  let fixture: ComponentFixture<DevfestHeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DevfestHeroComponent]
    });
    fixture = TestBed.createComponent(DevfestHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
