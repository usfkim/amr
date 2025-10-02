import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { AuthService } from '../../../services/auth.service';

interface SignInForm {
  email: string;
  password: string;
  userType: 'practitioner' | 'regulator' | 'hospital' | 'insurer' | 'embassy';
  rememberMe: boolean;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  signInForm: SignInForm = {
    email: '',
    password: '',
    userType: 'practitioner',
    rememberMe: false
  };

  isLoading = false;
  showError = false;
  errorMessage = '';
  showSuccess = false;

  userTypes = [
    { value: 'practitioner', label: 'Healthcare Practitioner', icon: 'ri-stethoscope-line', description: 'Doctors, Nurses, Pharmacists' },
    { value: 'regulator', label: 'Medical Council/Regulator', icon: 'ri-government-line', description: 'Regulatory Bodies' },
    { value: 'hospital', label: 'Hospital/Healthcare Facility', icon: 'ri-hospital-line', description: 'Healthcare Institutions' },
    { value: 'insurer', label: 'Insurance Company', icon: 'ri-shield-line', description: 'Insurance Providers' },
    { value: 'embassy', label: 'Embassy/Diplomatic Mission', icon: 'ri-building-line', description: 'Diplomatic Services' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Show test accounts for demo
    console.log('Available test accounts:', this.authService.getTestAccounts());
  }

  onSignIn(): void {
    if (!this.validateForm()) {
      this.showError = true;
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    this.isLoading = true;
    this.showError = false;

    // Use AuthService for authentication
    this.authService.signIn(this.signInForm.email, this.signInForm.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.showSuccess = true;
        
        // Route based on user role from response
        setTimeout(() => {
          switch (response.user?.role) {
            case 'global_admin':
            case 'observer':
              this.router.navigate(['/admin/dashboard']);
              break;
            case 'country_admin':
            case 'regulator':
              this.router.navigate(['/regulatory-platform']);
              break;
            case 'practitioner':
              this.router.navigate(['/practitioner/dashboard']);
              break;
            case 'hospital':
              this.router.navigate(['/hospital-portal']);
              break;
            case 'insurer':
              this.router.navigate(['/insurer-portal']);
              break;
            case 'embassy':
              this.router.navigate(['/embassy-portal']);
              break;
            default:
              this.router.navigate(['/']);
          }
        }, 1500);
      },
      error: (error) => {
        this.isLoading = false;
        this.showError = true;
        this.errorMessage = error.message || 'Authentication failed. Please try again.';
      }
    });
  }

  validateForm(): boolean {
    return !!(this.signInForm.email && 
             this.signInForm.password && 
             this.signInForm.userType);
  }

  getUserTypeInfo() {
    return this.userTypes.find(type => type.value === this.signInForm.userType);
  }

  closeAlert(): void {
    this.showError = false;
    this.showSuccess = false;
  }
}