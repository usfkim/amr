import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-900 dark:to-blue-900">
      <app-header />
      <main class="pt-16 flex items-center justify-center min-h-screen">
        <div class="container mx-auto px-6">
          <div class="max-w-2xl mx-auto text-center">
            <!-- 404 Animation -->
            <div class="mb-8">
              <div class="relative">
                <div class="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 animate-pulse">
                  404
                </div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-32 h-32 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <i class="ri-search-line text-white text-4xl"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Page Not Found
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
              The page you're looking for doesn't exist in the African Medical Registry.
            </p>

            <!-- Suggestions -->
            <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-slate-700/50 mb-8">
              <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">What you can do:</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a routerLink="/verify-practitioner" 
                   class="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors group">
                  <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <i class="ri-qr-scan-line text-white"></i>
                  </div>
                  <div class="text-left">
                    <div class="font-semibold text-blue-900 dark:text-blue-100">Verify Practitioner</div>
                    <div class="text-blue-700 dark:text-blue-300 text-sm">Search our registry</div>
                  </div>
                </a>
                
                <a routerLink="/countries" 
                   class="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors group">
                  <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <i class="ri-global-line text-white"></i>
                  </div>
                  <div class="text-left">
                    <div class="font-semibold text-green-900 dark:text-green-100">Browse Countries</div>
                    <div class="text-green-700 dark:text-green-300 text-sm">Explore platforms</div>
                  </div>
                </a>
                
                <a routerLink="/register" 
                   class="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors group">
                  <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <i class="ri-user-add-line text-white"></i>
                  </div>
                  <div class="text-left">
                    <div class="font-semibold text-purple-900 dark:text-purple-100">Register</div>
                    <div class="text-purple-700 dark:text-purple-300 text-sm">Join AMR network</div>
                  </div>
                </a>
                
                <a routerLink="/contact" 
                   class="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/30 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors group">
                  <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <i class="ri-customer-service-line text-white"></i>
                  </div>
                  <div class="text-left">
                    <div class="font-semibold text-orange-900 dark:text-orange-100">Get Help</div>
                    <div class="text-orange-700 dark:text-orange-300 text-sm">Contact support</div>
                  </div>
                </a>
              </div>
            </div>

            <!-- Back to Home -->
            <div class="flex justify-center gap-4">
              <button (click)="goBack()" 
                      class="px-6 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                <i class="ri-arrow-left-line mr-2"></i>
                Go Back
              </button>
              <a routerLink="/" 
                 class="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-xl hover:from-blue-700 hover:to-green-600 transition-colors font-medium shadow-lg">
                <i class="ri-home-line mr-2"></i>
                Return Home
              </a>
            </div>
          </div>
        </div>
      </main>
      <app-footer />
    </div>
  `,
  styles: [`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
  `]
})
export class NotFoundComponent implements OnInit {
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

  goBack(): void {
    window.history.back();
  }

  private checkCookieConsent(): void {
    const consent = localStorage.getItem('amr_cookie_consent');
    if (!consent) {
      setTimeout(() => {
        this.showBanner = true;
      }, 2000);
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
  }
}