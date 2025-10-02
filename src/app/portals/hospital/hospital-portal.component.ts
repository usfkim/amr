import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface StaffMember {
  id: string;
  name: string;
  profession: string;
  licenseNumber: string;
  status: 'verified' | 'pending' | 'expired' | 'suspended';
  department: string;
  hireDate: string;
  lastVerified: string;
  photo: string;
}

interface VerificationRequest {
  id: string;
  candidateName: string;
  position: string;
  licenseNumber: string;
  submittedBy: string;
  submittedDate: string;
  status: 'pending' | 'verified' | 'rejected';
  priority: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-hospital-portal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './hospital-portal.component.html',
  styleUrl: './hospital-portal.component.css'
})
export class HospitalPortalComponent implements OnInit {
  activeTab = 'dashboard';
  hospitalName = 'Korle Bu Teaching Hospital';
  totalStaff = 2847;
  verifiedStaff = 2831;
  pendingVerifications = 16;
  
  staffMembers: StaffMember[] = [
    {
      id: '1',
      name: 'Dr. Sarah Mensah',
      profession: 'Cardiologist',
      licenseNumber: 'MDC-GH-2024-1234',
      status: 'verified',
      department: 'Cardiology',
      hireDate: '2023-03-15',
      lastVerified: '2025-01-10',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Nurse Jane Asante',
      profession: 'Registered Nurse',
      licenseNumber: 'NMC-GH-2024-5678',
      status: 'verified',
      department: 'Emergency',
      hireDate: '2022-08-20',
      lastVerified: '2025-01-08',
      photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Dr. Michael Osei',
      profession: 'Surgeon',
      licenseNumber: 'MDC-GH-2024-9012',
      status: 'pending',
      department: 'Surgery',
      hireDate: '2025-01-01',
      lastVerified: '2024-12-15',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face'
    }
  ];

  verificationRequests: VerificationRequest[] = [
    {
      id: '1',
      candidateName: 'Dr. Emmanuel Kwame',
      position: 'Emergency Physician',
      licenseNumber: 'MDC-GH-2025-3456',
      submittedBy: 'HR Department',
      submittedDate: '2025-01-14',
      status: 'pending',
      priority: 'high'
    },
    {
      id: '2',
      candidateName: 'Nurse Grace Adjei',
      position: 'ICU Nurse',
      licenseNumber: 'NMC-GH-2025-7890',
      submittedBy: 'ICU Manager',
      submittedDate: '2025-01-13',
      status: 'pending',
      priority: 'medium'
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
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  verifyStaff(staffId: string): void {
    console.log('Verifying staff:', staffId);
    // TODO: Implement staff verification API call
    alert('Staff verification initiated');
  }

  approveRequest(requestId: string): void {
    const request = this.verificationRequests.find(r => r.id === requestId);
    if (request) {
      request.status = 'verified';
      alert('Verification request approved');
    }
  }

  rejectRequest(requestId: string): void {
    const request = this.verificationRequests.find(r => r.id === requestId);
    if (request) {
      request.status = 'rejected';
      alert('Verification request rejected');
    }
  }

  getVerificationRate(): number {
    return Math.round((this.verifiedStaff / this.totalStaff) * 100);
  }
}