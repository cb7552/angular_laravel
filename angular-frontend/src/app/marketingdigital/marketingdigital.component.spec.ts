import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingdigitalComponent } from './marketingdigital.component';

describe('MarketingdigitalComponent', () => {
  let component: MarketingdigitalComponent;
  let fixture: ComponentFixture<MarketingdigitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingdigitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingdigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
