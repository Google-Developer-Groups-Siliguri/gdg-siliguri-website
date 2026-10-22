import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { M3ShapeComponent } from 'src/app/components/ui/m3-shape/m3-shape';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [PageHeaderComponent, M3ShapeComponent],
    });
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
