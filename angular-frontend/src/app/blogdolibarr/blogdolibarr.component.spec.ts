import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogdolibarrComponent } from './blogdolibarr.component';

describe('BlogdolibarrComponent', () => {
  let component: BlogdolibarrComponent;
  let fixture: ComponentFixture<BlogdolibarrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogdolibarrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogdolibarrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
