import { Directive, ElementRef, HostListener } from '@angular/core';
import { MetaPixelService } from '../services/meta-pixel.service';

@Directive({
  selector: 'a[appTrackPhone]'
})
export class TrackPhoneClickDirective {
  constructor(
    private elementRef: ElementRef<HTMLAnchorElement>,
    private metaPixelService: MetaPixelService
  ) {}

  @HostListener('click')
  onClick(): void {
    const href = this.elementRef.nativeElement.getAttribute('href') ?? '';
    if (!href.toLowerCase().startsWith('tel:')) {
      return;
    }

    this.metaPixelService.track('Lead', {
      method: 'phone'
    });
  }
}
