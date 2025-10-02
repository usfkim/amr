import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EcosystemNode {
  id: string;
  name: string;
  type: 'government' | 'hospital' | 'university' | 'embassy' | 'regulator' | 'country';
  status: 'active' | 'pending' | 'integration' | 'planning';
  country?: string;
  connections: string[];
  apiEndpoint?: string;
  lastSync?: string;
}

@Component({
  selector: 'app-ecosystem-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ecosystem-container bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border border-blue-200/50 dark:border-slate-700">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ title }}</h3>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-sm font-medium text-green-600 dark:text-green-400">Live Network</span>
        </div>
      </div>
      
      <div class="ecosystem-network relative h-64 overflow-hidden rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <!-- Network Visualization -->
        <svg class="absolute inset-0 w-full h-full">
          <!-- Connection Lines -->
          <g class="connections">
            <line *ngFor="let connection of networkConnections" 
                  [attr.x1]="connection.x1" [attr.y1]="connection.y1"
                  [attr.x2]="connection.x2" [attr.y2]="connection.y2"
                  class="connection-line stroke-blue-400 dark:stroke-blue-300 stroke-2 opacity-60"
                  stroke-dasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
            </line>
          </g>
        </svg>
        
        <!-- Network Nodes -->
        <div *ngFor="let node of ecosystemNodes; let i = index" 
             class="ecosystem-node absolute"
             [style.left.%]="getNodePosition(i).x"
             [style.top.%]="getNodePosition(i).y">
          <div [class]="'node-container w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 hover:scale-125 cursor-pointer ' + getNodeClass(node.type, node.status)"
               [title]="node.name + ' - ' + node.status">
            <i [class]="getNodeIcon(node.type) + ' text-white'"></i>
          </div>
          <div class="node-label absolute top-14 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
            {{ node.name }}
          </div>
        </div>
      </div>
      
      <!-- Integration Status -->
      <div class="mt-6 grid grid-cols-2 gap-4">
        <div class="text-center p-3 bg-white/70 dark:bg-slate-800/70 rounded-lg backdrop-blur-sm">
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ getActiveNodes() }}</div>
          <div class="text-xs text-gray-600 dark:text-gray-400">Active Integrations</div>
        </div>
        <div class="text-center p-3 bg-white/70 dark:bg-slate-800/70 rounded-lg backdrop-blur-sm">
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ getPendingNodes() }}</div>
          <div class="text-xs text-gray-600 dark:text-gray-400">Pending Integrations</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./ecosystem-widget.component.css']
})
export class EcosystemWidgetComponent implements OnInit {
  @Input() title = 'AMR Ecosystem Network';
  @Input() showCountries = true;
  @Input() showInstitutions = true;

  ecosystemNodes: EcosystemNode[] = [
    { id: '1', name: 'Ghana MoH', type: 'government', status: 'active', country: 'Ghana', connections: ['2', '3'] },
    { id: '2', name: 'Korle Bu Hospital', type: 'hospital', status: 'active', country: 'Ghana', connections: ['1', '4'] },
    { id: '3', name: 'University of Ghana', type: 'university', status: 'active', country: 'Ghana', connections: ['1', '5'] },
    { id: '4', name: 'Nigeria MDCN', type: 'regulator', status: 'integration', country: 'Nigeria', connections: ['2', '6'] },
    { id: '5', name: 'Ghana Embassy UK', type: 'embassy', status: 'active', country: 'Ghana', connections: ['3', '7'] },
    { id: '6', name: 'Lagos University', type: 'university', status: 'pending', country: 'Nigeria', connections: ['4'] },
    { id: '7', name: 'South Africa DoH', type: 'government', status: 'planning', country: 'South Africa', connections: ['5'] }
  ];

  networkConnections: any[] = [];

  ngOnInit(): void {
    this.generateNetworkConnections();
  }

  generateNetworkConnections(): void {
    this.networkConnections = [];
    this.ecosystemNodes.forEach((node, index) => {
      node.connections.forEach(connectionId => {
        const targetIndex = this.ecosystemNodes.findIndex(n => n.id === connectionId);
        if (targetIndex !== -1) {
          const sourcePos = this.getNodePosition(index);
          const targetPos = this.getNodePosition(targetIndex);
          this.networkConnections.push({
            x1: sourcePos.x * 2.56, // Convert percentage to SVG coordinates
            y1: sourcePos.y * 2.56,
            x2: targetPos.x * 2.56,
            y2: targetPos.y * 2.56
          });
        }
      });
    });
  }

  getNodePosition(index: number): { x: number, y: number } {
    const positions = [
      { x: 20, y: 20 }, { x: 50, y: 15 }, { x: 80, y: 25 },
      { x: 15, y: 50 }, { x: 45, y: 45 }, { x: 75, y: 55 },
      { x: 30, y: 75 }, { x: 65, y: 80 }
    ];
    return positions[index] || { x: 50, y: 50 };
  }

  getNodeClass(type: string, status: string): string {
    const baseClass = 'border-2 ';
    const typeClass = {
      'government': 'bg-blue-500 border-blue-400',
      'hospital': 'bg-green-500 border-green-400',
      'university': 'bg-purple-500 border-purple-400',
      'embassy': 'bg-orange-500 border-orange-400',
      'regulator': 'bg-red-500 border-red-400',
      'country': 'bg-indigo-500 border-indigo-400'
    };
    
    const statusEffect = {
      'active': 'animate-pulse shadow-lg',
      'pending': 'opacity-75',
      'integration': 'animate-bounce',
      'planning': 'opacity-50'
    };
    
    return baseClass + typeClass[type as keyof typeof typeClass] + ' ' + statusEffect[status as keyof typeof statusEffect];
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

  getActiveNodes(): number {
    return this.ecosystemNodes.filter(node => node.status === 'active').length;
  }

  getPendingNodes(): number {
    return this.ecosystemNodes.filter(node => node.status === 'pending' || node.status === 'integration').length;
  }
}