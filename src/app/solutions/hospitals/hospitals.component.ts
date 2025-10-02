import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface HospitalFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
  capabilities: string[];
  pricing: string;
}

@Component({
  selector: 'app-hospitals',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './hospitals.component.html',
  styleUrl: './hospitals.component.css'
})
export class HospitalsComponent implements OnInit {
  
  hospitalFeatures: HospitalFeature[] = [
    {
      id: 1,
      title: 'Staff Onboarding',
      description: 'Streamlined verification process for new healthcare staff',
      icon: 'ri-user-add-line',
      pricing: 'Per verification',
      capabilities: [
        'Instant credential verification',
        'Background check integration',
        'Compliance documentation',
        'Digital onboarding workflows',
        'Automated reference checks'
      ]
    },
    {
      id: 2,
      title: 'HR Verification',
      description: 'Real-time staff verification and compliance monitoring',
      icon: 'ri-team-line',
      pricing: 'Monthly subscription',
      capabilities: [
        'Continuous license monitoring',
        'Expiry date tracking',
        'Compliance alerts',
        'Staff directory management',
        'Performance analytics'
      ]
    },
    {
      id: 3,
      title: 'Facility Subscription',
      description: 'Enterprise-wide verification and management platform',
      icon: 'ri-building-line',
      pricing: 'Enterprise package',
      capabilities: [
        'Multi-location management',
        'Department-wise verification',
        'Custom reporting dashboards',
        'API integration support',
        'Dedicated account management'
      ]
    }
  ];

  integrationBenefits = [
    {
      title: 'Patient Safety',
      description: 'Ensure only verified professionals treat patients',
      icon: 'ri-heart-pulse-line',
      metric: '100%',
      metricLabel: 'Staff Verification'
    },
    {
      title: 'Compliance Assurance',
      description: 'Automated regulatory compliance monitoring',
      icon: 'ri-shield-check-line',
      metric: '24/7',
      metricLabel: 'Monitoring'
    },
    {
      title: 'Risk Reduction',
      description: 'Minimize liability with verified credentials',
      icon: 'ri-alert-line',
      metric: '95%',
      metricLabel: 'Risk Reduction'
    },
    {
      title: 'Operational Efficiency',
      description: 'Streamlined HR processes and workflows',
      icon: 'ri-speed-line',
      metric: '80%',
      metricLabel: 'Time Savings'
    }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}