import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdpressupostosComponent } from './adpressupostos.component';

describe('AdpressupostosComponent', () => {
  let component: AdpressupostosComponent;
  let fixture: ComponentFixture<AdpressupostosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdpressupostosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdpressupostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
