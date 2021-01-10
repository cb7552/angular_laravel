import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguretatComponent } from './seguretat.component';

describe('SeguretatComponent', () => {
  let component: SeguretatComponent;
  let fixture: ComponentFixture<SeguretatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguretatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguretatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
