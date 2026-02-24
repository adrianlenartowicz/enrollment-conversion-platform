import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrl: './instructors.component.css'
})
export class InstructorsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('coachCarousel') coachCarousel?: ElementRef<HTMLDivElement>;
  private autoScrollTimer: ReturnType<typeof setInterval> | null = null;

  coachImages = [
    {
      src: 'assets/optimized/natalia-1-720.jpg',
      srcset: 'assets/optimized/natalia-1-480.jpg 480w, assets/optimized/natalia-1-720.jpg 720w, assets/optimized/natalia-1-960.jpg 960w',
      sizes: '(max-width: 640px) 75vw, (max-width: 1024px) 60vw, 420px',
      alt: 'Trenerka Natalia podczas treningu'
    },
    {
      src: 'assets/optimized/natalia-2-720.jpg',
      srcset: 'assets/optimized/natalia-2-480.jpg 480w, assets/optimized/natalia-2-720.jpg 720w, assets/optimized/natalia-2-960.jpg 960w',
      sizes: '(max-width: 640px) 75vw, (max-width: 1024px) 60vw, 420px',
      alt: 'Trenerka Natalia z grupą dzieci'
    },
    {
      src: 'assets/natalia-3.jpeg',
      sizes: '(max-width: 640px) 75vw, (max-width: 1024px) 60vw, 420px',
      alt: 'Trenerka Natalia na stadionie'
    },
    {
      src: 'assets/optimized/natalia-4-720.jpg',
      srcset: 'assets/optimized/natalia-4-480.jpg 480w, assets/optimized/natalia-4-720.jpg 720w, assets/optimized/natalia-4-960.jpg 960w',
      sizes: '(max-width: 640px) 75vw, (max-width: 1024px) 60vw, 420px',
      alt: 'Trenerka Natalia w trakcie zajęć'
    }
  ];

  constructor(
    private metaService: Meta,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.titleService.setTitle('Nasi trenerzy | Akademia Lekkiej Atletyki Wrocław');
    this.metaService.updateTag({ name: 'description', content: 'Poznaj naszych trenerów, którzy zadbają o rozwój sportowy Twojego dziecka. Treningi lekkoatletyczne z pasją i indywidualnym podejściem w Akademii Lekkiej Atletyki Wrocław.' });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
  }

  scrollCoachCarousel(direction: 'prev' | 'next'): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const carousel = this.coachCarousel?.nativeElement;
    if (!carousel) {
      return;
    }

    const amount = carousel.clientWidth * 0.9;
    carousel.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth'
    });
  }

  private startAutoScroll(): void {
    if (this.autoScrollTimer) {
      return;
    }

    this.autoScrollTimer = setInterval(() => {
      const carousel = this.coachCarousel?.nativeElement;
      if (!carousel) {
        return;
      }

      const atEnd = Math.ceil(carousel.scrollLeft + carousel.clientWidth) >= carousel.scrollWidth - 1;
      if (atEnd) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }

      this.scrollCoachCarousel('next');
    }, 4500);
  }

  private stopAutoScroll(): void {
    if (this.autoScrollTimer) {
      clearInterval(this.autoScrollTimer);
      this.autoScrollTimer = null;
    }
  }
}
