import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateTextComponent } from './animate-text.component';

describe('AnimateTextComponent', () => {
  let component: AnimateTextComponent;
  let fixture: ComponentFixture<AnimateTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimateTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
