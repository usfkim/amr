import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component'; // If not already imported
import { FooterComponent } from '../shared/footer/footer.component'; // If not already imported
import { EcosystemWidgetComponent } from '../shared/components/ecosystem-widget/ecosystem-widget.component';
import { TrustBadgeComponent } from '../shared/components/trust-badge/trust-badge.component';
import { QrVerificationDemoComponent } from '../shared/components/qr-verification-demo/qr-verification-demo.component';
import { IntegrationShowcaseComponent } from '../shared/components/integration-showcase/integration-showcase.component';
import { OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    EcosystemWidgetComponent,
    TrustBadgeComponent,
    QrVerificationDemoComponent,
    IntegrationShowcaseComponent
    // Add other components as needed
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
      this.setupSmoothScrolling();
    }
  }

  ngOnDestroy() {
    // Cleanup if needed
  }
  
  // Method for QR verification functionality
  handleQrVerification(): void {
    // TODO: Implement QR code scanning logic
    console.log('QR verification clicked');
    // You can add navigation to QR scanner page or open modal
    // Example: this.router.navigate(['/qr-scanner']);
  }

  // Method for search by name functionality
  handleSearchByName(): void {
    // TODO: Implement search by name logic
    console.log('Search by name clicked');
    // You can add navigation to search page or open search modal
    // Example: this.router.navigate(['/search']);
  }

  // Method for reading more about news articles
  readMore(event: Event, title: string): void {
    event.preventDefault(); // Prevent default anchor behavior
    // TODO: Implement read more functionality
    console.log('Read more clicked for:', title);
    // You can navigate to detailed article page or open modal
    // Example: this.router.navigate(['/news', this.slugify(title)]);
  }

  // Method for viewing all updates
  viewAllUpdates(): void {
    // TODO: Implement view all updates functionality
    console.log('View all updates clicked');
    // You can navigate to news/updates page
    // Example: this.router.navigate(['/news']);
  }

  // Helper method to create URL-friendly slugs (optional)
  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }

  private setupIntersectionObserver() {
    if (!isPlatformBrowser(this.platformId)) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all sections with fade-in-section class
    setTimeout(() => {
      const sections = document.querySelectorAll('.fade-in-section');
      sections.forEach(section => observer.observe(section));
    }, 100);
  }

  private setupSmoothScrolling() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (!href) { return; }
        const target = document.querySelector(href);
        if (target instanceof Element) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}
