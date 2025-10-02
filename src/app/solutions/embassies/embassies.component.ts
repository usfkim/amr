import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface EmbassyFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
  capabilities: string[];
  useCase: string;
}

@Component({
  selector: 'app-embassies',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './embassies.component.html',
  styleUrl: './embassies.component.css'
})
export class EmbassiesComponent implements OnInit {
  
  embassyFeatures: EmbassyFeature[] = [
    {
      id: 1,
      title: 'Credential Checks',
      description: 'Instant verification for visa and work permit applications',
      icon: 'ri-passport-line',
      useCase: 'Visa Processing',
      capabilities: [
        'Real-time credential verification',
        'Professional qualification validation',
        'License status confirmation',
        'Educational background check',
        'Employment history verification'
      ]
    },
    {
      id: 2,
      title: 'Work Permits',
      description: 'Streamlined processing for healthcare professional mobility',
      icon: 'ri-file-text-line',
      useCase: 'Professional Mobility',
      capabilities: [
        'Professional mobility facilitation',
        'Skill shortage area identification',
        'Qualification equivalency assessment',
        'Regulatory compliance verification',
        'Cross-border recognition'
      ]
    }
  ];

  diplomaticBenefits = [
    {
      title: 'Processing Speed',
      description: 'Reduce visa processing time with instant verification',
      icon: 'ri-speed-line',
      metric: '75%',
      metricLabel: 'Time Reduction'
    },
    {
      title: 'Fraud Prevention',
      description: 'Eliminate fraudulent credential submissions',
      icon: 'ri-shield-star-line',
      metric: '99%',
      metricLabel: 'Fraud Detection'
    },
    {
      title: 'Diplomatic Relations',
      description: 'Strengthen healthcare cooperation between nations',
      icon: 'ri-handshake-line',
      metric: '25+',
      metricLabel: 'Embassy Partners'
    },
    {
      title: 'Economic Impact',
      description: 'Facilitate healthcare professional mobility and investment',
      icon: 'ri-line-chart-line',
      metric: '$500M',
      metricLabel: 'Economic Value'
    }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}