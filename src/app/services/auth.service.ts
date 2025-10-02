import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'global_admin' | 'country_admin' | 'observer' | 'practitioner' | 'regulator' | 'hospital' | 'insurer' | 'embassy';
  country?: string;
  permissions: string[];
  lastLogin: string;
}

interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentUser: User | null = null;
  
  // Mock test accounts for demonstration
  private testAccounts: { [email: string]: { password: string; user: User } } = {
    'admin@amr.demo': {
      password: 'AMRDemo2025!',
      user: {
        id: '1',
        email: 'admin@amr.demo',
        name: 'Dr. Williams Anarfi',
        role: 'global_admin',
        permissions: ['all_countries', 'revenue_access', 'user_management', 'audit_logs', 'system_config'],
        lastLogin: '2025-01-15T14:30:00Z'
      }
    },
    'ghana.admin@amr.demo': {
      password: 'GhanaAMR2025!',
      user: {
        id: '2',
        email: 'ghana.admin@amr.demo',
        name: 'Dr. Vanessa Atikpui',
        role: 'country_admin',
        country: 'Ghana',
        permissions: ['ghana_access', 'practitioner_management', 'audit_access', 'facility_management'],
        lastLogin: '2025-01-15T14:25:00Z'
      }
    },
    'nigeria.admin@amr.demo': {
      password: 'NigeriaAMR2025!',
      user: {
        id: '3',
        email: 'nigeria.admin@amr.demo',
        name: 'Dr. Chidi Okafor',
        role: 'country_admin',
        country: 'Nigeria',
        permissions: ['nigeria_access', 'practitioner_management', 'audit_access', 'facility_management'],
        lastLogin: '2025-01-15T14:20:00Z'
      }
    },
    'who.observer@amr.demo': {
      password: 'WHODemo2025!',
      user: {
        id: '4',
        email: 'who.observer@amr.demo',
        name: 'Dr. Tedros Adhanom',
        role: 'observer',
        permissions: ['dashboard_view', 'analytics_access', 'export_reports'],
        lastLogin: '2025-01-15T14:15:00Z'
      }
    },
    'practitioner@amr.demo': {
      password: 'PractitionerDemo2025!',
      user: {
        id: '5',
        email: 'practitioner@amr.demo',
        name: 'Dr. Sarah Mensah',
        role: 'practitioner',
        country: 'Ghana',
        permissions: ['profile_management', 'renewal_access', 'cpd_tracking', 'payment_access'],
        lastLogin: '2025-01-15T14:10:00Z'
      }
    },
    'hospital@amr.demo': {
      password: 'HospitalDemo2025!',
      user: {
        id: '6',
        email: 'hospital@amr.demo',
        name: 'Dr. Michael Osei',
        role: 'hospital',
        country: 'Ghana',
        permissions: ['staff_verification', 'facility_management', 'compliance_tracking'],
        lastLogin: '2025-01-15T14:05:00Z'
      }
    },
    'insurer@amr.demo': {
      password: 'InsurerDemo2025!',
      user: {
        id: '7',
        email: 'insurer@amr.demo',
        name: 'Ms. Grace Adjei',
        role: 'insurer',
        country: 'Ghana',
        permissions: ['claims_verification', 'fraud_detection', 'analytics_access'],
        lastLogin: '2025-01-15T14:00:00Z'
      }
    },
    'embassy@amr.demo': {
      password: 'EmbassyDemo2025!',
      user: {
        id: '8',
        email: 'embassy@amr.demo',
        name: 'Amb. Kwame Asante',
        role: 'embassy',
        country: 'Ghana',
        permissions: ['visa_verification', 'credential_checks', 'diplomatic_access'],
        lastLogin: '2025-01-15T13:55:00Z'
      }
    }
  };

  constructor() { }

  signIn(email: string, password: string): Observable<AuthResponse> {
    const account = this.testAccounts[email];
    
    if (!account) {
      return throwError(() => ({ success: false, message: 'Account not found' })).pipe(delay(1000));
    }
    
    if (account.password !== password) {
      return throwError(() => ({ success: false, message: 'Invalid password' })).pipe(delay(1000));
    }
    
    // Update last login
    account.user.lastLogin = new Date().toISOString();
    this.currentUser = account.user;
    
    // Store in localStorage for persistence
    localStorage.setItem('amr_user', JSON.stringify(account.user));
    localStorage.setItem('amr_token', 'mock_jwt_token_' + account.user.id);
    
    return of({
      success: true,
      user: account.user,
      token: 'mock_jwt_token_' + account.user.id
    }).pipe(delay(1500));
  }

  signOut(): Observable<boolean> {
    this.currentUser = null;
    localStorage.removeItem('amr_user');
    localStorage.removeItem('amr_token');
    return of(true).pipe(delay(500));
  }

  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }
    
    // Try to restore from localStorage
    const storedUser = localStorage.getItem('amr_user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      return this.currentUser;
    }
    
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser() && !!localStorage.getItem('amr_token');
  }

  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    return user?.permissions.includes(permission) || user?.role === 'global_admin' || false;
  }

  getTestAccounts(): { email: string; password: string; role: string; name: string }[] {
    return Object.entries(this.testAccounts).map(([email, account]) => ({
      email,
      password: account.password,
      role: account.user.role,
      name: account.user.name
    }));
  }
}