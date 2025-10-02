import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface PractitionerProfile {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  
  // Contact Information
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  
  // Professional Information
  profession: string;
  specialization: string;
  licenseNumber: string;
  issuingAuthority: string;
  licenseExpiry: string;
  institution: string;
  
  // Profile Settings
  profileVisibility: 'public' | 'verified-only' | 'private';
  allowDirectContact: boolean;
  showInstitution: boolean;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  isEditing = false;
  
  profile: PractitionerProfile = {
    firstName: 'Sarah',
    lastName: 'Mensah',
    dateOfBirth: '1985-03-15',
    gender: 'female',
    nationality: 'Ghanaian',
    email: 'sarah.mensah@email.com',
    phone: '+233 24 123 4567',
    address: '123 Medical Street',
    city: 'Accra',
    country: 'Ghana',
    profession: 'Medical Doctor',
    specialization: 'Cardiology',
    licenseNumber: 'MDC-GH-2024-1234',
    issuingAuthority: 'Ghana Medical & Dental Council',
    licenseExpiry: '2025-12-31',
    institution: 'Korle Bu Teaching Hospital',
    profileVisibility: 'public',
    allowDirectContact: true,
    showInstitution: true
  };

  countries = [
    { value: 'Ghana', label: 'Ghana' },
    { value: 'Nigeria', label: 'Nigeria' },
    { value: 'South Africa', label: 'South Africa' },
    { value: 'Kenya', label: 'Kenya' }
  ];

  professions = [
    { value: 'Medical Doctor', label: 'Medical Doctor' },
    { value: 'Nurse', label: 'Nurse' },
    { value: 'Pharmacist', label: 'Pharmacist' },
    { value: 'Dentist', label: 'Dentist' }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    console.log('Saving profile:', this.profile);
    this.isEditing = false;
    // TODO: Implement API call to save profile
    alert('Profile updated successfully!');
  }

  cancelEdit(): void {
    this.isEditing = false;
    // TODO: Reset form to original values
  }

  onPhotoUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('Photo uploaded:', file.name);
      // TODO: Implement photo upload
      alert('Photo upload functionality will be implemented');
    }
  }
}