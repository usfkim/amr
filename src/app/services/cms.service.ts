import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

interface CMSContent {
  id: string;
  type: 'press' | 'case_study' | 'country_info' | 'page_content';
  title: string;
  content: string;
  excerpt?: string;
  author?: string;
  publishDate: string;
  lastModified: string;
  status: 'published' | 'draft' | 'archived';
  metadata: {
    seoTitle?: string;
    seoDescription?: string;
    featuredImage?: string;
    tags?: string[];
    country?: string;
    category?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  
  // Mock CMS content - ready for Contentful/Strapi integration
  private mockContent: CMSContent[] = [
    {
      id: 'press-ghana-launch',
      type: 'press',
      title: 'Ghana Medical Registry Officially Launches',
      content: 'Full article content here...',
      excerpt: 'The Ghana Medical Registry (GMR) goes live in partnership with the Medical and Dental Council.',
      author: 'AMR Communications',
      publishDate: '2025-01-15T00:00:00Z',
      lastModified: '2025-01-15T10:30:00Z',
      status: 'published',
      metadata: {
        seoTitle: 'Ghana Medical Registry Launch - African Medical Registry',
        seoDescription: 'Ghana becomes the first country to fully deploy AMR with 15,000+ verified practitioners.',
        featuredImage: '/assets/images/ghana-launch.jpg',
        tags: ['Ghana', 'Launch', 'Medical Council'],
        country: 'gh',
        category: 'launch'
      }
    },
    {
      id: 'case-study-ghana-fraud',
      type: 'case_study',
      title: 'Ghana: Eliminating Medical Fraud Through Digital Verification',
      content: 'Detailed case study content...',
      excerpt: 'How Ghana reduced medical fraud by 98% using AMR verification.',
      publishDate: '2025-01-10T00:00:00Z',
      lastModified: '2025-01-10T15:20:00Z',
      status: 'published',
      metadata: {
        seoTitle: 'Ghana Medical Fraud Elimination Case Study - AMR',
        seoDescription: 'Learn how Ghana eliminated 98% of medical fraud using AMR digital verification.',
        featuredImage: '/assets/images/ghana-case-study.jpg',
        tags: ['Ghana', 'Fraud Prevention', 'Case Study'],
        country: 'gh',
        category: 'impact'
      }
    }
  ];

  constructor() {}

  getContent(type?: string, country?: string): Observable<CMSContent[]> {
    let filteredContent = this.mockContent;
    
    if (type) {
      filteredContent = filteredContent.filter(content => content.type === type);
    }
    
    if (country) {
      filteredContent = filteredContent.filter(content => 
        content.metadata.country === country || !content.metadata.country
      );
    }
    
    return of(filteredContent.filter(content => content.status === 'published')).pipe(delay(500));
  }

  getContentById(id: string): Observable<CMSContent | null> {
    const content = this.mockContent.find(c => c.id === id && c.status === 'published');
    return of(content || null).pipe(delay(300));
  }

  searchContent(query: string): Observable<CMSContent[]> {
    const results = this.mockContent.filter(content => 
      content.status === 'published' && (
        content.title.toLowerCase().includes(query.toLowerCase()) ||
        content.excerpt?.toLowerCase().includes(query.toLowerCase()) ||
        content.metadata.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
    );
    
    return of(results).pipe(delay(400));
  }

  // Ready for headless CMS integration
  async syncWithCMS(): Promise<void> {
    // TODO: Implement Contentful/Strapi sync
    console.log('CMS sync ready for implementation');
  }
}