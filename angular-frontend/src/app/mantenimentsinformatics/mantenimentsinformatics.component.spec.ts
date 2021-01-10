import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimentsinformaticsComponent } from './mantenimentsinformatics.component';

describe('MantenimentsinformaticsComponent', () => {
  let component: MantenimentsinformaticsComponent;
  let fixture: ComponentFixture<MantenimentsinformaticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimentsinformaticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimentsinformaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
