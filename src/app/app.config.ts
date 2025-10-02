import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import localeAr from '@angular/common/locales/ar';

import { routes } from './app.routes';
import { securityInterceptor } from './interceptors/security.interceptor';
import { analyticsInterceptor } from './interceptors/analytics.interceptor';

// Register locales
registerLocaleData(localeEn);
registerLocaleData(localeFr);
registerLocaleData(localeAr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([securityInterceptor, analyticsInterceptor])),
    provideClientHydration(),
    { provide: LOCALE_ID, useValue: 'en-US' }
  ]
};
