import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";

interface ContactForm {
  name: string;
  email: string;
  organization: string;
  country: string;
  inquiryType: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm: ContactForm = {
    name: '',
    email: '',
    organization: '',
    country: '',
    inquiryType: '',
    message: ''
  };

  isSubmitting = false;
  showSuccess = false;
  showError = false;
  errorMessage = '';

  countries = [
    { value: 'gh', label: 'Ghana' },
    { value: 'ng', label: 'Nigeria' },
    { value: 'za', label: 'South Africa' },
    { value: 'ke', label: 'Kenya' },
    { value: 'ug', label: 'Uganda' },
    { value: 'tz', label: 'Tanzania' },
    { value: 'rw', label: 'Rwanda' },
    { value: 'et', label: 'Ethiopia' },
    { value: 'eg', label: 'Egypt' },
    { value: 'ma', label: 'Morocco' },
    { value: 'other', label: 'Other African Country' },
    { value: 'diaspora', label: 'African Diaspora' }
  ];

  inquiryTypes = [
    { value: 'practitioner-support', label: 'Practitioner Support' },
    { value: 'regulatory-integration', label: 'Regulatory Integration' },
    { value: 'country-partnership', label: 'Country Partnership' },
    { value: 'media-press', label: 'Media or Press' },
    { value: 'investment-inquiry', label: 'Investment Inquiry' },
    { value: 'technical-support', label: 'Technical Support' },
    { value: 'other', label: 'Other' }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  submitForm(): void {
    // Validate form
    if (!this.validateForm()) {
      this.showError = true;
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    this.isSubmitting = true;
    this.showError = false;
    this.showSuccess = false;

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      
      // Simulate random success/failure for demo
      if (Math.random() > 0.1) { // 90% success rate
        this.showSuccess = true;
        this.resetForm();
      } else {
        this.showError = true;
        this.errorMessage = 'Failed to send message. Please try again.';
      }
    }, 2000);
  }

  validateForm(): boolean {
    return !!(this.contactForm.name && 
             this.contactForm.email && 
             this.contactForm.country && 
             this.contactForm.inquiryType && 
             this.contactForm.message);
  }

  resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      organization: '',
      country: '',
      inquiryType: '',
      message: ''
    };
  }

  closeAlert(): void {
    this.showSuccess = false;
    this.showError = false;
  }

}
