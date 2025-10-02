import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface CountryData {
  code: string;
  name: string;
  flag: string;
  status: 'live' | 'pilot' | 'development' | 'planning';
  adoptionRate: number;
  totalPractitioners: number;
  verifiedPractitioners: number;
  facilitiesOnboard: number;
  apiUptime: number;
  lastSync: string;
  monthlyGrowth: number;
  fraudDetectionRate: number;
}

interface FraudAlert {
  id: string;
  timestamp: string;
  country: string;
  type: 'credential_fraud' | 'duplicate_license' | 'suspicious_activity';
  severity: 'high' | 'medium' | 'low';
  practitioner: string;
  confidence: number;
  status: 'investigating' | 'resolved' | 'false_positive';
}

interface RevenueStream {
  name: string;
  type: 'subscription' | 'transaction' | 'api' | 'certification';
  monthlyRevenue: number;
  annualProjection: number;
  growth: number;
  countries: string[];
}

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  country: string;
  ipAddress: string;
  result: 'success' | 'failure' | 'warning';
}

interface NetworkNode {
  id: string;
  name: string;
  type: 'primary' | 'secondary' | 'backup';
  region: string;
  status: 'online' | 'offline' | 'maintenance';
  uptime: number;
  lastPing: string;
  connections: number;
  throughput: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  activeTab = 'overview';
  currentUser = 'Dr. Williams Anarfi';
  userRole = 'Global Administrator';
  
  private updateInterval?: number;

  // Overview Statistics
  totalPractitioners = 247892;
  activePractitioners = 245156;
  expiredLicenses = 2736;
  last24hVerifications = 15847;
  fraudAlertsToday = 12;
  systemUptime = 99.97;

  // Mock Country Data
  countryData: CountryData[] = [
    {
      code: 'gh',
      name: 'Ghana',
      flag: '🇬🇭',
      status: 'development',
      adoptionRate: 98.5,
      totalPractitioners: 8500,
      verifiedPractitioners: 8373,
      facilitiesOnboard: 245,
      apiUptime: 99.9,
      lastSync: '2025-01-15T14:30:00Z',
      monthlyGrowth: 12.5,
      fraudDetectionRate: 0.8
    },
    {
      code: 'ng',
      name: 'Nigeria',
      flag: '🇳🇬',
      status: 'development',
      adoptionRate: 94.2,
      totalPractitioners: 125000,
      verifiedPractitioners: 117750,
      facilitiesOnboard: 1250,
      apiUptime: 99.7,
      lastSync: '2025-01-15T14:28:00Z',
      monthlyGrowth: 18.3,
      fraudDetectionRate: 1.2
    },
    {
      code: 'eg',
      name: 'Egypt',
      flag: '🇪🇬',
      status: 'development',
      adoptionRate: 89.7,
      totalPractitioners: 45000,
      verifiedPractitioners: 40365,
      facilitiesOnboard: 680,
      apiUptime: 99.8,
      lastSync: '2025-01-15T14:25:00Z',
      monthlyGrowth: 8.9,
      fraudDetectionRate: 0.6
    },
    {
      code: 'za',
      name: 'South Africa',
      flag: '🇿🇦',
      status: 'development',
      adoptionRate: 45.8,
      totalPractitioners: 28000,
      verifiedPractitioners: 12824,
      facilitiesOnboard: 156,
      apiUptime: 98.5,
      lastSync: '2025-01-15T14:20:00Z',
      monthlyGrowth: 25.7,
      fraudDetectionRate: 0.4
    },
    {
      code: 'ke',
      name: 'Kenya',
      flag: '🇰🇪',
      status: 'development',
      adoptionRate: 38.2,
      totalPractitioners: 18500,
      verifiedPractitioners: 7067,
      facilitiesOnboard: 89,
      apiUptime: 97.8,
      lastSync: '2025-01-15T14:15:00Z',
      monthlyGrowth: 31.4,
      fraudDetectionRate: 0.3
    },
    {
      code: 'ug',
      name: 'Uganda',
      flag: '🇺🇬',
      status: 'development',
      adoptionRate: 15.6,
      totalPractitioners: 12000,
      verifiedPractitioners: 1872,
      facilitiesOnboard: 23,
      apiUptime: 95.2,
      lastSync: '2025-01-15T13:45:00Z',
      monthlyGrowth: 45.8,
      fraudDetectionRate: 0.2
    },
    {
      code: 'ma',
      name: 'Morocco',
      flag: '🇲🇦',
      status: 'development',
      adoptionRate: 8.9,
      totalPractitioners: 22000,
      verifiedPractitioners: 1958,
      facilitiesOnboard: 12,
      apiUptime: 92.1,
      lastSync: '2025-01-15T12:30:00Z',
      monthlyGrowth: 52.3,
      fraudDetectionRate: 0.1
    }
  ];

