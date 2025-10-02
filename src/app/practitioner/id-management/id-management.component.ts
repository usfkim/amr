import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-id-management',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './id-management.component.html',
  styleUrl: './id-management.component.css'
})
export class IdManagementComponent implements OnInit {
  practitionerName = 'Dr. Sarah Mensah';
  licenseNumber = 'MDC-GH-2024-1234';
  qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=AMR-' + this.licenseNumber;
  
  digitalIdFeatures = [
    {
      title: 'QR Code Generation',
      description: 'Dynamic QR codes that update with your license status',
      icon: 'ri-qr-code-line',
      status: 'active'
    },
    {
      title: 'Digital Wallet',
      description: 'Store your credentials in mobile wallet apps',
      icon: 'ri-wallet-line',
      status: 'coming-soon'
    },
    {
      title: 'Offline Verification',
      description: 'Verify credentials without internet connection',
      icon: 'ri-wifi-off-line',
      status: 'coming-soon'
    },
    {
      title: 'Multi-Platform Access',
      description: 'Access your ID across all devices and platforms',
      icon: 'ri-devices-line',
      status: 'active'
    }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  downloadQRCode(): void {
    const link = document.createElement('a');
    link.href = this.qrCodeUrl;
    link.download = `AMR-QR-${this.licenseNumber}.png`;
    link.click();
  }

  shareDigitalId(): void {
    if (navigator.share) {
      navigator.share({
        title: 'My AMR Digital ID',
        text: `Verify my credentials: ${this.practitionerName}`,
        url: `https://africanmedicalregistry.com/verify/${this.licenseNumber}`
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`https://africanmedicalregistry.com/verify/${this.licenseNumber}`);
      alert('Digital ID link copied to clipboard!');
    }
  }

  regenerateQRCode(): void {
    console.log('Regenerating QR code...');
    // TODO: Implement QR code regeneration
    alert('QR code regenerated successfully!');
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'coming-soon':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }
}