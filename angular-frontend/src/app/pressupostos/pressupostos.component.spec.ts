import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressupostosComponent } from './pressupostos.component';

describe('PressupostosComponent', () => {
  let component: PressupostosComponent;
  let fixture: ComponentFixture<PressupostosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PressupostosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PressupostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