  // Mock Fraud Alerts
  fraudAlerts: FraudAlert[] = [
    {
      id: '1',
      timestamp: '2025-01-15T14:30:22Z',
      country: 'Nigeria',
      type: 'credential_fraud',
      severity: 'high',
      practitioner: 'Dr. Fake Name',
      confidence: 98.5,
      status: 'investigating'
    },
    {
      id: '2',
      timestamp: '2025-01-15T14:25:18Z',
      country: 'Ghana',
      type: 'duplicate_license',
      severity: 'medium',
      practitioner: 'Dr. John Smith',
      confidence: 87.2,
      status: 'resolved'
    },
    {
      id: '3',
      timestamp: '2025-01-15T14:20:45Z',
      country: 'Egypt',
      type: 'suspicious_activity',
      severity: 'low',
      practitioner: 'Dr. Sarah Ahmed',
      confidence: 72.8,
      status: 'false_positive'
    }
  ];

  // Mock Revenue Streams
  revenueStreams: RevenueStream[] = [
    {
      name: 'Country Licensing',
      type: 'subscription',
      monthlyRevenue: 125000,
      annualProjection: 1500000,
      growth: 15.8,
      countries: ['Ghana', 'Nigeria', 'Egypt']
    },
    {
      name: 'API Access',
      type: 'api',
      monthlyRevenue: 89000,
      annualProjection: 1068000,
      growth: 28.4,
      countries: ['Ghana', 'Nigeria', 'South Africa', 'Kenya']
    },
    {
      name: 'QR Verification',
      type: 'transaction',
      monthlyRevenue: 45000,
      annualProjection: 540000,
      growth: 42.1,
      countries: ['Ghana', 'Nigeria', 'Egypt', 'Uganda']
    },
    {
      name: 'Digital Certificates',
      type: 'certification',
      monthlyRevenue: 32000,
      annualProjection: 384000,
      growth: 35.7,
      countries: ['Ghana', 'Nigeria']
    }
  ];

