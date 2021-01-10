import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreemlatevawebComponent } from './creemlatevaweb.component';

describe('CreemlatevawebComponent', () => {
  let component: CreemlatevawebComponent;
  let fixture: ComponentFixture<CreemlatevawebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreemlatevawebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreemlatevawebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
