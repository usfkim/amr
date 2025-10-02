import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

interface CountryAPI {
  code: string;
  name: string;
  baseUrl: string;
  status: 'live' | 'pilot' | 'development';
  apiVersion: string;
  endpoints: {
    practitioners: string;
    verification: string;
    registration: string;
    renewal: string;
  };
}

interface PractitionerData {
  id: string;
  name: string;
  licenseNumber: string;
  profession: string;
  status: string;
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryApiService {
  
  private countryAPIs: CountryAPI[] = [
    {
      code: 'gh',
      name: 'Ghana',
      baseUrl: 'https://ghanamedicalregistry.com/api',
      status: 'live',
      apiVersion: 'v2.1',
      endpoints: {
        practitioners: '/practitioners',
        verification: '/verify',
        registration: '/register',
        renewal: '/renew'
      }
    },
    {
      code: 'ng',
      name: 'Nigeria',
      baseUrl: 'https://nigeriamedicalregistry.com/api',
      status: 'live',
      apiVersion: 'v2.1',
      endpoints: {
        practitioners: '/practitioners',
        verification: '/verify',
        registration: '/register',
        renewal: '/renew'
      }
    },
    {
      code: 'ug',
      name: 'Uganda',
      baseUrl: 'https://ugandamedicalregistry.com/api',
      status: 'pilot',
      apiVersion: 'v2.0',
      endpoints: {
        practitioners: '/practitioners',
        verification: '/verify',
        registration: '/register',
        renewal: '/renew'
      }
    },
    {
      code: 'ke',
      name: 'Kenya',
      baseUrl: 'https://kenyamedicalregistry.com/api',
      status: 'development',
      apiVersion: 'v1.9',
      endpoints: {
        practitioners: '/practitioners',
        verification: '/verify',
        registration: '/register',
        renewal: '/renew'
      }
    }
  ];

  constructor() { }

  getCountryAPIs(): Observable<CountryAPI[]> {
    return of(this.countryAPIs).pipe(delay(500));
  }

  getCountryAPI(countryCode: string): Observable<CountryAPI | null> {
    const api = this.countryAPIs.find(api => api.code === countryCode);
    return of(api || null).pipe(delay(300));
  }

  verifyPractitioner(countryCode: string, licenseNumber: string): Observable<PractitionerData | null> {
    // Mock API response based on country
    const mockData: { [key: string]: PractitionerData } = {
      'gh': {
        id: '1',
        name: 'Dr. Kwame Asante',
        licenseNumber: 'MDC-GH-2024-1234',
        profession: 'Cardiologist',
        status: 'active',
        country: 'Ghana'
      },
      'ng': {
        id: '2',
        name: 'Dr. Chidi Okafor',
        licenseNumber: 'MDCN-NG-2024-5678',
        profession: 'Surgeon',
        status: 'active',
        country: 'Nigeria'
      },
      'ug': {
        id: '3',
        name: 'Dr. Sarah Nakato',
        licenseNumber: 'UMDPC-UG-2024-9012',
        profession: 'Pediatrician',
        status: 'active',
        country: 'Uganda'
      }
    };

    const practitioner = mockData[countryCode] || null;
    return of(practitioner).pipe(delay(1000));
  }

  searchPractitioners(countryCode: string, searchParams: any): Observable<PractitionerData[]> {
    // Mock search results
    const mockResults: PractitionerData[] = [
      {
        id: '1',
        name: 'Dr. Kwame Asante',
        licenseNumber: 'MDC-GH-2024-1234',
        profession: 'Cardiologist',
        status: 'active',
        country: countryCode
      },
      {
        id: '2',
        name: 'Nurse Jane Mensah',
        licenseNumber: 'NMC-GH-2024-5678',
        profession: 'Registered Nurse',
        status: 'active',
        country: countryCode
      }
    ];

    return of(mockResults).pipe(delay(800));
  }

  registerPractitioner(countryCode: string, practitionerData: any): Observable<{ success: boolean; message: string }> {
    // Mock registration response
    const response = {
      success: true,
      message: 'Registration submitted successfully. You will receive confirmation within 5-7 business days.'
    };
    
    return of(response).pipe(delay(2000));
  }

  renewLicense(countryCode: string, renewalData: any): Observable<{ success: boolean; message: string }> {
    // Mock renewal response
    const response = {
      success: true,
      message: 'License renewal processed successfully. New license will be issued within 3-5 business days.'
    };
    
    return of(response).pipe(delay(1500));
  }

  getAPIStatus(): Observable<{ [key: string]: 'online' | 'offline' | 'maintenance' }> {
    // Mock API status for all countries
    const status = {
      'gh': 'online',
      'ng': 'online',
      'ug': 'online',
      'ke': 'maintenance',
      'za': 'offline',
      'eg': 'online'
    };
    
    return of(status).pipe(delay(200));
  }
}