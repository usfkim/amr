import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'about',
        loadComponent: () => import('./about/about.component').then(c => c.AboutComponent)
    },
    {
        path: 'verify',
        redirectTo: '/verify-practitioner',
        pathMatch: 'full'
    },
    {
        path: 'verify-practitioner',
        loadComponent: () => import('./verify-practitioner/verify-practitioner.component').then(c => c.VerifyPractitionerComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'country-platform',
        loadComponent: () => import('./country-platforms/country-platforms.component').then(c => c.CountryPlatformsComponent)
    },
    {
        path: 'regulatory-platform',
        loadComponent: () => import('./regulatory-platform/regulatory-platform.component').then(c => c.RegulatoryPlatformComponent)
    },
    {
        path: 'news',
        loadComponent: () => import('./news/news.component').then(c => c.NewsComponent)
    },
    {
        path: 'contact',
        loadComponent: () => import('./contact/contact.component').then(c => c.ContactComponent)
    },
    {
        path: 'partnership',
        loadComponent: () => import('./partnership/partnership.component').then(c => c.PartnershipComponent)
    },
    {
        path: 'legal',
        loadComponent: () => import('./legal/legal.component').then(c => c.LegalComponent)
    },
    {
        path: 'terms',
        loadComponent: () => import('./terms/terms.component').then(c => c.TermsComponent)
    }
];
