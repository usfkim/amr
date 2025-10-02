import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface PublicFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
  capabilities: string[];
  accessMethod: string;
}

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './public.component.html',
  styleUrl: './public.component.css'
})
export class PublicComponent implements OnInit {
  
  publicFeatures: PublicFeature[] = [
    {
      id: 1,
      title: 'Scan & Verify',
      description: 'Instant practitioner verification using QR codes or search',
      icon: 'ri-qr-scan-line',
      accessMethod: 'Free access',
      capabilities: [
        'QR code scanning',
        'Name-based search',
        'License number lookup',
        'Institution verification',
        'Real-time status check'
      ]
    },
    {
      id: 2,
      title: 'Report Misconduct',
      description: 'Report suspected fake practitioners or misconduct',
      icon: 'ri-alert-line',
      accessMethod: 'Anonymous reporting',
      capabilities: [
        'Anonymous submission',
        'Evidence upload',
        'Case tracking',
        'Regulatory notification',
        'Follow-up updates'
      ]
    }
  ];

  verificationMethods = [
    {
      title: 'QR Code Scanning',
      description: 'Scan practitioner QR codes for instant verification',
      icon: 'ri-qr-scan-line',
      color: 'blue',
      steps: [
        'Open camera or QR scanner',
        'Point at practitioner QR code',
        'View instant verification results',
        'Check license status and details'
      ]
    },
    {
      title: 'Name Search',
      description: 'Search by practitioner name and location',
      icon: 'ri-search-line',
      color: 'green',
      steps: [
        'Enter practitioner full name',
        'Select country or region',
        'Choose practitioner type',
        'View verification results'
      ]
    },
    {
      title: 'License Lookup',
      description: 'Verify using license number',
      icon: 'ri-file-text-line',
      color: 'purple',
      steps: [
        'Enter license number',
        'Select issuing authority',
        'Confirm practitioner details',
        'View verification status'
      ]
    },
    {
      title: 'USSD Access',
      description: 'Verify using feature phones',
      icon: 'ri-phone-line',
      color: 'orange',
      steps: [
        'Dial USSD code',
        'Follow menu prompts',
        'Enter practitioner details',
        'Receive SMS confirmation'
      ]
    }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getColorClass(color: string): string {
    const colorClasses = {
      'blue': 'from-blue-500 to-blue-600',
      'green': 'from-green-500 to-green-600',
      'purple': 'from-purple-500 to-purple-600',
      'orange': 'from-orange-500 to-orange-600'
    };
    return colorClasses[color as keyof typeof colorClasses] || 'from-gray-500 to-gray-600';
  }
}