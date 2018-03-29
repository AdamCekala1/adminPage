import {
  Directive,
  ElementRef,
  HostListener,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appInvalidInput]',
})
export class InvalidInputDirective implements OnChanges {
  private invalidClass: string = 'is-invalid';
  private invalidClassAngular: string = 'ng-invalid';

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('change') ngOnChanges() {
    if (this.hasClass(this.invalidClassAngular, this.el.nativeElement.querySelector('input'))) {
      this.addClass();
    } else if (this.hasClass()) {
      this.removeClass();
    }
  }

  private hasClass(className: string = this.invalidClass, nativEl: any = this.el.nativeElement): boolean {
    return nativEl.classList.contains(className);
  }

  private addClass(className: string = this.invalidClass, nativEl: any = this.el.nativeElement) {
    this.renderer.addClass(nativEl, className);
  }

  private removeClass(className: string = this.invalidClass, nativEl: any = this.el.nativeElement) {
    this.renderer.removeClass(nativEl, className);
  }
}
