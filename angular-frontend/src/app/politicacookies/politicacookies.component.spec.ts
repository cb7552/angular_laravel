import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticacookiesComponent } from './politicacookies.component';

describe('PoliticacookiesComponent', () => {
  let component: PoliticacookiesComponent;
  let fixture: ComponentFixture<PoliticacookiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticacookiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticacookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
