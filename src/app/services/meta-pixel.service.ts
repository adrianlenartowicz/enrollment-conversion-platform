import { Injectable } from '@angular/core';

declare var fbq: any;

@Injectable({
  providedIn: 'root'
})
export class MetaPixelService {
  

  constructor() { }

  track(eventName: string, params: any = {}) {
    fbq('track', eventName, params);
  }
}
