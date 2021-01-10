import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicisessioComponent } from './inicisessio.component';

describe('InicisessioComponent', () => {
  let component: InicisessioComponent;
  let fixture: ComponentFixture<InicisessioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicisessioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicisessioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
