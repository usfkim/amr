import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: 'completed' | 'current' | 'upcoming';
  features: string[];
}

@Component({
  selector: 'app-practitioners',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './practitioners.component.html',
  styleUrl: './practitioners.component.css'
})
export class PractitionersComponent implements OnInit {
  
  practitionerFlows: ProcessStep[] = [
    {
      id: 1,
      title: 'Register',
      description: 'Join the African Medical Registry with verified credentials',
      icon: 'ri-user-add-line',
      status: 'completed',
      features: [
        'Digital credential upload',
        'Regulatory body verification',
        'Blockchain identity creation',
        'QR code generation'
      ]
    },
    {
      id: 2,
      title: 'Renew',
      description: 'Automated license renewal with compliance tracking',
      icon: 'ri-refresh-line',
      status: 'current',
      features: [
        'Automated renewal reminders',
        'Digital payment processing',
        'Compliance status tracking',
        'Multi-year renewal options'
      ]
    },
    {
      id: 3,
      title: 'CPD Tracker',
      description: 'Continuing Professional Development credit management',
      icon: 'ri-graduation-cap-line',
      status: 'upcoming',
      features: [
        'Credit accumulation tracking',
        'Course recommendation engine',
        'Certification management',
        'Progress analytics'
      ]
    },
    {
      id: 4,
      title: 'Digital ID',
      description: 'Secure digital identity with QR verification',
      icon: 'ri-qr-code-line',
      status: 'upcoming',
      features: [
        'Dynamic QR code generation',
        'Digital wallet integration',
        'Offline verification capability',
        'Multi-platform compatibility'
      ]
    },
    {
      id: 5,
      title: 'Payments',
      description: 'Streamlined payment processing for all services',
      icon: 'ri-bank-card-line',
      status: 'upcoming',
      features: [
        'Multiple payment methods',
        'Automated billing cycles',
        'Payment history tracking',
        'Receipt management'
      ]
    }
  ];

  benefits = [
    {
      title: 'Global Recognition',
      description: 'Your credentials verified across all 54 African countries',
      icon: 'ri-global-line',
      color: 'blue'
    },
    {
      title: 'Instant Verification',
      description: 'QR code scanning for immediate credential confirmation',
      icon: 'ri-qr-scan-line',
      color: 'green'
    },
    {
      title: 'Fraud Protection',
      description: 'AI-powered security protecting your professional identity',
      icon: 'ri-shield-star-line',
      color: 'purple'
    },
    {
      title: 'Career Mobility',
      description: 'Seamless movement across borders and institutions',
      icon: 'ri-plane-line',
      color: 'orange'
    }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getStepClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'current':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  }

  getStepIcon(status: string): string {
    switch (status) {
      case 'completed':
        return 'ri-check-circle-line text-green-600';
      case 'current':
        return 'ri-play-circle-line text-blue-600';
      case 'upcoming':
        return 'ri-time-line text-gray-400';
      default:
        return 'ri-circle-line text-gray-400';
    }
  }

  getBenefitColorClass(color: string): string {
    const colorClasses = {
      'blue': 'from-blue-500 to-blue-600',
      'green': 'from-green-500 to-green-600',
      'purple': 'from-purple-500 to-purple-600',
      'orange': 'from-orange-500 to-orange-600'
    };
    return colorClasses[color as keyof typeof colorClasses] || 'from-gray-500 to-gray-600';
  }
}