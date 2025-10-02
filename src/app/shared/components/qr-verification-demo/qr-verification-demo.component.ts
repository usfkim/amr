import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface VerificationStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: 'pending' | 'processing' | 'completed';
  duration: number;
}

@Component({
  selector: 'app-qr-verification-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="qr-demo-container bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-8 text-white relative overflow-hidden">
      <!-- Background Animation -->
      <div class="absolute inset-0 opacity-20">
        <div class="blockchain-grid"></div>
      </div>
      
      <div class="relative z-10">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold mb-2">Live QR Verification Demo</h3>
          <p class="text-white/80">Watch real-time practitioner verification in action</p>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-8 items-center">
          <!-- QR Scanner Mockup -->
          <div class="qr-scanner-mockup">
            <div class="phone-frame bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-4 shadow-2xl">
              <div class="screen bg-black rounded-2xl p-4 relative overflow-hidden">
                <!-- QR Viewfinder -->
                <div class="qr-viewfinder relative mx-auto mb-4">
                  <div class="qr-pattern bg-white rounded-lg p-4 relative">
                    <!-- Animated QR Code Pattern -->
                    <div class="qr-dots grid grid-cols-8 gap-1">
                      <div *ngFor="let dot of qrDots; let i = index" 
                           [class]="'qr-dot w-2 h-2 rounded-sm transition-all duration-300 ' + (dot ? 'bg-black' : 'bg-transparent')"
                           [style.animation-delay]="i * 0.1 + 's'"></div>
                    </div>
                    
                    <!-- Scanning Line -->
                    <div class="scan-line absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-scan"></div>
                  </div>
                  
                  <!-- Corner Brackets -->
                  <div class="qr-corners absolute inset-0">
                    <div class="corner top-left"></div>
                    <div class="corner top-right"></div>
                    <div class="corner bottom-left"></div>
                    <div class="corner bottom-right"></div>
                  </div>
                </div>
                
                <!-- Verification Status -->
                <div class="verification-status text-center">
                  <div [class]="'status-indicator w-4 h-4 rounded-full mx-auto mb-2 ' + getStatusColor()"></div>
                  <div class="text-white text-sm font-medium">{{ currentStatus }}</div>
                  <div class="text-green-400 text-xs">{{ verificationMessage }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Verification Steps -->
          <div class="verification-steps space-y-4">
            <div *ngFor="let step of verificationSteps; let i = index" 
                 [class]="'verification-step flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ' + getStepClass(step.status)">
              <div [class]="'step-icon w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ' + getStepIconClass(step.status)">
                <i [class]="step.icon + ' text-xl'"></i>
              </div>
              <div class="flex-1">
                <h4 class="font-semibold">{{ step.title }}</h4>
                <p class="text-sm opacity-80">{{ step.description }}</p>
              </div>
              <div class="step-status">
                <i *ngIf="step.status === 'completed'" class="ri-check-line text-green-400 text-xl"></i>
                <i *ngIf="step.status === 'processing'" class="ri-loader-4-line text-blue-400 text-xl animate-spin"></i>
                <i *ngIf="step.status === 'pending'" class="ri-time-line text-gray-400 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Real-time Metrics -->
        <div class="metrics-bar mt-8 grid grid-cols-3 gap-4">
          <div class="metric text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
            <div class="text-2xl font-bold text-green-400">{{ verificationTime }}s</div>
            <div class="text-white/80 text-xs">Verification Time</div>
          </div>
          <div class="metric text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
            <div class="text-2xl font-bold text-blue-400">{{ accuracyRate }}%</div>
            <div class="text-white/80 text-xs">Accuracy Rate</div>
          </div>
          <div class="metric text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
            <div class="text-2xl font-bold text-purple-400">{{ blockchainConfirmations }}</div>
            <div class="text-white/80 text-xs">Blockchain Confirmations</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./qr-verification-demo.component.css']
})
export class QrVerificationDemoComponent implements OnInit, OnDestroy {
  currentStatus = 'Ready to Scan';
  verificationMessage = 'Position QR code in frame';
  verificationTime = 1.2;
  accuracyRate = 99.8;
  blockchainConfirmations = 6;
  
  private demoInterval?: number;
  private stepIndex = 0;

  qrDots = Array(64).fill(false).map(() => Math.random() > 0.6);

  verificationSteps: VerificationStep[] = [
    {
      id: 1,
      title: 'QR Code Detected',
      description: 'Scanning practitioner QR code',
      icon: 'ri-qr-scan-line',
      status: 'pending',
      duration: 1000
    },
    {
      id: 2,
      title: 'Blockchain Verification',
      description: 'Validating against distributed ledger',
      icon: 'ri-links-line',
      status: 'pending',
      duration: 2000
    },
    {
      id: 3,
      title: 'Regulatory Check',
      description: 'Cross-referencing with medical council',
      icon: 'ri-government-line',
      status: 'pending',
      duration: 1500
    },
    {
      id: 4,
      title: 'AI Fraud Detection',
      description: 'Machine learning validation complete',
      icon: 'ri-brain-line',
      status: 'pending',
      duration: 800
    },
    {
      id: 5,
      title: 'Verification Complete',
      description: 'Practitioner identity confirmed',
      icon: 'ri-shield-check-line',
      status: 'pending',
      duration: 500
    }
  ];

  ngOnInit(): void {
    this.startDemo();
  }

  ngOnDestroy(): void {
    if (this.demoInterval) {
      clearInterval(this.demoInterval);
    }
  }

  startDemo(): void {
    this.demoInterval = window.setInterval(() => {
      this.runVerificationDemo();
    }, 8000);
  }

  runVerificationDemo(): void {
    // Reset all steps
    this.verificationSteps.forEach(step => step.status = 'pending');
    this.stepIndex = 0;
    this.currentStatus = 'Scanning...';
    this.verificationMessage = 'QR code detected';

    // Process each step
    this.processNextStep();
  }

  processNextStep(): void {
    if (this.stepIndex < this.verificationSteps.length) {
      const currentStep = this.verificationSteps[this.stepIndex];
      currentStep.status = 'processing';
      
      setTimeout(() => {
        currentStep.status = 'completed';
        this.stepIndex++;
        
        if (this.stepIndex < this.verificationSteps.length) {
          this.processNextStep();
        } else {
          this.currentStatus = 'Verified ✓';
          this.verificationMessage = 'Dr. Sarah Mensah - Active License';
        }
      }, currentStep.duration);
    }
  }

  getStatusColor(): string {
    if (this.currentStatus.includes('Verified')) return 'bg-green-500 animate-pulse';
    if (this.currentStatus.includes('Scanning')) return 'bg-blue-500 animate-pulse';
    return 'bg-gray-500';
  }

  getStepClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 border border-green-500/30';
      case 'processing':
        return 'bg-blue-500/20 border border-blue-500/30 animate-pulse';
      default:
        return 'bg-white/10 border border-white/20';
    }
  }

  getStepIconClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'processing':
        return 'bg-blue-500 text-white animate-pulse';
      default:
        return 'bg-white/20 text-white/60';
    }
  }
}