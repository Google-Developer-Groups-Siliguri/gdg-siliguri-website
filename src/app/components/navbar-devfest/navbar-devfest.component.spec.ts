import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDevfestComponent } from './navbar-devfest.component';

describe('NavbarDevfestComponent', () => {
  let component: NavbarDevfestComponent;
  let fixture: ComponentFixture<NavbarDevfestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavbarDevfestComponent]
    });
    fixture = TestBed.createComponent(NavbarDevfestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
