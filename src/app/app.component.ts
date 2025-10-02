import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnalyticsService } from './services/analytics.service';
import { PerformanceService } from './services/performance.service';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CookieConsentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'africaMedicalRegistry';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private analyticsService: AnalyticsService,
    private performanceService: PerformanceService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeApp();
    }
  }

  private initializeApp(): void {
    // Set default SEO
    this.seoService.updateSEO({
      title: 'African Medical Registry - One Africa. One Health Identity.',
      description: 'Africa\'s trusted healthcare verification platform. Verify doctors, nurses, pharmacists, and health professionals across 54 African countries with blockchain security.',
      keywords: 'African Medical Registry, healthcare verification, medical license verification, Africa healthcare, blockchain verification, AMR',
      url: 'https://africanmedicalregistry.com',
      image: '/assets/images/amr-og-image.jpg'
    });

    // Initialize performance monitoring
    this.performanceService.lazyLoadImages();
    
    // Preload critical resources
    this.performanceService.preloadResource('/assets/images/amr-hero.jpg', 'image');
    this.performanceService.preloadResource('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap', 'style');
  }
}
