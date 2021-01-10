import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaerrorservidorComponent } from './vistaerrorservidor.component';

describe('VistaerrorservidorComponent', () => {
  let component: VistaerrorservidorComponent;
  let fixture: ComponentFixture<VistaerrorservidorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaerrorservidorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaerrorservidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
