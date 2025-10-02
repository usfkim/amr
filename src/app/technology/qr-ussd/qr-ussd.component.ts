import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface VerificationMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  accessibility: string;
  speed: string;
  dataUsage: string;
  offlineCapable: boolean;
  steps: string[];
}

interface UsageStats {
  qrScans: number;
  ussdQueries: number;
  offlineVerifications: number;
  averageResponseTime: string;
  successRate: number;
  countriesSupported: number;
}

@Component({
  selector: 'app-qr-ussd',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './qr-ussd.component.html',
  styleUrl: './qr-ussd.component.css'
})
export class QrUssdComponent implements OnInit, OnDestroy {
  private animationInterval?: number;
  
  verificationMethods: VerificationMethod[] = [
    {
      id: 'qr',
      name: 'QR Code Scanning',
      description: 'Instant verification using smartphone cameras',
      icon: 'ri-qr-scan-line',
      accessibility: 'Smartphone Required',
      speed: '< 2 seconds',
      dataUsage: '< 50KB',
      offlineCapable: true,
      steps: [
        'Open camera or QR scanner app',
        'Point camera at practitioner QR code',
        'View instant verification results',
        'Confirm license status and details'
      ]
    },
    {
      id: 'ussd',
      name: 'USSD Verification',
      description: 'Feature phone access via USSD codes',
      icon: 'ri-phone-line',
      accessibility: 'Any Mobile Phone',
      speed: '< 10 seconds',
      dataUsage: '0 bytes',
      offlineCapable: false,
      steps: [
        'Dial *920*AMR# on any phone',
        'Follow menu prompts',
        'Enter practitioner license number',
        'Receive SMS verification result'
      ]
    },
    {
      id: 'sms',
      name: 'SMS Lookup',
      description: 'Text-based verification service',
      icon: 'ri-message-line',
      accessibility: 'Basic Mobile Phone',
      speed: '< 30 seconds',
      dataUsage: '0 bytes',
      offlineCapable: false,
      steps: [
        'Send SMS to AMR shortcode',
        'Include license number in message',
        'Receive automated verification reply',
        'View practitioner status and details'
      ]
    },
    {
      id: 'offline',
      name: 'Offline Verification',
      description: 'Cached verification for remote areas',
      icon: 'ri-wifi-off-line',
      accessibility: 'Smartphone + Cache',
      speed: '< 1 second',
      dataUsage: '0 bytes',
      offlineCapable: true,
      steps: [
        'Download verification cache',
        'Scan QR code offline',
        'View cached verification data',
        'Sync when connection available'
      ]
    }
  ];

  usageStats: UsageStats = {
    qrScans: 2847592,
    ussdQueries: 1293847,
    offlineVerifications: 456789,
    averageResponseTime: '1.8s',
    successRate: 99.7,
    countriesSupported: 54
  };

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.startUsageAnimation();
  }

  ngOnDestroy(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  startUsageAnimation(): void {
    this.animationInterval = window.setInterval(() => {
      // Simulate real-time usage updates
      this.usageStats.qrScans += Math.floor(Math.random() * 50) + 10;
      this.usageStats.ussdQueries += Math.floor(Math.random() * 20) + 5;
      this.usageStats.offlineVerifications += Math.floor(Math.random() * 10) + 2;
    }, 3000);
  }

  getAccessibilityClass(accessibility: string): string {
    if (accessibility.includes('Smartphone')) return 'bg-blue-100 text-blue-800';
    if (accessibility.includes('Any')) return 'bg-green-100 text-green-800';
    if (accessibility.includes('Basic')) return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  }
}