import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface FeatureFlag {
  key: string;
  enabled: boolean;
  description: string;
  countries?: string[];
  userRoles?: string[];
  startDate?: string;
  endDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {
  private flags = new BehaviorSubject<FeatureFlag[]>([]);

  // Default feature flags
  private defaultFlags: FeatureFlag[] = [
    {
      key: 'qr_scanner',
      enabled: false,
      description: 'QR Code Scanner functionality',
      countries: ['gh', 'ng'],
      startDate: '2025-04-01'
    },
    {
      key: 'amr_x_medication',
      enabled: false,
      description: 'AMR-X Medication Registry Phase 2',
      countries: ['gh', 'ng', 'za'],
      startDate: '2025-10-01'
    },
    {
      key: 'ussd_verification',
      enabled: true,
      description: 'USSD Verification for feature phones',
      countries: ['gh', 'ng', 'ug', 'ke']
    },
    {
      key: 'ai_fraud_detection',
      enabled: true,
      description: 'AI-powered fraud detection',
      userRoles: ['global_admin', 'country_admin']
    },
    {
      key: 'blockchain_audit',
      enabled: true,
      description: 'Blockchain audit trail access',
      userRoles: ['global_admin', 'country_admin', 'observer']
    },
    {
      key: 'multi_language',
      enabled: false,
      description: 'Multi-language support (French/Arabic)',
      countries: ['ma', 'tn', 'dz', 'eg', 'sn', 'ci', 'bf', 'ml']
    },
    {
      key: 'embassy_portal',
      enabled: true,
      description: 'Embassy verification portal',
      countries: ['gh', 'ng', 'za', 'ke']
    },
    {
      key: 'cpd_tracking',
      enabled: false,
      description: 'Continuing Professional Development tracking',
      startDate: '2025-03-01'
    },
    {
      key: 'payment_processing',
      enabled: false,
      description: 'Integrated payment processing',
      startDate: '2025-02-15'
    },
    {
      key: 'mobile_app',
      enabled: false,
      description: 'Mobile application access',
      startDate: '2025-06-01'
    }
  ];

  constructor() {
    this.loadFeatureFlags();
  }

  getFlags(): Observable<FeatureFlag[]> {
    return this.flags.asObservable();
  }

  isEnabled(flagKey: string, country?: string, userRole?: string): boolean {
    const flag = this.defaultFlags.find(f => f.key === flagKey);
    if (!flag) return false;

    // Check if flag is globally enabled
    if (!flag.enabled) return false;

    // Check country restriction
    if (flag.countries && country && !flag.countries.includes(country)) {
      return false;
    }

    // Check user role restriction
    if (flag.userRoles && userRole && !flag.userRoles.includes(userRole)) {
      return false;
    }

    // Check date restrictions
    const now = new Date();
    if (flag.startDate && new Date(flag.startDate) > now) {
      return false;
    }
    if (flag.endDate && new Date(flag.endDate) < now) {
      return false;
    }

    return true;
  }

  enableFlag(flagKey: string): void {
    const flag = this.defaultFlags.find(f => f.key === flagKey);
    if (flag) {
      flag.enabled = true;
      this.saveFeatureFlags();
    }
  }

  disableFlag(flagKey: string): void {
    const flag = this.defaultFlags.find(f => f.key === flagKey);
    if (flag) {
      flag.enabled = false;
      this.saveFeatureFlags();
    }
  }

  private loadFeatureFlags(): void {
    const saved = localStorage.getItem('amr_feature_flags');
    if (saved) {
      try {
        const savedFlags = JSON.parse(saved);
        // Merge with defaults
        savedFlags.forEach((savedFlag: FeatureFlag) => {
          const defaultFlag = this.defaultFlags.find(f => f.key === savedFlag.key);
          if (defaultFlag) {
            defaultFlag.enabled = savedFlag.enabled;
          }
        });
      } catch (error) {
        console.warn('Failed to load feature flags from localStorage');
      }
    }
    this.flags.next([...this.defaultFlags]);
  }

  private saveFeatureFlags(): void {
    localStorage.setItem('amr_feature_flags', JSON.stringify(this.defaultFlags));
    this.flags.next([...this.defaultFlags]);
  }
}