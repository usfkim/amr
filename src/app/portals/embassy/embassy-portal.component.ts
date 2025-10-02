import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface VisaApplication {
  id: string;
  applicantName: string;
  profession: string;
  licenseNumber: string;
  country: string;
  visaType: string;
  submittedDate: string;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  processingTime: string;
}

interface CredentialCheck {
  id: string;
  timestamp: string;
  practitionerName: string;
  licenseNumber: string;
  requestedBy: string;
  verificationResult: 'valid' | 'invalid' | 'expired';
  purpose: string;
}

@Component({
  selector: 'app-embassy-portal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './embassy-portal.component.html',
  styleUrl: './embassy-portal.component.css'
})
export class EmbassyPortalComponent implements OnInit {
  activeTab = 'dashboard';
  embassyName = 'Ghana Embassy - United Kingdom';
  totalApplications = 1247;
  verifiedApplications = 1189;
  pendingApplications = 58;
  
  visaApplications: VisaApplication[] = [
    {
      id: '1',
      applicantName: 'Dr. Kwame Asante',
      profession: 'Cardiologist',
      licenseNumber: 'MDC-GH-2024-1234',
      country: 'Ghana',
      visaType: 'Work Visa',
      submittedDate: '2025-01-15',
      verificationStatus: 'verified',
      processingTime: '2 days'
    },
    {
      id: '2',
      applicantName: 'Nurse Akosua Mensah',
      profession: 'Registered Nurse',
      licenseNumber: 'NMC-GH-2024-5678',
      country: 'Ghana',
      visaType: 'Professional Mobility',
      submittedDate: '2025-01-14',
      verificationStatus: 'pending',
      processingTime: '1 day'
    }
  ];

  credentialChecks: CredentialCheck[] = [
    {
      id: '1',
      timestamp: '2025-01-15T14:30:22Z',
      practitionerName: 'Dr. Sarah Mensah',
      licenseNumber: 'MDC-GH-2024-1234',
      requestedBy: 'NHS Trust',
      verificationResult: 'valid',
      purpose: 'Employment verification'
    },
    {
      id: '2',
      timestamp: '2025-01-15T14:25:18Z',
      practitionerName: 'Dr. John Osei',
      licenseNumber: 'MDC-GH-2023-9876',
      requestedBy: 'Private Hospital',
      verificationResult: 'expired',
      purpose: 'License status check'
    }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'verified':
      case 'valid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
      case 'invalid':
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  approveApplication(applicationId: string): void {
    const application = this.visaApplications.find(a => a.id === applicationId);
    if (application) {
      application.verificationStatus = 'verified';
      alert('Visa application approved');
    }
  }

  rejectApplication(applicationId: string): void {
    const application = this.visaApplications.find(a => a.id === applicationId);
    if (application) {
      application.verificationStatus = 'rejected';
      alert('Visa application rejected');
    }
  }

  getApprovalRate(): number {
    return Math.round((this.verifiedApplications / this.totalApplications) * 100);
  }
}