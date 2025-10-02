import { Routes } from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

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
        redirectTo: '/countries',
        pathMatch: 'full'
    },
    {
        path: 'countries',
        loadComponent: () => import('./countries/countries.component').then(c => c.CountriesComponent)
    },
    {
        path: 'practitioners',
        loadComponent: () => import('./solutions/practitioners/practitioners.component').then(c => c.PractitionersComponent)
    },
    {
        path: 'regulators',
        loadComponent: () => import('./solutions/regulators/regulators.component').then(c => c.RegulatorsComponent)
    },
    {
        path: 'hospitals',
        loadComponent: () => import('./solutions/hospitals/hospitals.component').then(c => c.HospitalsComponent)
    },
    {
        path: 'insurers',
        loadComponent: () => import('./solutions/insurers/insurers.component').then(c => c.InsurersComponent)
    },
    {
        path: 'universities',
        loadComponent: () => import('./solutions/universities/universities.component').then(c => c.UniversitiesComponent)
    },
    {
        path: 'embassies',
        loadComponent: () => import('./solutions/embassies/embassies.component').then(c => c.EmbassiesComponent)
    },
    {
        path: 'public',
        loadComponent: () => import('./solutions/public/public.component').then(c => c.PublicComponent)
    },
    {
        path: 'country-platforms',
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
        path: 'press',
        loadComponent: () => import('./press/press.component').then(c => c.PressComponent)
    },
    {
        path: 'case-studies',
        loadComponent: () => import('./case-studies/case-studies.component').then(c => c.CaseStudiesComponent)
    },
    {
        path: 'security-privacy',
        loadComponent: () => import('./security-privacy/security-privacy.component').then(c => c.SecurityPrivacyComponent)
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
    },
    {
        path: 'hospital-portal',
        loadComponent: () => import('./portals/hospital/hospital-portal.component').then(c => c.HospitalPortalComponent)
    },
    {
        path: 'insurer-portal',
        loadComponent: () => import('./portals/insurer/insurer-portal.component').then(c => c.InsurerPortalComponent)
    },
    {
        path: 'embassy-portal',
        loadComponent: () => import('./portals/embassy/embassy-portal.component').then(c => c.EmbassyPortalComponent)
    },
    {
        path: 'auth',
        children: [
            {
                path: 'sign-in',
                loadComponent: () => import('./authentication/pages/sign-in/sign-in.component').then(c => c.SignInComponent)
            },
            {
                path: 'account-type',
                loadComponent: () => import('./authentication/pages/account-type/account-type.component').then(c => c.AccountTypeComponent)
            },
            {
                path: 'practitioner-signup',
                loadComponent: () => import('./authentication/pages/practitioner-sign-up/practitioner-sign-up.component').then(c => c.PractitionerSignUpComponent)
            },
            {
                path: 'regulator-signup',
                loadComponent: () => import('./authentication/pages/regulator-sign-up/regulator-sign-up.component').then(c => c.RegulatorSignUpComponent)
            }
        ]
    },
    {
        path: 'technology',
        children: [
            {
                path: 'blockchain',
                loadComponent: () => import('./technology/blockchain/blockchain.component').then(c => c.BlockchainComponent)
            },
            {
                path: 'ai',
                loadComponent: () => import('./technology/ai/ai.component').then(c => c.AiComponent)
            },
            {
                path: 'qr-ussd',
                loadComponent: () => import('./technology/qr-ussd/qr-ussd.component').then(c => c.QrUssdComponent)
            },
            {
                path: 'api',
                loadComponent: () => import('./technology/api/api.component').then(c => c.ApiComponent)
            }
        ]
    },
    {
        path: 'admin',
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./admin/dashboard/dashboard.component').then(c => c.AdminDashboardComponent),
                canActivate: [() => inject(AuthService).isAuthenticated()],
                data: { roles: ['global_admin', 'observer'] }
            }
        ]
    },
    {
        path: 'practitioner',
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./practitioner/dashboard/dashboard.component').then(c => c.DashboardComponent)
            },
            {
                path: 'registration',
                loadComponent: () => import('./practitioner/registration/registration.component').then(c => c.RegistrationComponent)
            },
            {
                path: 'renewal',
                loadComponent: () => import('./practitioner/renewal/renewal.component').then(c => c.RenewalComponent)
            },
            {
                path: 'cpd',
                loadComponent: () => import('./practitioner/cpd/cpd.component').then(c => c.CpdComponent)
            },
            {
                path: 'id-management',
                loadComponent: () => import('./practitioner/id-management/id-management.component').then(c => c.IdManagementComponent)
            },
            {
                path: 'payments',
                loadComponent: () => import('./practitioner/payments/payments.component').then(c => c.PaymentsComponent)
            },
            {
                path: 'profile',
                loadComponent: () => import('./practitioner/profile/profile.component').then(c => c.ProfileComponent)
            }
        ]
    },
    {
        path: '404',
        loadComponent: () => import('./components/error-pages/not-found/not-found.component').then(c => c.NotFoundComponent)
    },
    {
        path: '500',
        loadComponent: () => import('./components/error-pages/server-error/server-error.component').then(c => c.ServerErrorComponent)
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];
