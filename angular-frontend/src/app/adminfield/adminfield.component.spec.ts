import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminfieldComponent } from './adminfield.component';

describe('AdminfieldComponent', () => {
  let component: AdminfieldComponent;
  let fixture: ComponentFixture<AdminfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminfieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
