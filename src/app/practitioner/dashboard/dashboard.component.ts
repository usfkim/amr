import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface DashboardCard {
  title: string;
  description: string;
  icon: string;
  route: string;
  status: 'complete' | 'pending' | 'action-required' | 'not-started';
  progress?: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  practitionerName = 'Dr. Sarah Mensah';
  licenseNumber = 'MDC-GH-2024-1234';
  licenseStatus = 'Active';
  expiryDate = '2025-12-31';
  
  dashboardCards: DashboardCard[] = [
    {
      title: 'Registration Status',
      description: 'Your professional registration is active',
      icon: 'ri-shield-check-line',
      route: '/practitioner/registration',
      status: 'complete',
      progress: 100
    },
    {
      title: 'License Renewal',
      description: 'Renew your license before expiry',
      icon: 'ri-refresh-line',
      route: '/practitioner/renewal',
      status: 'action-required',
      progress: 0
    },
    {
      title: 'CPD Credits',
      description: '15/30 credits completed this year',
      icon: 'ri-graduation-cap-line',
      route: '/practitioner/cpd',
      status: 'pending',
      progress: 50
    },
    {
      title: 'Digital ID',
      description: 'Manage your QR code and digital identity',
      icon: 'ri-qr-code-line',
      route: '/practitioner/id-management',
      status: 'complete',
      progress: 100
    },
    {
      title: 'Payments',
      description: 'View payment history and make payments',
      icon: 'ri-bank-card-line',
      route: '/practitioner/payments',
      status: 'not-started',
      progress: 0
    }
  ];

  recentActivities = [
    {
      title: 'CPD Course Completed',
      description: 'Advanced Cardiology Workshop',
      date: '2025-01-10',
      icon: 'ri-book-line',
      type: 'success'
    },
    {
      title: 'License Renewal Due',
      description: 'Renewal required by December 31, 2025',
      date: '2025-01-08',
      icon: 'ri-alert-line',
      type: 'warning'
    },
    {
      title: 'Profile Updated',
      description: 'Contact information updated successfully',
      date: '2025-01-05',
      icon: 'ri-user-line',
      type: 'info'
    }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'action-required':
        return 'bg-red-100 text-red-800';
      case 'not-started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getActivityTypeClass(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'warning':
        return 'bg-yellow-100 text-yellow-600';
      case 'info':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }
}