import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageWithBorderComponent } from './image-with-border.component';

describe('ImageWithBorderComponent', () => {
  let component: ImageWithBorderComponent;
  let fixture: ComponentFixture<ImageWithBorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageWithBorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageWithBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
