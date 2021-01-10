import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvislegalComponent } from './avislegal.component';

describe('AvislegalComponent', () => {
  let component: AvislegalComponent;
  let fixture: ComponentFixture<AvislegalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvislegalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvislegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
