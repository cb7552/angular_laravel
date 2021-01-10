import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicararticleComponent } from './publicararticle.component';

describe('PublicararticleComponent', () => {
  let component: PublicararticleComponent;
  let fixture: ComponentFixture<PublicararticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicararticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicararticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
