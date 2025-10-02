import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

interface SecurityFeature {
  title: string;
  description: string;
  icon: string;
  level: 'enterprise' | 'military' | 'government';
  certifications: string[];
}

interface ComplianceStandard {
  name: string;
  description: string;
  region: string;
  status: 'certified' | 'compliant' | 'in-progress';
  icon: string;
}

@Component({
  selector: 'app-security-privacy',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './security-privacy.component.html',
  styleUrl: './security-privacy.component.css'
})
export class SecurityPrivacyComponent implements OnInit {
  
  securityFeatures: SecurityFeature[] = [
    {
      title: 'End-to-End Encryption',
      description: 'Military-grade AES-256 encryption for all data at rest and in transit',
      icon: 'ri-lock-line',
      level: 'military',
      certifications: ['FIPS 140-2', 'Common Criteria EAL4+']
    },
    {
      title: 'Blockchain Integrity',
      description: 'Immutable audit trails with cryptographic proof of data integrity',
      icon: 'ri-links-line',
      level: 'enterprise',
      certifications: ['ISO 27001', 'SOC 2 Type II']
    },
    {
      title: 'Multi-Factor Authentication',
      description: 'Advanced authentication with biometric and hardware token support',
      icon: 'ri-shield-keyhole-line',
      level: 'government',
      certifications: ['NIST 800-63B', 'FIDO2 Certified']
    },
    {
      title: 'Zero-Trust Architecture',
      description: 'Never trust, always verify - comprehensive security model',
      icon: 'ri-shield-star-line',
      level: 'enterprise',
      certifications: ['NIST Zero Trust', 'ISO 27017']
    },
    {
      title: 'Data Sovereignty',
      description: 'Complete national control over healthcare data with local residency',
      icon: 'ri-government-line',
      level: 'government',
      certifications: ['AU Data Protection', 'GDPR Article 44']
    },
    {
      title: 'AI Security Monitoring',
      description: 'Machine learning-powered threat detection and response',
      icon: 'ri-brain-line',
      level: 'enterprise',
      certifications: ['ISO 23053', 'NIST AI Framework']
    }
  ];

  complianceStandards: ComplianceStandard[] = [
    {
      name: 'GDPR Compliance',
      description: 'Full compliance with European Union data protection regulations',
      region: 'European Union',
      status: 'certified',
      icon: 'ri-shield-check-line'
    },
    {
      name: 'AU Data Protection Convention',
      description: 'Aligned with African Union cybersecurity and data protection framework',
      region: 'African Union',
      status: 'certified',
      icon: 'ri-global-line'
    },
    {
      name: 'ISO 27001',
      description: 'International standard for information security management systems',
      region: 'International',
      status: 'certified',
      icon: 'ri-award-line'
    },
    {
      name: 'SOC 2 Type II',
      description: 'Service Organization Control 2 audit for security and availability',
      region: 'International',
      status: 'certified',
      icon: 'ri-file-shield-line'
    },
    {
      name: 'HIPAA Alignment',
      description: 'Healthcare data protection standards alignment',
      region: 'Healthcare',
      status: 'compliant',
      icon: 'ri-heart-pulse-line'
    },
    {
      name: 'WHO Digital Health Standards',
      description: 'World Health Organization digital health implementation guidelines',
      region: 'Global Health',
      status: 'compliant',
      icon: 'ri-hospital-line'
    }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getLevelClass(level: string): string {
    switch (level) {
      case 'military':
        return 'bg-red-100 text-red-800';
      case 'government':
        return 'bg-blue-100 text-blue-800';
      case 'enterprise':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'certified':
        return 'bg-green-100 text-green-800';
      case 'compliant':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'certified':
        return 'ri-check-circle-line text-green-600';
      case 'compliant':
        return 'ri-shield-check-line text-blue-600';
      case 'in-progress':
        return 'ri-time-line text-yellow-600';
      default:
        return 'ri-circle-line text-gray-400';
    }
  }
}