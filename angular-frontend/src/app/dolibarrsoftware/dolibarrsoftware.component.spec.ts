import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DolibarrsoftwareComponent } from './dolibarrsoftware.component';

describe('DolibarrsoftwareComponent', () => {
  let component: DolibarrsoftwareComponent;
  let fixture: ComponentFixture<DolibarrsoftwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DolibarrsoftwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DolibarrsoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
