import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: 'launch' | 'partnership' | 'media' | 'update' | 'policy';
  image: string;
  featured: boolean;
  readTime: number;
  tags: string[];
}

@Component({
  selector: 'app-press',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './press.component.html',
  styleUrl: './press.component.css'
})
export class PressComponent implements OnInit {
  selectedCategory = 'all';
  searchQuery = '';

  categories = [
    { value: 'all', label: 'All News' },
    { value: 'launch', label: 'Platform Launches' },
    { value: 'partnership', label: 'Partnerships' },
    { value: 'media', label: 'Media Coverage' },
    { value: 'update', label: 'System Updates' },
    { value: 'policy', label: 'Policy & Regulation' }
  ];

  newsPosts: NewsPost[] = [
    {
      id: '1',
      title: 'Ghana Medical Registry Officially Launches with 15,000+ Practitioners',
      excerpt: 'The Ghana Medical Registry (GMR) goes live in partnership with the Medical and Dental Council, Traditional Medicine Practice Council, and the Nursing and Midwifery Council.',
      content: 'Full article content here...',
      author: 'AMR Communications',
      publishDate: '2025-01-15',
      category: 'launch',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
      featured: true,
      readTime: 5,
      tags: ['Ghana', 'Launch', 'Medical Council', 'Milestone']
    },
    {
      id: '2',
      title: 'Nigeria Medical Registry Begins Pilot Integration with NAFDAC and MDCN',
      excerpt: 'Nigeria\'s AMR node begins onboarding via NAFDAC, MDCN, and allied health bodies. Full blockchain-based verification set to launch by Q4 2025.',
      content: 'Full article content here...',
      author: 'AMR Nigeria Team',
      publishDate: '2025-01-10',
      category: 'partnership',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
      featured: false,
      readTime: 4,
      tags: ['Nigeria', 'NAFDAC', 'MDCN', 'Pilot']
    },
    {
      id: '3',
      title: 'AMR Founder Speaks at African Investment Forum on Healthcare Innovation',
      excerpt: 'Dr. Williams Anarfi delivers keynote on "Manufacturing and Medical Innovation" highlighting AMR as a model for health trust infrastructure.',
      content: 'Full article content here...',
      author: 'Conrad Kakraba',
      publishDate: '2025-01-08',
      category: 'media',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
      featured: false,
      readTime: 3,
      tags: ['Speaking', 'Investment', 'Innovation', 'Leadership']
    },
    {
      id: '4',
      title: 'WHO Recognizes AMR as Leading Digital Health Initiative for Africa',
      excerpt: 'World Health Organization formally recognizes AMR as a leading digital health initiative for healthcare workforce mobility in Africa.',
      content: 'Full article content here...',
      author: 'AMR Global Relations',
      publishDate: '2025-01-05',
      category: 'policy',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      featured: true,
      readTime: 6,
      tags: ['WHO', 'Recognition', 'Digital Health', 'Africa']
    },
    {
      id: '5',
      title: 'AMR-X Medication Registry Phase 2 Development Begins',
      excerpt: 'Phase 2 of AMR — a continent-wide drug traceability system using QR code seals and FDA integration — to begin pilot in Ghana, Nigeria, and South Africa.',
      content: 'Full article content here...',
      author: 'AMR Development Team',
      publishDate: '2025-01-03',
      category: 'update',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop',
      featured: false,
      readTime: 4,
      tags: ['AMR-X', 'Medication', 'QR Codes', 'Phase 2']
    },
    {
      id: '6',
      title: 'East African Community Health Ministers Endorse AMR Framework',
      excerpt: 'East African Community health ministers formally endorse the AMR framework for regional healthcare professional mobility and verification.',
      content: 'Full article content here...',
      author: 'AMR East Africa',
      publishDate: '2024-12-28',
      category: 'partnership',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop',
      featured: false,
      readTime: 5,
      tags: ['EAC', 'Ministers', 'Framework', 'Regional']
    }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getFilteredPosts(): NewsPost[] {
    return this.newsPosts.filter(post => {
      const categoryMatch = this.selectedCategory === 'all' || post.category === this.selectedCategory;
      const searchMatch = this.searchQuery === '' || 
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()));
      
      return categoryMatch && searchMatch;
    });
  }

  getFeaturedPosts(): NewsPost[] {
    return this.newsPosts.filter(post => post.featured);
  }

  getRegularPosts(): NewsPost[] {
    return this.getFilteredPosts().filter(post => !post.featured);
  }

  getCategoryClass(category: string): string {
    const classes = {
      'launch': 'bg-green-100 text-green-800',
      'partnership': 'bg-blue-100 text-blue-800',
      'media': 'bg-purple-100 text-purple-800',
      'update': 'bg-orange-100 text-orange-800',
      'policy': 'bg-red-100 text-red-800'
    };
    return classes[category as keyof typeof classes] || 'bg-gray-100 text-gray-800';
  }

  getCategoryIcon(category: string): string {
    const icons = {
      'launch': 'ri-rocket-line',
      'partnership': 'ri-handshake-line',
      'media': 'ri-mic-line',
      'update': 'ri-refresh-line',
      'policy': 'ri-government-line'
    };
    return icons[category as keyof typeof icons] || 'ri-article-line';
  }

  readPost(postId: string): void {
    console.log('Reading post:', postId);
    // TODO: Navigate to full article or open modal
    alert('Full article view will be implemented');
  }
}