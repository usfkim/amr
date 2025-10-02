import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from 'side-components';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DirectivesModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  showMenu = false;
  isScrolled = false;
  isHeaderVisible = true;
  lastScrollTop = 0;
  isDarkMode = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Header visibility logic
    if (scrollTop > this.lastScrollTop && scrollTop > 100) {
      // Scrolling down & past threshold
      this.isHeaderVisible = false;
    } else {
      // Scrolling up or at top
      this.isHeaderVisible = true;
    }
    
    // Background blur effect
    this.isScrolled = scrollTop > 50;
    
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  toggle() {
    this.showMenu = !this.showMenu;
    
    // Prevent body scroll when menu is open
    if (isPlatformBrowser(this.platformId)) {
      if (this.showMenu) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }

  toggleTheme() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Add smooth transition
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 300);
  }

  private initializeTheme() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      this.isDarkMode = systemPrefersDark;
    }
    
    const theme = this.isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.isDarkMode = e.matches;
        document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
      }
    });
  }

  private setupIntersectionObserver() {
    if (!isPlatformBrowser(this.platformId)) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all sections with fade-in-section class
    setTimeout(() => {
      const sections = document.querySelectorAll('.fade-in-section');
      sections.forEach(section => observer.observe(section));
    }, 100);
  }
}