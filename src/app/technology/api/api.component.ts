import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface APIEndpoint {
  method: string;
  endpoint: string;
  description: string;
  parameters: string[];
  response: string;
  rateLimit: string;
  authentication: string;
}

interface APIKeyRequest {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  organizationType: string;
  country: string;
  useCase: string;
  expectedVolume: string;
  integrationTimeline: string;
  technicalContact: string;
  message: string;
}

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './api.component.html',
  styleUrl: './api.component.css'
})
export class ApiComponent implements OnInit {
  
  apiEndpoints: APIEndpoint[] = [
    {
      method: 'GET',
      endpoint: '/api/v2/verify/{license_number}',
      description: 'Verify practitioner by license number',
      parameters: ['license_number', 'country_code', 'include_details'],
      response: 'Practitioner verification status and details',
      rateLimit: '1000/hour',
      authentication: 'API Key + Bearer Token'
    },
    {
      method: 'POST',
      endpoint: '/api/v2/verify/batch',
      description: 'Bulk verification of multiple practitioners',
      parameters: ['practitioners[]', 'country_filter', 'verification_level'],
      response: 'Array of verification results',
      rateLimit: '100/hour',
      authentication: 'API Key + Bearer Token'
    },
    {
      method: 'GET',
      endpoint: '/api/v2/search',
      description: 'Search practitioners by name or criteria',
      parameters: ['query', 'country', 'profession', 'limit', 'offset'],
      response: 'Paginated search results',
      rateLimit: '500/hour',
      authentication: 'API Key'
    },
    {
      method: 'GET',
      endpoint: '/api/v2/practitioner/{id}/status',
      description: 'Get real-time license status',
      parameters: ['practitioner_id', 'include_history'],
      response: 'Current license status and history',
      rateLimit: '2000/hour',
      authentication: 'API Key'
    },
    {
      method: 'POST',
      endpoint: '/api/v2/webhooks/subscribe',
      description: 'Subscribe to real-time verification events',
      parameters: ['webhook_url', 'events[]', 'country_filter'],
      response: 'Webhook subscription confirmation',
      rateLimit: '10/day',
      authentication: 'API Key + Bearer Token'
    },
    {
      method: 'GET',
      endpoint: '/api/v2/analytics/insights',
      description: 'Get healthcare workforce analytics',
      parameters: ['country', 'date_range', 'metrics[]'],
      response: 'Analytics data and insights',
      rateLimit: '50/hour',
      authentication: 'API Key + Bearer Token'
    }
  ];

  apiKeyRequest: APIKeyRequest = {
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    organizationType: '',
    country: '',
    useCase: '',
    expectedVolume: '',
    integrationTimeline: '',
    technicalContact: '',
    message: ''
  };

  organizationTypes = [
    { value: 'hospital', label: 'Hospital/Healthcare Network' },
    { value: 'government', label: 'Government/Regulatory Body' },
    { value: 'insurance', label: 'Insurance Company' },
    { value: 'university', label: 'University/Academic Institution' },
    { value: 'embassy', label: 'Embassy/Diplomatic Mission' },
    { value: 'technology', label: 'Technology Company' },
    { value: 'other', label: 'Other Organization' }
  ];

  countries = [
    { value: 'gh', label: 'Ghana' },
    { value: 'ng', label: 'Nigeria' },
    { value: 'za', label: 'South Africa' },
    { value: 'eg', label: 'Egypt' },
    { value: 'ke', label: 'Kenya' },
    { value: 'ma', label: 'Morocco' },
    { value: 'other', label: 'Other African Country' }
  ];

  volumeOptions = [
    { value: 'low', label: 'Low (< 1,000 requests/month)' },
    { value: 'medium', label: 'Medium (1,000 - 10,000 requests/month)' },
    { value: 'high', label: 'High (10,000 - 100,000 requests/month)' },
    { value: 'enterprise', label: 'Enterprise (> 100,000 requests/month)' }
  ];

  timelineOptions = [
    { value: 'immediate', label: 'Immediate (< 1 week)' },
    { value: 'short', label: 'Short-term (1-4 weeks)' },
    { value: 'medium', label: 'Medium-term (1-3 months)' },
    { value: 'long', label: 'Long-term (3+ months)' }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  submitAPIRequest(): void {
    console.log('API Key Request:', this.apiKeyRequest);
    // TODO: Implement API key request submission
    alert('API key request submitted! We will contact you within 24 hours.');
    this.resetForm();
  }

  resetForm(): void {
    this.apiKeyRequest = {
      organizationName: '',
      contactName: '',
      email: '',
      phone: '',
      organizationType: '',
      country: '',
      useCase: '',
      expectedVolume: '',
      integrationTimeline: '',
      technicalContact: '',
      message: ''
    };
  }

  getMethodClass(method: string): string {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-800';
      case 'POST':
        return 'bg-blue-100 text-blue-800';
      case 'PUT':
        return 'bg-orange-100 text-orange-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  copyEndpoint(endpoint: string): void {
    navigator.clipboard.writeText(`https://api.africanmedicalregistry.com${endpoint}`);
    // Show toast notification
    this.showToast('Endpoint copied to clipboard!');
  }

  showToast(message: string): void {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg bg-green-100 text-green-800 border border-green-200 transition-all duration-300 transform translate-x-full';
    
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <i class="ri-check-line"></i>
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
}