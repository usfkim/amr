import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface CPDCourse {
  id: string;
  title: string;
  provider: string;
  category: string;
  credits: number;
  duration: string;
  format: 'online' | 'in-person' | 'hybrid';
  price: number;
  rating: number;
  enrolled: number;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  status: 'available' | 'full' | 'upcoming';
}

interface CompletedCourse {
  id: string;
  title: string;
  provider: string;
  credits: number;
  completionDate: string;
  certificateUrl: string;
  grade: string;
}

@Component({
  selector: 'app-cpd',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './cpd.component.html',
  styleUrl: './cpd.component.css'
})
export class CpdComponent implements OnInit {
  currentCredits = 15;
  requiredCredits = 30;
  progressPercentage = 50;
  
  activeTab = 'available';
  selectedCategory = 'all';
  selectedFormat = 'all';

  categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'clinical', label: 'Clinical Skills' },
    { value: 'research', label: 'Research & Evidence' },
    { value: 'ethics', label: 'Medical Ethics' },
    { value: 'technology', label: 'Medical Technology' },
    { value: 'leadership', label: 'Leadership & Management' }
  ];

  formats = [
    { value: 'all', label: 'All Formats' },
    { value: 'online', label: 'Online' },
    { value: 'in-person', label: 'In-Person' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  availableCourses: CPDCourse[] = [
    {
      id: '1',
      title: 'Advanced Cardiology: Latest Treatment Protocols',
      provider: 'Ghana Medical Association',
      category: 'clinical',
      credits: 5,
      duration: '8 hours',
      format: 'online',
      price: 150,
      rating: 4.8,
      enrolled: 234,
      description: 'Comprehensive course covering the latest advances in cardiology treatment protocols and patient management.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=240&fit=crop',
      startDate: '2025-02-15',
      endDate: '2025-02-22',
      status: 'available'
    },
    {
      id: '2',
      title: 'Medical Ethics in Modern Healthcare',
      provider: 'African Medical Council',
      category: 'ethics',
      credits: 3,
      duration: '6 hours',
      format: 'hybrid',
      price: 100,
      rating: 4.6,
      enrolled: 189,
      description: 'Explore contemporary ethical challenges in healthcare practice and decision-making.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=240&fit=crop',
      startDate: '2025-02-20',
      endDate: '2025-02-27',
      status: 'available'
    },
    {
      id: '3',
      title: 'Digital Health Technologies',
      provider: 'Tech Health Institute',
      category: 'technology',
      credits: 4,
      duration: '10 hours',
      format: 'online',
      price: 200,
      rating: 4.9,
      enrolled: 156,
      description: 'Learn about emerging digital health technologies and their implementation in clinical practice.',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=240&fit=crop',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      status: 'upcoming'
    }
  ];

  completedCourses: CompletedCourse[] = [
    {
      id: '1',
      title: 'Basic Life Support Certification',
      provider: 'Emergency Medicine Institute',
      credits: 2,
      completionDate: '2024-12-15',
      certificateUrl: '#',
      grade: 'A'
    },
    {
      id: '2',
      title: 'Infection Control in Healthcare Settings',
      provider: 'Public Health Academy',
      credits: 3,
      completionDate: '2024-11-20',
      certificateUrl: '#',
      grade: 'B+'
    },
    {
      id: '3',
      title: 'Patient Communication Skills',
      provider: 'Medical Communication Institute',
      credits: 2,
      completionDate: '2024-10-10',
      certificateUrl: '#',
      grade: 'A-'
    }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.calculateProgress();
  }

  calculateProgress(): void {
    this.progressPercentage = Math.round((this.currentCredits / this.requiredCredits) * 100);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  enrollInCourse(courseId: string): void {
    console.log('Enrolling in course:', courseId);
    // TODO: Implement enrollment logic
    alert('Enrollment functionality will be implemented with backend integration');
  }

  downloadCertificate(certificateUrl: string): void {
    console.log('Downloading certificate:', certificateUrl);
    // TODO: Implement certificate download
    alert('Certificate download functionality will be implemented');
  }

  getFilteredCourses(): CPDCourse[] {
    return this.availableCourses.filter(course => {
      const categoryMatch = this.selectedCategory === 'all' || course.category === this.selectedCategory;
      const formatMatch = this.selectedFormat === 'all' || course.format === this.selectedFormat;
      return categoryMatch && formatMatch;
    });
  }

  getFormatIcon(format: string): string {
    switch (format) {
      case 'online':
        return 'ri-computer-line';
      case 'in-person':
        return 'ri-building-line';
      case 'hybrid':
        return 'ri-global-line';
      default:
        return 'ri-book-line';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'full':
        return 'bg-red-100 text-red-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}