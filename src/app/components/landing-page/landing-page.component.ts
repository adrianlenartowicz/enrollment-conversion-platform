import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  scrollToSteps() {
    const targetElement = document.getElementById('stepsToJoin');
    const additionalMargin = 20;
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - additionalMargin,
        behavior: 'smooth'
      });
    }
  }
}
