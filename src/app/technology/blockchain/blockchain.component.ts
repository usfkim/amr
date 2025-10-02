import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface BlockchainNode {
  id: string;
  name: string;
  type: 'council' | 'hospital' | 'government' | 'university';
  country: string;
  status: 'active' | 'syncing' | 'offline';
  lastBlock: number;
  transactions: number;
}

interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  practitioner: string;
  council: string;
  hash: string;
  verified: boolean;
}

@Component({
  selector: 'app-blockchain',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './blockchain.component.html',
  styleUrl: './blockchain.component.css'
})
export class BlockchainComponent implements OnInit, OnDestroy {
  private animationInterval?: number;
  
  blockchainNodes: BlockchainNode[] = [
    { id: '1', name: 'Ghana Medical Council', type: 'council', country: 'Ghana', status: 'active', lastBlock: 15847, transactions: 8500 },
    { id: '2', name: 'Nigeria MDCN', type: 'council', country: 'Nigeria', status: 'active', lastBlock: 15846, transactions: 12000 },
    { id: '3', name: 'Korle Bu Hospital', type: 'hospital', country: 'Ghana', status: 'syncing', lastBlock: 15845, transactions: 2300 },
    { id: '4', name: 'Egypt Medical Syndicate', type: 'council', country: 'Egypt', status: 'active', lastBlock: 15847, transactions: 4200 },
    { id: '5', name: 'University of Ghana', type: 'university', country: 'Ghana', status: 'active', lastBlock: 15847, transactions: 1800 },
    { id: '6', name: 'South Africa DoH', type: 'government', country: 'South Africa', status: 'syncing', lastBlock: 15844, transactions: 950 }
  ];

  recentAudits: AuditEntry[] = [
    { id: '1', timestamp: '2025-01-15T14:30:22Z', action: 'License Verified', practitioner: 'Dr. John Asante', council: 'Ghana MDC', hash: '0x7f9a...8b2c', verified: true },
    { id: '2', timestamp: '2025-01-15T14:29:18Z', action: 'Profile Updated', practitioner: 'Dr. Amina Hassan', council: 'Egypt Syndicate', hash: '0x3e4d...9f1a', verified: true },
    { id: '3', timestamp: '2025-01-15T14:28:45Z', action: 'License Renewed', practitioner: 'Dr. Chidi Okafor', council: 'Nigeria MDCN', hash: '0x8c2b...4e7f', verified: true },
    { id: '4', timestamp: '2025-01-15T14:27:33Z', action: 'Sanction Applied', practitioner: 'Dr. Sarah Mensah', council: 'Ghana MDC', hash: '0x1a5f...6d8e', verified: true },
    { id: '5', timestamp: '2025-01-15T14:26:12Z', action: 'New Registration', practitioner: 'Dr. Fatima Al-Rashid', council: 'Egypt Syndicate', hash: '0x9b3c...2a4f', verified: true }
  ];

  blockchainStats = {
    totalBlocks: 15847,
    totalTransactions: 29750,
    networkHashRate: '2.4 TH/s',
    averageBlockTime: '15 seconds',
    consensusAlgorithm: 'Proof of Authority',
    dataIntegrity: '100%'
  };

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.startBlockchainAnimation();
  }

  ngOnDestroy(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  startBlockchainAnimation(): void {
    this.animationInterval = window.setInterval(() => {
      // Simulate new blocks and transactions
      this.blockchainStats.totalBlocks += Math.floor(Math.random() * 3) + 1;
      this.blockchainStats.totalTransactions += Math.floor(Math.random() * 10) + 5;
      
      // Update node stats
      this.blockchainNodes.forEach(node => {
        if (node.status === 'active' && Math.random() > 0.7) {
          node.lastBlock = this.blockchainStats.totalBlocks;
          node.transactions += Math.floor(Math.random() * 5) + 1;
        }
      });
    }, 3000);
  }

  getNodeStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-green-500 animate-pulse';
      case 'syncing':
        return 'bg-yellow-500 animate-bounce';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }

  getNodeTypeIcon(type: string): string {
    switch (type) {
      case 'council':
        return 'ri-government-line';
      case 'hospital':
        return 'ri-hospital-line';
      case 'government':
        return 'ri-building-line';
      case 'university':
        return 'ri-school-line';
      default:
        return 'ri-circle-line';
    }
  }

  formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleTimeString();
  }
}