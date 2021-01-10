import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdcontractesComponent } from './adcontractes.component';

describe('AdcontractesComponent', () => {
  let component: AdcontractesComponent;
  let fixture: ComponentFixture<AdcontractesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdcontractesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdcontractesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