  // Mock Audit Logs
  auditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: '2025-01-15T14:30:22Z',
      user: 'admin@amr.com',
      action: 'Practitioner Verified',
      resource: 'Dr. Sarah Mensah',
      country: 'Ghana',
      ipAddress: '192.168.1.100',
      result: 'success'
    },
    {
      id: '2',
      timestamp: '2025-01-15T14:28:15Z',
      user: 'ghana.admin@amr.com',
      action: 'License Renewed',
      resource: 'Dr. Kwame Asante',
      country: 'Ghana',
      ipAddress: '10.0.0.50',
      result: 'success'
    },
    {
      id: '3',
      timestamp: '2025-01-15T14:25:33Z',
      user: 'nigeria.admin@amr.com',
      action: 'Fraud Alert Triggered',
      resource: 'Dr. Fake Name',
      country: 'Nigeria',
      ipAddress: '172.16.0.25',
      result: 'warning'
    }
  ];

  // Helper to avoid arrow function in template
  getFlagByCountryName(name: string): string | undefined {
    return this.countryData.find(c => c.name === name)?.flag;
  }

  // Helpers to avoid inline string operations in templates
  getAlertStatusLabel(status: FraudAlert['status']): string {
    return status.replace('_', ' ');
  }

  getAlertTypeLabel(type: FraudAlert['type']): string {
    return type.replace('_', ' ');
  }

  // Mock Network Nodes
  networkNodes: NetworkNode[] = [
    {
      id: '1',
      name: 'Ghana Primary Node',
      type: 'primary',
      region: 'West Africa',
      status: 'online',
      uptime: 99.9,
      lastPing: '2025-01-15T14:30:00Z',
      connections: 1247,
      throughput: '2.4 GB/s'
    },
    {
      id: '2',
      name: 'Nigeria Primary Node',
      type: 'primary',
      region: 'West Africa',
      status: 'online',
      uptime: 99.7,
      lastPing: '2025-01-15T14:29:45Z',
      connections: 2156,
      throughput: '4.1 GB/s'
    },
    {
      id: '3',
      name: 'Egypt Primary Node',
      type: 'primary',
      region: 'North Africa',
      status: 'online',
      uptime: 99.8,
      lastPing: '2025-01-15T14:29:30Z',
      connections: 892,
      throughput: '1.8 GB/s'
    },
    {
      id: '4',
      name: 'South Africa Backup Node',
      type: 'backup',
      region: 'Southern Africa',
      status: 'maintenance',
      uptime: 95.2,
      lastPing: '2025-01-15T13:45:00Z',
      connections: 234,
      throughput: '0.8 GB/s'
    }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.startRealTimeUpdates();
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  startRealTimeUpdates(): void {
    this.updateInterval = window.setInterval(() => {
      // Simulate real-time updates
      this.last24hVerifications += Math.floor(Math.random() * 50) + 10;
      this.totalPractitioners += Math.floor(Math.random() * 10) + 1;
      this.activePractitioners += Math.floor(Math.random() * 8) + 1;
      
      // Update country data
      this.countryData.forEach(country => {
        if (country.status === 'live' && Math.random() > 0.7) {
          country.verifiedPractitioners += Math.floor(Math.random() * 5) + 1;
          country.totalPractitioners += Math.floor(Math.random() * 3) + 1;
        }
      });
    }, 5000);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'pilot':
        return 'bg-blue-100 text-blue-800';
      case 'development':
        return 'bg-yellow-100 text-yellow-800';
      case 'planning':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getSeverityClass(severity: string): string {
    switch (severity) {
      case 'high':
        return 'bg-red-500 text-white animate-pulse';
      case 'medium':
        return 'bg-orange-500 text-white';
      case 'low':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  }

  getAlertStatusClass(status: string): string {
    switch (status) {
      case 'investigating':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'false_positive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getNodeStatusClass(status: string): string {
    switch (status) {
      case 'online':
        return 'bg-green-500 animate-pulse';
      case 'offline':
        return 'bg-red-500';
      case 'maintenance':
        return 'bg-yellow-500 animate-bounce';
      default:
        return 'bg-gray-500';
    }
  }

  getResultClass(result: string): string {
    switch (result) {
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'failure':
        return 'bg-red-100 text-red-600';
      case 'warning':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  getTotalRevenue(): number {
    return this.revenueStreams.reduce((total, stream) => total + stream.monthlyRevenue, 0);
  }

  getAnnualProjection(): number {
    return this.revenueStreams.reduce((total, stream) => total + stream.annualProjection, 0);
  }

  getAverageGrowth(): number {
    const totalGrowth = this.revenueStreams.reduce((total, stream) => total + stream.growth, 0);
    return Math.round(totalGrowth / this.revenueStreams.length * 10) / 10;
  }

  formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleString();
  }

  exportData(type: string): void {
    console.log('Exporting data:', type);
    alert(`${type} data export will be implemented with backend integration`);
  }

  refreshData(): void {
    console.log('Refreshing dashboard data...');
    // Simulate data refresh
    this.last24hVerifications += Math.floor(Math.random() * 100) + 50;
    alert('Dashboard data refreshed successfully');
  }
}