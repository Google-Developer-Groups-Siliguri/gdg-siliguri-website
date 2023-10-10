import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressMapComponent } from './address-map.component';

describe('AddressMapComponent', () => {
  let component: AddressMapComponent;
  let fixture: ComponentFixture<AddressMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddressMapComponent]
    });
    fixture = TestBed.createComponent(AddressMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
