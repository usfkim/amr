import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface AnomalyDetection {
  id: string;
  timestamp: string;
  type: 'credential_fraud' | 'duplicate_license' | 'suspicious_activity' | 'data_inconsistency';
  severity: 'high' | 'medium' | 'low';
  practitioner: string;
  country: string;
  confidence: number;
  status: 'investigating' | 'resolved' | 'false_positive';
}

interface RiskScore {
  practitioner: string;
  country: string;
  overallScore: number;
  factors: {
    credentialVerification: number;
    activityPattern: number;
    crossBorderMovement: number;
    complianceHistory: number;
  };
}

interface NationalInsight {
  country: string;
  flag: string;
  totalPractitioners: number;
  verificationRate: number;
  fraudDetectionRate: number;
  complianceScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  trends: {
    newRegistrations: number;
    renewals: number;
    sanctions: number;
  };
}

@Component({
  selector: 'app-ai',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.css'
})
export class AiComponent implements OnInit, OnDestroy {
  private animationInterval?: number;
  
  recentAnomalies: AnomalyDetection[] = [
    { id: '1', timestamp: '2025-01-15T14:30:22Z', type: 'credential_fraud', severity: 'high', practitioner: 'Dr. Fake Name', country: 'Ghana', confidence: 98.5, status: 'investigating' },
    { id: '2', timestamp: '2025-01-15T14:25:18Z', type: 'duplicate_license', severity: 'medium', practitioner: 'Dr. John Smith', country: 'Nigeria', confidence: 87.2, status: 'resolved' },
    { id: '3', timestamp: '2025-01-15T14:20:45Z', type: 'suspicious_activity', severity: 'low', practitioner: 'Dr. Sarah Ahmed', country: 'Egypt', confidence: 72.8, status: 'false_positive' },
    { id: '4', timestamp: '2025-01-15T14:15:33Z', type: 'data_inconsistency', severity: 'medium', practitioner: 'Dr. Michael Osei', country: 'Ghana', confidence: 91.3, status: 'investigating' }
  ];

  riskScores: RiskScore[] = [
    {
      practitioner: 'Dr. John Asante',
      country: 'Ghana',
      overallScore: 95,
      factors: { credentialVerification: 98, activityPattern: 92, crossBorderMovement: 94, complianceHistory: 96 }
    },
    {
      practitioner: 'Dr. Amina Hassan',
      country: 'Egypt',
      overallScore: 88,
      factors: { credentialVerification: 95, activityPattern: 85, crossBorderMovement: 82, complianceHistory: 90 }
    },
    {
      practitioner: 'Dr. Chidi Okafor',
      country: 'Nigeria',
      overallScore: 92,
      factors: { credentialVerification: 94, activityPattern: 89, crossBorderMovement: 91, complianceHistory: 94 }
    }
  ];

  nationalInsights: NationalInsight[] = [
    {
      country: 'Ghana',
      flag: '🇬🇭',
      totalPractitioners: 8500,
      verificationRate: 99.2,
      fraudDetectionRate: 0.8,
      complianceScore: 96,
      riskLevel: 'low',
      trends: { newRegistrations: 45, renewals: 23, sanctions: 2 }
    },
    {
      country: 'Nigeria',
      flag: '🇳🇬',
      totalPractitioners: 12000,
      verificationRate: 98.7,
      fraudDetectionRate: 1.3,
      complianceScore: 94,
      riskLevel: 'low',
      trends: { newRegistrations: 67, renewals: 34, sanctions: 5 }
    },
    {
      country: 'Egypt',
      flag: '🇪🇬',
      totalPractitioners: 4200,
      verificationRate: 97.9,
      fraudDetectionRate: 2.1,
      complianceScore: 92,
      riskLevel: 'medium',
      trends: { newRegistrations: 28, renewals: 18, sanctions: 3 }
    }
  ];

  aiStats = {
    modelsDeployed: 12,
    accuracyRate: 99.8,
    falsePositiveRate: 0.2,
    processingSpeed: '< 100ms',
    dataPoints: '2.4M',
    predictiveAccuracy: 94.5
  };

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.startAIAnimation();
  }

  ngOnDestroy(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  startAIAnimation(): void {
    this.animationInterval = window.setInterval(() => {
      // Simulate real-time AI processing
      this.aiStats.dataPoints = (parseFloat(this.aiStats.dataPoints.replace('M', '')) + 0.1).toFixed(1) + 'M';
      
      // Update anomaly confidence scores
      this.recentAnomalies.forEach(anomaly => {
        if (anomaly.status === 'investigating') {
          anomaly.confidence = Math.min(99.9, anomaly.confidence + Math.random() * 0.5);
        }
      });
    }, 2000);
  }

  getAnomalyTypeClass(type: string): string {
    switch (type) {
      case 'credential_fraud':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'duplicate_license':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'suspicious_activity':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'data_inconsistency':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  getSeverityClass(severity: string): string {
    switch (severity) {
      case 'high':
        return 'bg-red-500 text-white animate-pulse';
      case 'medium':
        return 'bg-orange-500 text-white';
      case 'low':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'investigating':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'false_positive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getRiskLevelClass(riskLevel: string): string {
    switch (riskLevel) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleTimeString();
  }
}