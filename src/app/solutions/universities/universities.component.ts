import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface UniversityFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
  capabilities: string[];
  target: string;
}

@Component({
  selector: 'app-universities',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './universities.component.html',
  styleUrl: './universities.component.css'
})
export class UniversitiesComponent implements OnInit {
  
  universityFeatures: UniversityFeature[] = [
    {
      id: 1,
      title: 'Student Onboarding',
      description: 'Streamlined verification for medical students and graduates',
      icon: 'ri-graduation-cap-line',
      target: 'Medical Schools',
      capabilities: [
        'Student identity verification',
        'Academic record validation',
        'Graduation certification',
        'Transcript authentication',
        'Digital diploma issuance'
      ]
    },
    {
      id: 2,
      title: 'Internship Verification',
      description: 'Verify students for clinical placements and internships',
      icon: 'ri-hospital-line',
      target: 'Clinical Programs',
      capabilities: [
        'Clinical placement verification',
        'Supervisor validation',
        'Progress tracking',
        'Competency assessment',
        'Certification management'
      ]
    },
    {
      id: 3,
      title: 'CPD Credits',
      description: 'Continuing education credit management and tracking',
      icon: 'ri-book-line',
      target: 'Continuing Education',
      capabilities: [
        'Credit accumulation tracking',
        'Course certification',
        'Professional development planning',
        'Compliance monitoring',
        'Achievement recognition'
      ]
    }
  ];

  integrationBenefits = [
    {
      title: 'Academic Integrity',
      description: 'Ensure authentic credentials and qualifications',
      icon: 'ri-shield-check-line',
      metric: '100%',
      metricLabel: 'Verification Rate'
    },
    {
      title: 'Graduate Tracking',
      description: 'Monitor graduate career progression and outcomes',
      icon: 'ri-line-chart-line',
      metric: '95%',
      metricLabel: 'Graduate Tracking'
    },
    {
      title: 'Placement Success',
      description: 'Higher placement rates with verified credentials',
      icon: 'ri-trophy-line',
      metric: '85%',
      metricLabel: 'Placement Rate'
    },
    {
      title: 'Reputation Enhancement',
      description: 'Build institutional reputation through verification',
      icon: 'ri-star-line',
      metric: '4.9/5',
      metricLabel: 'Trust Rating'
    }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}