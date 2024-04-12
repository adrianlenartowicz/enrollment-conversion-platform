import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  constructor(private elementRef: ElementRef) {}

  scrollToElement() {
    const targetElement = this.elementRef.nativeElement.querySelector('#targetElement');
    const additionalMargin = 80;
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - additionalMargin,
        behavior: 'smooth'
      });
    }
  }
}
