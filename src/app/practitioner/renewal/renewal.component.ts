import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface RenewalStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
}

interface RenewalForm {
  currentLicense: string;
  expiryDate: string;
  renewalPeriod: string;
  cpdCredits: number;
  paymentMethod: string;
  documents: {
    cpdCertificates: File[];
    continuingEducation: File[];
  };
}

@Component({
  selector: 'app-renewal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './renewal.component.html',
  styleUrl: './renewal.component.css'
})
export class RenewalComponent implements OnInit {
  currentStep = 1;
  totalSteps = 4;
  
  renewalSteps: RenewalStep[] = [
    { id: 1, title: 'Eligibility Check', description: 'Verify renewal requirements', completed: false, required: true },
    { id: 2, title: 'CPD Verification', description: 'Confirm continuing education credits', completed: false, required: true },
    { id: 3, title: 'Payment Processing', description: 'Complete renewal payment', completed: false, required: true },
    { id: 4, title: 'License Issuance', description: 'Receive updated license', completed: false, required: true }
  ];

  renewalForm: RenewalForm = {
    currentLicense: 'MDC-GH-2024-1234',
    expiryDate: '2025-12-31',
    renewalPeriod: '1-year',
    cpdCredits: 15,
    paymentMethod: 'card',
    documents: {
      cpdCertificates: [],
      continuingEducation: []
    }
  };

  requiredCredits = 30;
  renewalFee = 250;
  processingTime = '5-7 business days';

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.renewalSteps[this.currentStep - 1].completed = true;
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.renewalSteps[this.currentStep - 1].completed = false;
    }
  }

  submitRenewal(): void {
    console.log('Renewal submitted:', this.renewalForm);
    alert('Renewal application submitted successfully!');
  }

  onFileSelect(event: any, documentType: keyof RenewalForm['documents']): void {
    const files = Array.from(event.target.files);
    this.renewalForm.documents[documentType] = files as File[];
  }

  getStepClass(step: RenewalStep): string {
    if (step.completed) return 'step-completed';
    if (step.id === this.currentStep) return 'step-active';
    return 'step-inactive';
  }

  getCreditProgress(): number {
    return Math.round((this.renewalForm.cpdCredits / this.requiredCredits) * 100);
  }
}