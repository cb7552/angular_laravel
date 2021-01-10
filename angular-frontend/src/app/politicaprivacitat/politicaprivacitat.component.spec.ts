import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaprivacitatComponent } from './politicaprivacitat.component';

describe('PoliticaprivacitatComponent', () => {
  let component: PoliticaprivacitatComponent;
  let fixture: ComponentFixture<PoliticaprivacitatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticaprivacitatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticaprivacitatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
