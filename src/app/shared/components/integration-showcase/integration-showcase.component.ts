import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface IntegrationPartner {
  id: string;
  name: string;
  type: 'government' | 'hospital' | 'university' | 'embassy' | 'regulator' | 'international';
  country: string;
  logo: string;
  status: 'integrated' | 'pilot' | 'planning' | 'negotiating';
  apiVersion: string;
  lastSync: string;
  features: string[];
}

@Component({
  selector: 'app-integration-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="integration-showcase bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-xl">
      <div class="text-center mb-8">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ title }}</h3>
        <p class="text-gray-600 dark:text-gray-300">{{ subtitle }}</p>
      </div>
      
      <!-- Integration Grid -->
      <div class="integration-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div *ngFor="let partner of integrationPartners" 
             class="integration-card bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-xl p-4 border border-gray-200 dark:border-slate-600 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div class="flex items-center justify-between mb-3">
            <div [class]="'w-8 h-8 rounded-lg flex items-center justify-center ' + getPartnerTypeClass(partner.type)">
              <i [class]="getPartnerIcon(partner.type) + ' text-white text-sm'"></i>
            </div>
            <div [class]="'status-dot w-3 h-3 rounded-full ' + getStatusClass(partner.status)"></div>
          </div>
          <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-1">{{ partner.name }}</h4>
          <p class="text-xs text-gray-600 dark:text-gray-400">{{ partner.country }}</p>
          <div class="mt-2 text-xs text-gray-500 dark:text-gray-500">
            API {{ partner.apiVersion }}
          </div>
        </div>
      </div>
      
      <!-- API Integration Status -->
      <div class="api-status bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50">
        <div class="flex items-center justify-between mb-4">
          <h4 class="font-bold text-gray-900 dark:text-white">API Integration Status</h4>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-green-600 dark:text-green-400">All Systems Operational</span>
          </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="api-metric text-center p-3 bg-white/70 dark:bg-slate-800/70 rounded-lg backdrop-blur-sm">
            <div class="text-lg font-bold text-blue-600 dark:text-blue-400">99.9%</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Uptime</div>
          </div>
          <div class="api-metric text-center p-3 bg-white/70 dark:bg-slate-800/70 rounded-lg backdrop-blur-sm">
            <div class="text-lg font-bold text-green-600 dark:text-green-400">&lt;200ms</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Response Time</div>
          </div>
          <div class="api-metric text-center p-3 bg-white/70 dark:bg-slate-800/70 rounded-lg backdrop-blur-sm">
            <div class="text-lg font-bold text-purple-600 dark:text-purple-400">256-bit</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Encryption</div>
          </div>
          <div class="api-metric text-center p-3 bg-white/70 dark:bg-slate-800/70 rounded-lg backdrop-blur-sm">
            <div class="text-lg font-bold text-orange-600 dark:text-orange-400">24/7</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Monitoring</div>
          </div>
        </div>
      </div>
      
      <!-- Integration Capabilities -->
      <div class="integration-capabilities mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="capability-card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <i class="ri-code-line text-white text-sm"></i>
            </div>
            <h5 class="font-semibold text-blue-900 dark:text-blue-100">RESTful APIs</h5>
          </div>
          <p class="text-blue-800 dark:text-blue-200 text-sm">Complete REST API suite for seamless integration</p>
        </div>
        
        <div class="capability-card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-4 border border-green-200 dark:border-green-800">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <i class="ri-webhook-line text-white text-sm"></i>
            </div>
            <h5 class="font-semibold text-green-900 dark:text-green-100">Webhooks</h5>
          </div>
          <p class="text-green-800 dark:text-green-200 text-sm">Real-time notifications and data synchronization</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./integration-showcase.component.css']
})
export class IntegrationShowcaseComponent {
  @Input() title = 'Global Integration Network';
  @Input() subtitle = 'Seamlessly connecting healthcare ecosystems across Africa';

  integrationPartners: IntegrationPartner[] = [
    {
      id: '1',
      name: 'Ghana MoH',
      type: 'government',
      country: 'Ghana',
      logo: '',
      status: 'integrated',
      apiVersion: 'v2.1',
      lastSync: '2025-01-15T10:30:00Z',
      features: ['Real-time sync', 'Bulk upload', 'Audit logs']
    },
    {
      id: '2',
      name: 'Korle Bu Hospital',
      type: 'hospital',
      country: 'Ghana',
      logo: '',
      status: 'integrated',
      apiVersion: 'v2.1',
      lastSync: '2025-01-15T10:25:00Z',
      features: ['Staff verification', 'Patient safety', 'Compliance']
    },
    {
      id: '3',
      name: 'University of Ghana',
      type: 'university',
      country: 'Ghana',
      logo: '',
      status: 'integrated',
      apiVersion: 'v2.0',
      lastSync: '2025-01-15T09:45:00Z',
      features: ['Graduate verification', 'Transcript validation']
    },
    {
      id: '4',
      name: 'Nigeria MDCN',
      type: 'regulator',
      country: 'Nigeria',
      logo: '',
      status: 'pilot',
      apiVersion: 'v2.1',
      lastSync: '2025-01-15T08:15:00Z',
      features: ['License validation', 'Disciplinary records']
    },
    {
      id: '5',
      name: 'Ghana Embassy UK',
      type: 'embassy',
      country: 'Ghana',
      logo: '',
      status: 'integrated',
      apiVersion: 'v1.9',
      lastSync: '2025-01-15T07:30:00Z',
      features: ['Visa verification', 'Professional mobility']
    },
    {
      id: '6',
      name: 'WHO Africa',
      type: 'international',
      country: 'Continental',
      logo: '',
      status: 'negotiating',
      apiVersion: 'v2.2',
      lastSync: '',
      features: ['Health workforce data', 'Regional standards']
    },
    {
      id: '7',
      name: 'South Africa DoH',
      type: 'government',
      country: 'South Africa',
      logo: '',
      status: 'planning',
      apiVersion: 'v2.1',
      lastSync: '',
      features: ['National registry', 'Cross-border verification']
    },
    {
      id: '8',
      name: 'Makerere University',
      type: 'university',
      country: 'Uganda',
      logo: '',
      status: 'pilot',
      apiVersion: 'v2.0',
      lastSync: '2025-01-14T16:20:00Z',
      features: ['Medical school integration', 'Graduate tracking']
    }
  ];

  getPartnerTypeClass(type: string): string {
    const classes = {
      'government': 'bg-blue-500',
      'hospital': 'bg-green-500',
      'university': 'bg-purple-500',
      'embassy': 'bg-orange-500',
      'regulator': 'bg-red-500',
      'international': 'bg-indigo-500'
    };
    return classes[type as keyof typeof classes] || 'bg-gray-500';
  }

  getPartnerIcon(type: string): string {
    const icons = {
      'government': 'ri-government-line',
      'hospital': 'ri-hospital-line',
      'university': 'ri-school-line',
      'embassy': 'ri-building-line',
      'regulator': 'ri-shield-check-line',
      'international': 'ri-global-line'
    };
    return icons[type as keyof typeof icons] || 'ri-circle-line';
  }

  getStatusClass(status: string): string {
    const classes = {
      'integrated': 'bg-green-500 animate-pulse',
      'pilot': 'bg-blue-500 animate-pulse',
      'planning': 'bg-yellow-500',
      'negotiating': 'bg-orange-500 animate-bounce'
    };
    return classes[status as keyof typeof classes] || 'bg-gray-500';
  }
}