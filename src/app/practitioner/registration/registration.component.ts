import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface RegistrationStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
}

interface RegistrationForm {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  nationalId: string;
  
  // Contact Information
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  
  // Professional Information
  profession: string;
  specialization: string;
  qualifications: string;
  institution: string;
  graduationYear: string;
  
  // License Information
  previousLicense: string;
  regulatoryBody: string;
  
  // Documents
  documents: {
    photo: File | null;
    certificate: File | null;
    transcript: File | null;
    nationalId: File | null;
  };
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  currentStep = 1;
  totalSteps = 5;
  
  steps: RegistrationStep[] = [
    { id: 1, title: 'Personal Info', description: 'Basic personal details', completed: false, active: true },
    { id: 2, title: 'Contact Details', description: 'Contact information', completed: false, active: false },
    { id: 3, title: 'Professional Info', description: 'Professional qualifications', completed: false, active: false },
    { id: 4, title: 'Documents', description: 'Upload required documents', completed: false, active: false },
    { id: 5, title: 'Review & Submit', description: 'Review and submit application', completed: false, active: false }
  ];

  registrationForm: RegistrationForm = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    nationalId: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    profession: '',
    specialization: '',
    qualifications: '',
    institution: '',
    graduationYear: '',
    previousLicense: '',
    regulatoryBody: '',
    documents: {
      photo: null,
      certificate: null,
      transcript: null,
      nationalId: null
    }
  };

  countries = [
    { value: 'gh', label: 'Ghana' },
    { value: 'ng', label: 'Nigeria' },
    { value: 'za', label: 'South Africa' },
    { value: 'ke', label: 'Kenya' },
    { value: 'ug', label: 'Uganda' }
  ];

  professions = [
    { value: 'doctor', label: 'Medical Doctor' },
    { value: 'nurse', label: 'Nurse' },
    { value: 'pharmacist', label: 'Pharmacist' },
    { value: 'dentist', label: 'Dentist' },
    { value: 'herbalist', label: 'Medical Herbalist' }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextStep(): void {
    if (this.validateCurrentStep()) {
      if (this.currentStep < this.totalSteps) {
        this.steps[this.currentStep - 1].completed = true;
        this.steps[this.currentStep - 1].active = false;
        this.currentStep++;
        this.steps[this.currentStep - 1].active = true;
        this.scrollToTop();
      }
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.steps[this.currentStep - 1].active = false;
      this.currentStep--;
      this.steps[this.currentStep - 1].active = true;
      this.steps[this.currentStep - 1].completed = false;
      this.scrollToTop();
    }
  }

  goToStep(stepNumber: number): void {
    if (stepNumber <= this.currentStep || this.steps[stepNumber - 1].completed) {
      this.steps[this.currentStep - 1].active = false;
      this.currentStep = stepNumber;
      this.steps[this.currentStep - 1].active = true;
      this.scrollToTop();
    }
  }

  validateCurrentStep(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!(this.registrationForm.firstName && 
                 this.registrationForm.lastName && 
                 this.registrationForm.dateOfBirth && 
                 this.registrationForm.gender && 
                 this.registrationForm.nationality);
      case 2:
        return !!(this.registrationForm.email && 
                 this.registrationForm.phone && 
                 this.registrationForm.address && 
                 this.registrationForm.city && 
                 this.registrationForm.country);
      case 3:
        return !!(this.registrationForm.profession && 
                 this.registrationForm.qualifications && 
                 this.registrationForm.institution && 
                 this.registrationForm.graduationYear);
      case 4:
        return !!(this.registrationForm.documents.photo && 
                 this.registrationForm.documents.certificate);
      default:
        return true;
    }
  }

  onFileSelect(event: any, documentType: keyof RegistrationForm['documents']): void {
    const file = event.target.files[0];
    if (file) {
      this.registrationForm.documents[documentType] = file;
    }
  }

  submitRegistration(): void {
    console.log('Registration submitted:', this.registrationForm);
    // TODO: Implement API call to backend
    this.showSuccessMessage();
  }

  showSuccessMessage(): void {
    // Create success modal or redirect to success page
    alert('Registration submitted successfully! You will receive a confirmation email shortly.');
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getStepClass(step: RegistrationStep): string {
    if (step.completed) return 'step-completed';
    if (step.active) return 'step-active';
    return 'step-inactive';
  }
}