import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMapComponent } from './contact-map.component';

describe('ContactMapComponent', () => {
  let component: ContactMapComponent;
  let fixture: ComponentFixture<ContactMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContactMapComponent]
    });
    fixture = TestBed.createComponent(ContactMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
