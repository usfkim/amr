import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-900 dark:to-red-900">
      <app-header />
      <main class="pt-16 flex items-center justify-center min-h-screen">
        <div class="container mx-auto px-6">
          <div class="max-w-2xl mx-auto text-center">
            <!-- 500 Animation -->
            <div class="mb-8">
              <div class="relative">
                <div class="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 animate-pulse">
                  500
                </div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-32 h-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                    <i class="ri-tools-line text-white text-4xl"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Server Error
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
              We're experiencing technical difficulties. Our team has been notified and is working to resolve this.
            </p>

            <!-- Status Information -->
            <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-slate-700/50 mb-8">
              <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">System Status</h2>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-300">AMR Core System:</span>
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span class="text-yellow-600 dark:text-yellow-400 font-medium">Investigating</span>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-300">Country APIs:</span>
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span class="text-green-600 dark:text-green-400 font-medium">Operational</span>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-300">Verification Services:</span>
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span class="text-green-600 dark:text-green-400 font-medium">Operational</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-center gap-4">
              <button (click)="refreshPage()" 
                      class="px-6 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                <i class="ri-refresh-line mr-2"></i>
                Try Again
              </button>
              <a routerLink="/" 
                 class="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl hover:from-red-700 hover:to-orange-600 transition-colors font-medium shadow-lg">
                <i class="ri-home-line mr-2"></i>
                Return Home
              </a>
            </div>

            <!-- Contact Support -->
            <div class="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
              <h3 class="font-bold text-gray-900 dark:text-white mb-2">Need Immediate Assistance?</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Contact our technical support team for urgent verification needs
              </p>
              <div class="flex flex-col lg:flex-row items-center justify-center gap-4">
                <a href="mailto:support@africanmedicalregistry.com" 
                   class="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                  <i class="ri-mail-line"></i>
                  support&#64;africanmedicalregistry.com
                </a>
                <a href="tel:+233302123456" 
                   class="flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium">
                  <i class="ri-phone-line"></i>
                  +233 302 123 456
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <app-footer />
    </div>
  `
})
export class ServerErrorComponent {
  refreshPage(): void {
    window.location.reload();
  }
}