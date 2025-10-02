import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

interface CaseStudy {
  id: string;
  title: string;
  country: string;
  flag: string;
  challenge: string;
  solution: string;
  impact: {
    metric: string;
    value: string;
    description: string;
  }[];
  timeline: string;
  status: 'completed' | 'ongoing' | 'planned';
  image: string;
  stakeholders: string[];
}

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './case-studies.component.html',
  styleUrl: './case-studies.component.css'
})
export class CaseStudiesComponent implements OnInit {
  
  caseStudies: CaseStudy[] = [
    {
      id: 'ghana-fraud-elimination',
      title: 'Ghana: Eliminating Medical Fraud Through Digital Verification',
      country: 'Ghana',
      flag: '🇬🇭',
      challenge: 'Ghana faced a crisis of unlicensed practitioners operating in rural areas, with an estimated 15% of healthcare providers lacking proper credentials.',
      solution: 'AMR deployed a comprehensive verification system integrated with the Ghana Medical & Dental Council, Traditional Medicine Practice Council, and Nursing & Midwifery Council.',
      impact: [
        { metric: 'Fraud Reduction', value: '98%', description: 'Decrease in unlicensed practitioners' },
        { metric: 'Verification Speed', value: '< 2 seconds', description: 'Average verification time' },
        { metric: 'Practitioners Verified', value: '8,500+', description: 'Healthcare professionals registered' },
        { metric: 'Public Trust', value: '94%', description: 'Citizen confidence increase' }
      ],
      timeline: '18 months',
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
      stakeholders: ['Ghana Medical & Dental Council', 'Traditional Medicine Practice Council', 'Nursing & Midwifery Council', 'Ministry of Health']
    },
    {
      id: 'kenya-cross-border',
      title: 'Kenya: Cross-Border Healthcare Professional Mobility',
      country: 'Kenya',
      flag: '🇰🇪',
      challenge: 'Kenyan healthcare professionals faced lengthy verification processes when seeking employment in other East African countries, limiting regional mobility.',
      solution: 'AMR established a pilot program connecting Kenya Medical Practitioners and Dentists Council with regional partners for instant cross-border verification.',
      impact: [
        { metric: 'Processing Time', value: '75%', description: 'Reduction in verification time' },
        { metric: 'Cross-Border Placements', value: '340%', description: 'Increase in regional employment' },
        { metric: 'Verification Accuracy', value: '99.7%', description: 'Credential validation accuracy' },
        { metric: 'Cost Savings', value: '$2.1M', description: 'Annual administrative savings' }
      ],
      timeline: '12 months',
      status: 'ongoing',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=500&fit=crop',
      stakeholders: ['Kenya Medical Practitioners Council', 'EAC Health Ministers', 'Regional Hospitals', 'Immigration Authorities']
    },
    {
      id: 'uganda-rural-access',
      title: 'Uganda: Rural Healthcare Access Through USSD Verification',
      country: 'Uganda',
      flag: '🇺🇬',
      challenge: 'Rural communities in Uganda lacked reliable internet access to verify healthcare practitioners, leading to vulnerability to fraudulent providers.',
      solution: 'AMR deployed USSD-based verification system working on basic feature phones and 2G networks, enabling instant practitioner verification in remote areas.',
      impact: [
        { metric: 'Rural Coverage', value: '95%', description: 'Remote areas with verification access' },
        { metric: 'USSD Verifications', value: '50,000+', description: 'Monthly rural verifications' },
        { metric: 'Fake Practitioner Detection', value: '87%', description: 'Fraudulent providers identified' },
        { metric: 'Community Trust', value: '91%', description: 'Increase in healthcare confidence' }
      ],
      timeline: '8 months',
      status: 'ongoing',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=500&fit=crop',
      stakeholders: ['Uganda Medical & Dental Practitioners Council', 'Ministry of Health', 'Telecom Partners', 'Rural Health Centers']
    }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'completed':
        return 'ri-check-circle-line';
      case 'ongoing':
        return 'ri-play-circle-line';
      case 'planned':
        return 'ri-time-line';
      default:
        return 'ri-circle-line';
    }
  }
}