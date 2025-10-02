import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FooterComponent } from "../shared/footer/footer.component";
import { HeaderComponent } from "../shared/header/header.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('impactSection', { static: false }) impactSection!: ElementRef;
  
  private observer!: IntersectionObserver;
  private animationTriggered = false;

  // Counter values for display
  countriesCount = 0;
  practitionersCount = 0;
  verificationsCount = 0;

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.5,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animationTriggered) {
          this.startCounterAnimations();
          this.animationTriggered = true;
          this.observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (this.impactSection) {
      this.observer.observe(this.impactSection.nativeElement);
    }

    // Fallback: Start animation after 2 seconds if intersection observer doesn't trigger
    setTimeout(() => {
      if (!this.animationTriggered) {
        this.startCounterAnimations();
      }
    }, 2000);
  }

  private startCounterAnimations(): void {
    // Start animations with staggered timing
    setTimeout(() => this.animateCounter('countries', 12, 1500), 200);
    setTimeout(() => this.animateCounter('practitioners', 250, 2000), 400);
    setTimeout(() => this.animateCounter('verifications', 5, 2500), 600);
  }

  private animateCounter(type: 'countries' | 'practitioners' | 'verifications', targetValue: number, duration: number = 2000): void {
    const startValue = 0;
    const increment = targetValue / (duration / 16); // 60fps
    let currentValue = startValue;

    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(timer);
      }

      // Update the appropriate property
      const displayValue = Math.floor(currentValue);
      switch (type) {
        case 'countries':
          this.countriesCount = displayValue;
          break;
        case 'practitioners':
          this.practitionersCount = displayValue;
          break;
        case 'verifications':
          this.verificationsCount = displayValue;
          break;
      }
    }, 16);
  }
}