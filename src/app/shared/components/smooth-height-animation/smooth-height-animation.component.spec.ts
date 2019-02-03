import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmoothHeightAnimationComponent } from './smooth-height-animation.component';

describe('SmoothHeightAnimationComponent', () => {
  let component: SmoothHeightAnimationComponent;
  let fixture: ComponentFixture<SmoothHeightAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmoothHeightAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmoothHeightAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
