import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TrustMetric {
  label: string;
  value: string;
  icon: string;
  status: 'excellent' | 'good' | 'warning';
  description: string;
}

interface EcosystemNode {
  id: string;
  name: string;
  type: 'government' | 'hospital' | 'university' | 'embassy' | 'regulator' | 'country' | string;
  status: 'active' | 'pending' | 'integration' | 'planning' | string;
  connections: string[];
}

@Component({
  selector: 'app-trust-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="trust-badge-container">
      <!-- Main Trust Badge -->
      <div class="trust-badge glass rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center animate-trust-pulse">
              <i class="ri-shield-check-line text-white text-xl"></i>
            </div>
            <div>
              <h3 class="font-bold text-white">{{ badgeTitle }}</h3>
              <p class="text-white/80 text-sm">{{ badgeSubtitle }}</p>
            </div>
          </div>
          <div class="trust-score text-right">
            <div class="text-2xl font-black text-white">{{ trustScore }}%</div>
            <div class="text-white/80 text-xs">Trust Score</div>
          </div>
        </div>
        
        <!-- Trust Metrics Grid -->
        <div class="grid grid-cols-2 gap-3">
          <div *ngFor="let metric of trustMetrics" 
               class="trust-metric bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300">
            <div class="flex items-center gap-2 mb-1">
              <i [class]="metric.icon + ' text-white text-sm'"></i>
              <span class="text-white text-xs font-medium">{{ metric.label }}</span>
            </div>
            <div [class]="'text-lg font-bold ' + getMetricColor(metric.status)">{{ metric.value }}</div>
          </div>
        </div>
        
        <!-- Certification Badges -->
        <div class="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-white/20">
          <div class="certification-badge" title="ISO 27001 Certified">
            <i class="ri-shield-star-line text-white text-sm"></i>
          </div>
          <div class="certification-badge" title="GDPR Compliant">
            <i class="ri-global-line text-white text-sm"></i>
          </div>
          <div class="certification-badge" title="WHO Aligned">
            <i class="ri-heart-pulse-line text-white text-sm"></i>
          </div>
          <div class="certification-badge" title="AU Certified">
            <i class="ri-flag-line text-white text-sm"></i>
          </div>
        </div>
      </div>
      
      <!-- Integration Status -->
      <div class="integration-status mt-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
        <div class="flex items-center justify-between mb-3">
          <h4 class="font-semibold text-gray-900 dark:text-white">Integration Ready</h4>
          <span class="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium">
            API v2.1
          </span>
        </div>
        <div class="grid grid-cols-4 gap-2">
          <div class="integration-type text-center p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:scale-105 transition-transform">
            <i class="ri-government-line text-blue-600 dark:text-blue-400 text-lg"></i>
            <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Gov</div>
          </div>
          <div class="integration-type text-center p-2 bg-green-50 dark:bg-green-900/30 rounded-lg hover:scale-105 transition-transform">
            <i class="ri-hospital-line text-green-600 dark:text-green-400 text-lg"></i>
            <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Hospital</div>
          </div>
          <div class="integration-type text-center p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:scale-105 transition-transform">
            <i class="ri-school-line text-purple-600 dark:text-purple-400 text-lg"></i>
            <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">University</div>
          </div>
          <div class="integration-type text-center p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg hover:scale-105 transition-transform">
            <i class="ri-building-line text-orange-600 dark:text-orange-400 text-lg"></i>
            <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Embassy</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./trust-badge.component.css']
})
export class TrustBadgeComponent implements OnInit {
  @Input() badgeTitle = 'AMR Trust Network';
  @Input() badgeSubtitle = 'Verified & Secure';
  @Input() trustScore = 99;
  @Input() showIntegrations = true;

  trustMetrics: TrustMetric[] = [
    { label: 'Uptime', value: '99.9%', icon: 'ri-time-line', status: 'excellent', description: 'System availability' },
    { label: 'Security', value: 'A+', icon: 'ri-shield-line', status: 'excellent', description: 'Security rating' },
    { label: 'Accuracy', value: '99.8%', icon: 'ri-check-line', status: 'excellent', description: 'Verification accuracy' },
    { label: 'Speed', value: '<2s', icon: 'ri-flashlight-line', status: 'excellent', description: 'Response time' }
  ];

  ecosystemNodes: EcosystemNode[] = [
    { id: '1', name: 'Ghana MoH', type: 'government', status: 'active', connections: ['2', '3'] },
    { id: '2', name: 'Hospitals', type: 'hospital', status: 'active', connections: ['1', '4'] },
    { id: '3', name: 'Universities', type: 'university', status: 'active', connections: ['1', '5'] },
    { id: '4', name: 'Regulators', type: 'regulator', status: 'integration', connections: ['2'] },
    { id: '5', name: 'Embassies', type: 'embassy', status: 'active', connections: ['3'] }
  ];

  networkConnections: any[] = [];

  ngOnInit(): void {
    this.generateNetworkConnections();
  }

  generateNetworkConnections(): void {
    // Generate connection lines between nodes
    this.networkConnections = [
      { x1: 20, y1: 30, x2: 50, y2: 25 },
      { x1: 50, y1: 25, x2: 80, y2: 35 },
      { x1: 20, y1: 30, x2: 30, y2: 70 },
      { x1: 80, y1: 35, x2: 70, y2: 75 }
    ];
  }

  getNodePosition(index: number): { x: number, y: number } {
    const positions = [
      { x: 20, y: 30 }, { x: 50, y: 25 }, { x: 80, y: 35 },
      { x: 30, y: 70 }, { x: 70, y: 75 }
    ];
    return positions[index] || { x: 50, y: 50 };
  }

  getNodeClass(type: string, status: string): string {
    const typeColors = {
      'government': 'bg-blue-500 border-blue-400',
      'hospital': 'bg-green-500 border-green-400',
      'university': 'bg-purple-500 border-purple-400',
      'embassy': 'bg-orange-500 border-orange-400',
      'regulator': 'bg-red-500 border-red-400',
      'country': 'bg-indigo-500 border-indigo-400'
    };
    
    const statusEffects = {
      'active': 'animate-pulse shadow-lg',
      'pending': 'opacity-75',
      'integration': 'animate-bounce',
      'planning': 'opacity-50'
    };
    
    return typeColors[type as keyof typeof typeColors] + ' ' + statusEffects[status as keyof typeof statusEffects];
  }

  getNodeIcon(type: string): string {
    const icons = {
      'government': 'ri-government-line',
      'hospital': 'ri-hospital-line',
      'university': 'ri-school-line',
      'embassy': 'ri-building-line',
      'regulator': 'ri-shield-check-line',
      'country': 'ri-map-pin-line'
    };
    return icons[type as keyof typeof icons] || 'ri-circle-line';
  }

  getMetricColor(status: string): string {
    const colors = {
      'excellent': 'text-green-300',
      'good': 'text-blue-300',
      'warning': 'text-yellow-300'
    };
    return colors[status as keyof typeof colors] || 'text-white';
  }

  getActiveNodes(): number {
    return this.ecosystemNodes.filter(node => node.status === 'active').length;
  }

  getPendingNodes(): number {
    return this.ecosystemNodes.filter(node => node.status === 'pending' || node.status === 'integration').length;
  }
}