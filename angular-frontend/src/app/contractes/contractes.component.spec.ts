import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractesComponent } from './contractes.component';

describe('ContractesComponent', () => {
  let component: ContractesComponent;
  let fixture: ComponentFixture<ContractesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
