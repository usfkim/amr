import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface RegulatorFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
  capabilities: string[];
  status: 'live' | 'beta' | 'coming-soon';
}

@Component({
  selector: 'app-regulators',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './regulators.component.html',
  styleUrl: './regulators.component.css'
})
export class RegulatorsComponent implements OnInit {
  
  regulatorFeatures: RegulatorFeature[] = [
    {
      id: 1,
      title: 'Dashboards',
      description: 'Real-time oversight with comprehensive analytics and reporting',
      icon: 'ri-dashboard-line',
      status: 'live',
      capabilities: [
        'Real-time practitioner monitoring',
        'Compliance analytics dashboard',
        'Cross-border verification tracking',
        'Fraud detection alerts',
        'Performance metrics visualization'
      ]
    },
    {
      id: 2,
      title: 'Approvals',
      description: 'Streamlined approval workflows with digital processing',
      icon: 'ri-check-double-line',
      status: 'live',
      capabilities: [
        'Digital application processing',
        'Automated credential verification',
        'Multi-stage approval workflows',
        'Bulk approval capabilities',
        'Audit trail maintenance'
      ]
    },
    {
      id: 3,
      title: 'Sanctions',
      description: 'Disciplinary action management with blockchain records',
      icon: 'ri-gavel-line',
      status: 'beta',
      capabilities: [
        'Disciplinary case management',
        'Sanction tracking system',
        'Cross-border notification',
        'Appeal process management',
        'Rehabilitation monitoring'
      ]
    },
    {
      id: 4,
      title: 'Audits',
      description: 'Comprehensive audit trails with immutable records',
      icon: 'ri-file-search-line',
      status: 'beta',
      capabilities: [
        'Complete audit trail logging',
        'Compliance report generation',
        'Risk assessment tools',
        'Performance benchmarking',
        'Regulatory compliance tracking'
      ]
    },
    {
      id: 5,
      title: 'Data Sovereignty',
      description: 'Complete control over national healthcare data',
      icon: 'ri-shield-keyhole-line',
      status: 'live',
      capabilities: [
        'National data control',
        'Sovereign cloud deployment',
        'Local data residency',
        'Government access controls',
        'Privacy compliance assurance'
      ]
    }
  ];

  integrationBenefits = [
    {
      title: 'Regulatory Efficiency',
      description: 'Reduce processing time from weeks to minutes',
      icon: 'ri-time-line',
      metric: '95%',
      metricLabel: 'Time Reduction'
    },
    {
      title: 'Fraud Prevention',
      description: 'AI-powered detection with real-time alerts',
      icon: 'ri-shield-star-line',
      metric: '99.8%',
      metricLabel: 'Accuracy Rate'
    },
    {
      title: 'Cross-Border Trust',
      description: 'Seamless verification across African nations',
      icon: 'ri-global-line',
      metric: '54',
      metricLabel: 'Countries Connected'
    },
    {
      title: 'Data Security',
      description: 'Bank-level encryption with blockchain integrity',
      icon: 'ri-lock-line',
      metric: '256-bit',
      metricLabel: 'Encryption Standard'
    }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'beta':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'coming-soon':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'live':
        return 'ri-check-circle-line text-green-600';
      case 'beta':
        return 'ri-flask-line text-blue-600';
      case 'coming-soon':
        return 'ri-time-line text-gray-400';
      default:
        return 'ri-circle-line text-gray-400';
    }
  }
}