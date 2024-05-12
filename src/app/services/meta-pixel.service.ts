import { Injectable } from '@angular/core';

declare var fbq: any;

@Injectable({
  providedIn: 'root'
})
export class MetaPixelService {
  

  constructor() { }

  track(eventName: string, params: any = {}) {
    if (fbq) {
      fbq('track', eventName, params);
    }
  }

  trackCustom(eventName:string, params: any = {}) {
    if (fbq) {
      fbq('trackCustom', eventName, params);
    }
  }
}
