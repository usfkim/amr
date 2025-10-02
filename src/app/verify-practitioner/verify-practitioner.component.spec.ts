import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../shared/footer/footer.component";
import { HeaderComponent } from "../shared/header/header.component";

interface SearchForm {
  fullName: string;
  licenseNumber: string;
  country: string;
  practitionerType: string;
  specialization: string;
  institution: string;
  status: string;
}

interface SearchResult {
  name: string;
  photo: string;
  status: string;
  lastVerified: string;
  practitionerType: string;
  specialization: string;
  licenseNumber: string;
  country: string;
  issuingAuthority: string;
  registrationDate: string;
  verifiedBy: string;
  institution: string;
}

@Component({
  selector: 'app-verify-practitioner',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, HeaderComponent],
  templateUrl: './verify-practitioner.component.html',
  styleUrls: ['./verify-practitioner.component.css']
})
export class VerifyPractitionerComponent implements OnInit {
  
  searchForm: SearchForm = {
    fullName: '',
    licenseNumber: '',
    country: '',
    practitionerType: '',
    specialization: '',
    institution: '',
    status: ''
  };

  isSearching = false;
  showResults = false;
  showNotFound = false;
  searchResult: SearchResult | null = null;

  countries = [
    { value: 'gh', label: 'Ghana' },
    { value: 'ng', label: 'Nigeria' },
    { value: 'za', label: 'South Africa' },
    { value: 'na', label: 'Namibia' },
    { value: 'bw', label: 'Botswana' },
    { value: 'ug', label: 'Uganda' },
    { value: 'ke', label: 'Kenya' },
    { value: 'tz', label: 'Tanzania' },
    // Add more countries as needed
  ];

  practitionerTypes = [
    { value: 'doctor', label: 'Medical Doctor' },
    { value: 'dentist', label: 'Dentist' },
    { value: 'nurse', label: 'Nurse' },
    { value: 'midwife', label: 'Midwife' },
    { value: 'pharmacist', label: 'Pharmacist' },
    { value: 'herbalist', label: 'Medical Herbalist' },
    { value: 'lab_scientist', label: 'Laboratory Scientist' },
    { value: 'psychologist', label: 'Psychologist' },
    { value: 'therapist', label: 'Mental Health Therapist' },
  ];

  specializations = [
    { value: 'general_medicine', label: 'General Medicine' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'gynecology', label: 'Gynecology' },
    { value: 'psychiatry', label: 'Psychiatry' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'ophthalmology', label: 'Ophthalmology' },
  ];

  statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'revoked', label: 'Revoked' },
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.searchForm.status = 'all'; // Set default status
    this.addSmoothAnimations();
  }

  addSmoothAnimations(): void {
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    });

    // Observe sections after a short delay to ensure DOM is ready
    setTimeout(() => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => observer.observe(section));
    }, 100);
  }

  onSearch(): void {
    // Check if at least one field is filled
    const hasSearchCriteria = this.searchForm.fullName || 
                             this.searchForm.licenseNumber || 
                             this.searchForm.country || 
                             this.searchForm.practitionerType || 
                             this.searchForm.specialization || 
                             this.searchForm.institution;

    if (!hasSearchCriteria) {
      this.showMessage('Please fill in at least one search field', 'warning');
      return;
    }

    this.isSearching = true;
    this.showResults = false;
    this.showNotFound = false;

    // Add smooth loading animation
    const searchButton = document.querySelector('button[type="submit"]');
    if (searchButton) {
      searchButton.classList.add('animate-pulse');
    }

    // Simulate API call with more realistic delay
    setTimeout(() => {
      this.isSearching = false;
      
      if (searchButton) {
        searchButton.classList.remove('animate-pulse');
      }
      
      // Enhanced mock search logic
      if (this.searchForm.fullName.toLowerCase().includes('john') || 
          this.searchForm.fullName.toLowerCase().includes('kwame') ||
          this.searchForm.licenseNumber === 'MD123456' ||
          this.searchForm.licenseNumber.includes('MDC-GH')) {
        
        // Mock successful result with better data
        this.searchResult = {
          name: 'Dr. John Kwame Asante',
          photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face',
          status: 'active',
          lastVerified: '2025-01-15',
          practitionerType: 'Medical Doctor',
          specialization: 'Cardiology',
          licenseNumber: 'MDC-GH-2025-1749',
          country: 'Ghana',
          issuingAuthority: 'Ghana Medical & Dental Council',
          registrationDate: '2018-06-15',
          verifiedBy: 'AMR System',
          institution: 'Korle Bu Teaching Hospital'
        };
        this.showResults = true;
        this.showMessage('Practitioner found and verified!', 'success');
        
        // Smooth scroll to results
        setTimeout(() => {
          document.querySelector('#search-results')?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 300);
      } else {
        this.showNotFound = true;
        this.showMessage('No matching practitioner found', 'error');
        
        // Smooth scroll to not found section
        setTimeout(() => {
          document.querySelector('#not-found-results')?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 300);
      }
    }, 2000);
  }

  showMessage(message: string, type: 'success' | 'error' | 'warning'): void {
    // Create a toast notification
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    switch (type) {
      case 'success':
        toast.className += ' bg-green-100 text-green-800 border border-green-200';
        break;
      case 'error':
        toast.className += ' bg-red-100 text-red-800 border border-red-200';
        break;
      case 'warning':
        toast.className += ' bg-yellow-100 text-yellow-800 border border-yellow-200';
        break;
    }
    
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <i class="ri-${type === 'success' ? 'check' : type === 'error' ? 'close' : 'alert'}-circle-line"></i>
        ${message}
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.remove('translate-x-full'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  }

  onQrScan(): void {
    console.log('QR Scanner launched');
    this.showMessage('QR Scanner feature coming soon!', 'warning');
    
    // Add a nice animation to the QR button
    const qrButton = document.querySelector('button[data-qr-scan]');
    if (qrButton) {
      qrButton.classList.add('animate-bounce');
      setTimeout(() => qrButton.classList.remove('animate-bounce'), 1000);
    }
  }

  onDownloadCertificate(): void {
    console.log('Download certificate clicked');
    this.showMessage('Certificate download started!', 'success');
    
    // Simulate download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,AMR Verification Certificate\n\nPractitioner: ' + this.searchResult?.name + '\nStatus: Verified';
    link.download = 'AMR-Certificate.txt';
    link.click();
  }

  onViewCredentials(): void {
    console.log('View credentials clicked');
    this.showMessage('Opening credentials viewer...', 'success');
    // TODO: Implement credentials view modal or navigation
  }

  onReportFake(): void {
    console.log('Report fake practitioner clicked');
    this.showMessage('Report form opened', 'warning');
    // TODO: Implement reporting functionality
  }

  getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      case 'revoked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'ri-check-circle-line';
      case 'suspended':
        return 'ri-pause-circle-line';
      case 'revoked':
        return 'ri-close-circle-line';
      default:
        return 'ri-question-line';
    }
  }
}
