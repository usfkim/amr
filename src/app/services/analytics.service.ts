import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer: any[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private isInitialized = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAnalytics();
    }
  }

  private initializeAnalytics(): void {
    // Google Analytics 4
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script1);

    // Google Tag Manager
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href
      });
    `;
    document.head.appendChild(script2);

    this.isInitialized = true;
  }

  trackEvent(action: string, category: string, label?: string, value?: number): void {
    if (isPlatformBrowser(this.platformId) && this.isInitialized && typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }

  trackPageView(url: string, title: string): void {
    if (isPlatformBrowser(this.platformId) && this.isInitialized && typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: title,
        page_location: url
      });
    }
  }

  trackUserAction(action: string, details?: any): void {
    this.trackEvent(action, 'User Interaction', JSON.stringify(details));
  }

  trackVerification(country: string, practitionerType: string): void {
    this.trackEvent('verification_performed', 'Verification', `${country}_${practitionerType}`);
  }

  trackRegistration(country: string, profession: string): void {
    this.trackEvent('practitioner_registration', 'Registration', `${country}_${profession}`);
  }

  trackPortalAccess(portalType: string): void {
    this.trackEvent('portal_access', 'Authentication', portalType);
  }
}