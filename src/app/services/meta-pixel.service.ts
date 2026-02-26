import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetaPixelService {
  constructor() { }

  track(eventName: string, params: any = {}) {
    if (typeof window === 'undefined') {
      return;
    }
    const fbq = (window as any).fbq as ((...args: any[]) => void) | undefined;
    if (typeof fbq === 'function') {
      fbq('track', eventName, params);
    }
  }

  trackCustom(eventName:string, params: any = {}) {
    if (typeof window === 'undefined') {
      return;
    }
    const fbq = (window as any).fbq as ((...args: any[]) => void) | undefined;
    if (typeof fbq === 'function') {
      fbq('trackCustom', eventName, params);
    }
  }
}
