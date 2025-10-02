import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface PaymentHistory {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  method: string;
  reference: string;
}

interface PendingPayment {
  id: string;
  type: string;
  description: string;
  amount: number;
  currency: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {
  activeTab = 'pending';
  selectedPayment: PendingPayment | null = null;
  showPaymentModal = false;
  
  paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'ri-bank-card-line' },
    { id: 'mobile', name: 'Mobile Money', icon: 'ri-smartphone-line' },
    { id: 'bank', name: 'Bank Transfer', icon: 'ri-bank-line' }
  ];

  selectedPaymentMethod = 'card';

  pendingPayments: PendingPayment[] = [
    {
      id: '1',
      type: 'License Renewal',
      description: '2025 Annual License Renewal Fee',
      amount: 250,
      currency: 'USD',
      dueDate: '2025-03-31',
      priority: 'high'
    },
    {
      id: '2',
      type: 'CPD Course',
      description: 'Advanced Cardiology Course',
      amount: 150,
      currency: 'USD',
      dueDate: '2025-02-15',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'Registration Fee',
      description: 'Digital ID Card Replacement',
      amount: 25,
      currency: 'USD',
      dueDate: '2025-02-28',
      priority: 'low'
    }
  ];

  paymentHistory: PaymentHistory[] = [
    {
      id: '1',
      date: '2024-12-15',
      description: 'CPD Course - Basic Life Support',
      amount: 100,
      currency: 'USD',
      status: 'completed',
      method: 'Credit Card',
      reference: 'PAY-2024-001'
    },
    {
      id: '2',
      date: '2024-11-20',
      description: 'Annual Registration Fee',
      amount: 200,
      currency: 'USD',
      status: 'completed',
      method: 'Mobile Money',
      reference: 'PAY-2024-002'
    },
    {
      id: '3',
      date: '2024-10-10',
      description: 'Digital Certificate Fee',
      amount: 15,
      currency: 'USD',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'PAY-2024-003'
    },
    {
      id: '4',
      date: '2024-09-05',
      description: 'License Verification Fee',
      amount: 50,
      currency: 'USD',
      status: 'failed',
      method: 'Credit Card',
      reference: 'PAY-2024-004'
    }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  openPaymentModal(payment: PendingPayment): void {
    this.selectedPayment = payment;
    this.showPaymentModal = true;
  }

  closePaymentModal(): void {
    this.showPaymentModal = false;
    this.selectedPayment = null;
  }

  processPayment(): void {
    if (this.selectedPayment) {
      console.log('Processing payment:', this.selectedPayment, 'Method:', this.selectedPaymentMethod);
      // TODO: Implement payment processing
      alert('Payment processing functionality will be implemented with backend integration');
      this.closePaymentModal();
    }
  }

  downloadReceipt(paymentId: string): void {
    console.log('Downloading receipt for payment:', paymentId);
    // TODO: Implement receipt download
    alert('Receipt download functionality will be implemented');
  }

  retryPayment(paymentId: string): void {
    console.log('Retrying payment:', paymentId);
    // TODO: Implement payment retry
    alert('Payment retry functionality will be implemented');
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
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

  getTotalPending(): number {
    return this.pendingPayments.reduce((total, payment) => total + payment.amount, 0);
  }

  getDaysUntilDue(dueDate: string | undefined): number {
    if (!dueDate) return 0;
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}