import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface PricingOption {
  name: string;
  price: string;
  period: string;
  features: string[];
  recommended: boolean;
}

interface Testimonial {
  text: string;
  author: string;
  role: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit, OnDestroy, AfterViewInit {
  isReportModalOpen = false;
  private readonly bodyClass = 'has-mobile-sticky-cta';
  @ViewChild('coachShortCarousel') coachShortCarousel?: ElementRef<HTMLDivElement>;
  private coachShortTimer: ReturnType<typeof setInterval> | null = null;

  pricingOptions: PricingOption[] = [
    {
      name: 'Raz w tygodniu',
      price: '150 zł',
      period: '/miesiąc',
      features: [
        '1 trening w tygodniu (60 min)',
        'Kwartalne konsultacje z fizjoterapeutą',
        'Kwartalny raport postępów',
        'Koszulka klubowa',
        'Woda butelkowana na każdych zajęciach'
      ],
      recommended: false
    },
    {
      name: 'Dwa razy w tygodniu',
      price: '230 zł',
      period: '/miesiąc',
      features: [
        '2 treningi w tygodniu (2x 60 min)',
        'Kwartalne konsultacje z fizjoterapeutą',
        'Kwartalny raport postępów',
        'Koszulka klubowa',
        'Woda butelkowana na każdych zajęciach'
      ],
      recommended: true
    }
  ];

  testimonials: Testimonial[] = [
    {
      text: 'Panie prowadzące są niezwykle ciepłe, zaangażowane i bardzo pomysłowe. [...] Moje dziecko po prostu kocha tam chodzić.',
      author: 'Mama Oliwii',
      role: 'Rodzic'
    },
    {
      text: 'Bardzo podobały nam się treningi. [...] Są pierwsze bezpłatne zajęcia, na które można zapisać się przez stronę internetową.',
      author: 'Mama Ilii',
      role: 'Rodzic'
    },
  ];

  coachShortImages = [
    {
      src: 'assets/optimized/natalia-1-720.jpg',
      srcset: 'assets/optimized/natalia-1-480.jpg 480w, assets/optimized/natalia-1-720.jpg 720w, assets/optimized/natalia-1-960.jpg 960w',
      sizes: '(max-width: 640px) 72vw, (max-width: 1024px) 60vw, 360px',
      alt: 'Trenerka Natalia podczas treningu'
    },
    {
      src: 'assets/optimized/natalia-2-720.jpg',
      srcset: 'assets/optimized/natalia-2-480.jpg 480w, assets/optimized/natalia-2-720.jpg 720w, assets/optimized/natalia-2-960.jpg 960w',
      sizes: '(max-width: 640px) 72vw, (max-width: 1024px) 60vw, 360px',
      alt: 'Trenerka Natalia z grupą dzieci'
    },
    {
      src: 'assets/natalia-3.jpeg',
      sizes: '(max-width: 640px) 72vw, (max-width: 1024px) 60vw, 360px',
      alt: 'Trenerka Natalia na stadionie'
    },
    {
      src: 'assets/optimized/natalia-4-720.jpg',
      srcset: 'assets/optimized/natalia-4-480.jpg 480w, assets/optimized/natalia-4-720.jpg 720w, assets/optimized/natalia-4-960.jpg 960w',
      sizes: '(max-width: 640px) 72vw, (max-width: 1024px) 60vw, 360px',
      alt: 'Trenerka Natalia w trakcie zajęć'
    }
  ];

  constructor(
    private metaService: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.titleService.setTitle('Lekkoatletyka dla dzieci | Akademia Lekkiej Atletyki Wrocław');
    this.metaService.updateTag({
      name: 'description',
      content: 'Lekkoatletyka dla dzieci we Wrocławiu. Pierwszy trening bez opłat. Umów się na zajęcia próbne.'
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.classList.add(this.bodyClass);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.classList.remove(this.bodyClass);
    }

    this.stopCoachShortAutoScroll();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.startCoachShortAutoScroll();
  }

  toggleReportModal(): void {
    this.isReportModalOpen = !this.isReportModalOpen;
  }

  scrollToSection(id: string): void {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openCookiePreferences(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const tryOpenPreferences = (): boolean => {
      const cookieIcon = this.document.getElementById('silktide-cookie-icon') as HTMLButtonElement | null;

      if (!cookieIcon) {
        return false;
      }

      cookieIcon.click();
      return true;
    };

    if (tryOpenPreferences()) {
      return;
    }

    const manager = (window as Window & {
      silktideCookieBannerManager?: { initCookieBanner?: () => void };
    }).silktideCookieBannerManager;

    if (manager?.initCookieBanner) {
      manager.initCookieBanner();
      setTimeout(() => {
        tryOpenPreferences();
      }, 0);
    }
  }

  private startCoachShortAutoScroll(): void {
    if (this.coachShortTimer) {
      return;
    }

    this.coachShortTimer = setInterval(() => {
      const carousel = this.coachShortCarousel?.nativeElement;
      if (!carousel) {
        return;
      }

      const atEnd = Math.ceil(carousel.scrollLeft + carousel.clientWidth) >= carousel.scrollWidth - 1;
      if (atEnd) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }

      carousel.scrollBy({ left: carousel.clientWidth * 0.9, behavior: 'smooth' });
    }, 4500);
  }

  private stopCoachShortAutoScroll(): void {
    if (this.coachShortTimer) {
      clearInterval(this.coachShortTimer);
      this.coachShortTimer = null;
    }
  }
}
