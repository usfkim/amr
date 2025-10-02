import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private document: Document
  ) {}

  updateSEO(data: SEOData): void {
    // Update title
    this.title.setTitle(data.title);

    // Update meta tags
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ name: 'keywords', content: data.keywords || '' });
    this.meta.updateTag({ name: 'author', content: data.author || 'African Medical Registry' });

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:type', content: data.type || 'website' });
    this.meta.updateTag({ property: 'og:url', content: data.url || '' });
    this.meta.updateTag({ property: 'og:image', content: data.image || '/assets/images/amr-og-default.jpg' });
    this.meta.updateTag({ property: 'og:site_name', content: 'African Medical Registry' });

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: data.image || '/assets/images/amr-twitter-card.jpg' });

    // Article specific tags
    if (data.publishedTime) {
      this.meta.updateTag({ property: 'article:published_time', content: data.publishedTime });
    }
    if (data.modifiedTime) {
      this.meta.updateTag({ property: 'article:modified_time', content: data.modifiedTime });
    }

    // Schema.org structured data
    this.updateStructuredData(data);
  }

  private updateStructuredData(data: SEOData): void {
    // Remove existing structured data
    const existingScript = this.document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create new structured data
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'African Medical Registry',
      description: data.description,
      url: 'https://africanmedicalregistry.com',
      logo: 'https://africanmedicalregistry.com/assets/images/amr-logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+233-302-123-456',
        contactType: 'customer service',
        email: 'info@africanmedicalregistry.com'
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '21 Busia Crescent, Ambassadorial Enclave',
        addressLocality: 'East Legon',
        addressRegion: 'Greater Accra',
        addressCountry: 'Ghana'
      },
      sameAs: [
        'https://linkedin.com/company/african-medical-registry',
        'https://twitter.com/amr_africa'
      ]
    };

    script.textContent = JSON.stringify(structuredData);
    this.document.head.appendChild(script);
  }

  updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}