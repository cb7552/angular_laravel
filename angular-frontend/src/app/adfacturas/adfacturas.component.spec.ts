import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdfacturasComponent } from './adfacturas.component';

describe('AdfacturasComponent', () => {
  let component: AdfacturasComponent;
  let fixture: ComponentFixture<AdfacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdfacturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdfacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
