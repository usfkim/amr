import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface InsurerFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
  capabilities: string[];
  integration: string;
}

@Component({
  selector: 'app-insurers',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './insurers.component.html',
  styleUrl: './insurers.component.css'
})
export class InsurersComponent implements OnInit {
  
  insurerFeatures: InsurerFeature[] = [
    {
      id: 1,
      title: 'Verify-Before-Pay',
      description: 'Real-time practitioner verification before claim processing',
      icon: 'ri-shield-check-line',
      integration: 'API Integration',
      capabilities: [
        'Real-time verification API',
        'Automated claim validation',
        'Fraud prevention alerts',
        'Risk assessment scoring',
        'Compliance documentation'
      ]
    },
    {
      id: 2,
      title: 'Claims API',
      description: 'Seamless integration with existing claims processing systems',
      icon: 'ri-code-line',
      integration: 'REST API',
      capabilities: [
        'RESTful API endpoints',
        'Real-time data synchronization',
        'Webhook notifications',
        'Bulk verification processing',
        'Custom integration support'
      ]
    },
    {
      id: 3,
      title: 'Fraud Alerts',
      description: 'AI-powered fraud detection with instant notifications',
      icon: 'ri-alert-line',
      integration: 'Alert System',
      capabilities: [
        'Real-time fraud detection',
        'Suspicious pattern analysis',
        'Automated alert notifications',
        'Investigation case management',
        'Regulatory reporting'
      ]
    }
  ];

  integrationBenefits = [
    {
      title: 'Fraud Reduction',
      description: 'Eliminate fraudulent claims with verified practitioners',
      icon: 'ri-shield-star-line',
      metric: '95%',
      metricLabel: 'Fraud Reduction'
    },
    {
      title: 'Processing Speed',
      description: 'Faster claim processing with automated verification',
      icon: 'ri-speed-line',
      metric: '80%',
      metricLabel: 'Faster Processing'
    },
    {
      title: 'Cost Savings',
      description: 'Reduce investigation costs and claim disputes',
      icon: 'ri-money-dollar-circle-line',
      metric: '$2.1M',
      metricLabel: 'Annual Savings'
    },
    {
      title: 'Compliance',
      description: 'Automated regulatory compliance and reporting',
      icon: 'ri-file-shield-line',
      metric: '100%',
      metricLabel: 'Compliance Rate'
    }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}