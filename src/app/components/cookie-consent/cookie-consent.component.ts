import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="showBanner" 
         class="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-slate-700 shadow-2xl transition-all duration-500"
         [class.translate-y-0]="showBanner"
         [class.translate-y-full]="!showBanner">
      <div class="container mx-auto px-6 py-6">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <i class="ri-shield-check-line text-white"></i>
              </div>
              <h3 class="font-bold text-gray-900 dark:text-white">Privacy & Cookies</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              We use cookies to enhance your experience, analyze site usage, and improve our healthcare verification services. 
              Your privacy is protected under African Union data protection standards.
            </p>
          </div>
          
          <div class="flex flex-col lg:flex-row gap-3">
            <button (click)="manageCookies()" 
                    class="px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              Manage Preferences
            </button>
            <button (click)="acceptAll()" 
                    class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Accept All Cookies
            </button>
            <button (click)="acceptEssential()" 
                    class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cookie Preferences Modal -->
    <div *ngIf="showPreferences" 
         class="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div class="p-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Cookie Preferences</h2>
            <button (click)="closePreferences()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <i class="ri-close-line text-xl"></i>
            </button>
          </div>
          
          <div class="space-y-6">
            <div class="border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-gray-900 dark:text-white">Essential Cookies</h3>
                <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
                  Always Active
                </span>
              </div>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                Required for basic site functionality, security, and user authentication.
              </p>
            </div>
            
            <div class="border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-gray-900 dark:text-white">Analytics Cookies</h3>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" [(ngModel)]="preferences.analytics" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                Help us understand how you use AMR to improve our services and user experience.
              </p>
            </div>
            
            <div class="border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-gray-900 dark:text-white">Marketing Cookies</h3>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" [(ngModel)]="preferences.marketing" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                Personalize content and show relevant healthcare verification information.
              </p>
            </div>
          </div>
          
          <div class="flex gap-3 mt-8">
            <button (click)="savePreferences()" 
                    class="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Save Preferences
            </button>
            <button (click)="closePreferences()" 
                    class="px-6 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cookie-banner {
      animation: slideUp 0.5s ease-out;
    }
    
    @keyframes slideUp {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
  `]
})
export class CookieConsentComponent implements OnInit {
  showBanner = false;
  showPreferences = false;
  
  preferences = {
    essential: true,
    analytics: false,
    marketing: false
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkCookieConsent();
    }
  }

  private checkCookieConsent(): void {
    const consent = localStorage.getItem('amr_cookie_consent');
    if (!consent) {
      setTimeout(() => {
        this.showBanner = true;
      }, 2000); // Show after 2 seconds
    } else {
      const savedPreferences = JSON.parse(consent);
      this.preferences = { ...this.preferences, ...savedPreferences };
      this.applyCookieSettings();
    }
  }

  acceptAll(): void {
    this.preferences = {
      essential: true,
      analytics: true,
      marketing: true
    };
    this.saveCookieConsent();
  }

  acceptEssential(): void {
    this.preferences = {
      essential: true,
      analytics: false,
      marketing: false
    };
    this.saveCookieConsent();
  }

  manageCookies(): void {
    this.showPreferences = true;
  }

  closePreferences(): void {
    this.showPreferences = false;
  }

  savePreferences(): void {
    this.saveCookieConsent();
    this.closePreferences();
  }

  private saveCookieConsent(): void {
    localStorage.setItem('amr_cookie_consent', JSON.stringify(this.preferences));
    this.showBanner = false;
    this.applyCookieSettings();
  }

  private applyCookieSettings(): void {
    // Apply analytics cookies
    if (this.preferences.analytics && typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }

    // Apply marketing cookies
    if (this.preferences.marketing && typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      });
    }
  }
}