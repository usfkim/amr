import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface ClaimVerification {
  id: string;
  claimNumber: string;
  practitionerName: string;
  licenseNumber: string;
  claimAmount: number;
  submittedDate: string;
  verificationStatus: 'verified' | 'pending' | 'failed' | 'flagged';
  riskScore: number;
  fraudIndicators: string[];
}

interface VerificationLog {
  id: string;
  timestamp: string;
  action: string;
  practitioner: string;
  result: 'success' | 'failure' | 'warning';
  details: string;
}

@Component({
  selector: 'app-insurer-portal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './insurer-portal.component.html',
  styleUrl: './insurer-portal.component.css'
})
export class InsurerPortalComponent implements OnInit {
  activeTab = 'dashboard';
  insurerName = 'Ghana National Insurance';
  totalClaims = 15847;
  verifiedClaims = 15234;
  flaggedClaims = 89;
  fraudPrevented = 2.1; // Million USD

  claimVerifications: ClaimVerification[] = [
    {
      id: '1',
      claimNumber: 'CLM-2025-001234',
      practitionerName: 'Dr. Sarah Mensah',
      licenseNumber: 'MDC-GH-2024-1234',
      claimAmount: 1250.00,
      submittedDate: '2025-01-15',
      verificationStatus: 'verified',
      riskScore: 15,
      fraudIndicators: []
    },
    {
      id: '2',
      claimNumber: 'CLM-2025-001235',
      practitionerName: 'Dr. Fake Name',
      licenseNumber: 'INVALID-123',
      claimAmount: 5000.00,
      submittedDate: '2025-01-15',
      verificationStatus: 'flagged',
      riskScore: 95,
      fraudIndicators: ['Invalid license', 'Suspicious amount', 'Pattern match']
    }
  ];

  verificationLogs: VerificationLog[] = [
    {
      id: '1',
      timestamp: '2025-01-15T14:30:22Z',
      action: 'Claim Verification',
      practitioner: 'Dr. Sarah Mensah',
      result: 'success',
      details: 'License verified, claim approved'
    },
    {
      id: '2',
      timestamp: '2025-01-15T14:25:18Z',
      action: 'Fraud Detection',
      practitioner: 'Dr. Fake Name',
      result: 'warning',
      details: 'Invalid license detected, claim flagged'
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
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'flagged':
        return 'bg-red-100 text-red-800 animate-pulse';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getRiskScoreClass(score: number): string {
    if (score >= 80) return 'text-red-600 font-bold';
    if (score >= 50) return 'text-yellow-600 font-bold';
    return 'text-green-600 font-bold';
  }

  getResultClass(result: string): string {
    switch (result) {
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'failure':
        return 'bg-red-100 text-red-600';
      case 'warning':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  approveClaim(claimId: string): void {
    const claim = this.claimVerifications.find(c => c.id === claimId);
    if (claim) {
      claim.verificationStatus = 'verified';
      alert('Claim approved for payment');
    }
  }

  flagClaim(claimId: string): void {
    const claim = this.claimVerifications.find(c => c.id === claimId);
    if (claim) {
      claim.verificationStatus = 'flagged';
      alert('Claim flagged for investigation');
    }
  }

  getFraudPreventionRate(): number {
    return Math.round((this.flaggedClaims / this.totalClaims) * 100 * 100) / 100;
  }
}