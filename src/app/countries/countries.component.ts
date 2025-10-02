import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

interface Country {
  code: string;
  name: string;
  flag: string;
  status: 'live' | 'pilot' | 'development';
  region: string;
  practitioners?: number;
  launchDate?: string;
  description: string;
}

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent implements OnInit {
  selectedRegion = 'all';
  selectedStatus = 'all';
  searchQuery = '';

  regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'west', label: 'West Africa' },
    { value: 'east', label: 'East Africa' },
    { value: 'central', label: 'Central Africa' },
    { value: 'southern', label: 'Southern Africa' },
    { value: 'north', label: 'North Africa' },
    { value: 'gcc', label: 'GCC Diaspora' }
  ];

  statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'live', label: 'Live' },
    { value: 'pilot', label: 'Pilot' },
    { value: 'development', label: 'In Development' }
  ];

  countries: Country[] = [
    // West Africa
    { code: 'gh', name: 'Ghana', flag: '🇬🇭', status: 'development', region: 'west', description: 'First AMR deployment with full regulatory integration' },
    { code: 'ng', name: 'Nigeria', flag: '🇳🇬', status: 'development', region: 'west', description: 'Largest practitioner base with multi-council integration' },
    { code: 'sn', name: 'Senegal', flag: '🇸🇳', status: 'development', region: 'west', description: 'Francophone West Africa expansion' },
    { code: 'ci', name: 'Côte d\'Ivoire', flag: '🇨🇮', status: 'development', region: 'west', description: 'Economic hub with strong healthcare sector' },
    { code: 'bf', name: 'Burkina Faso', flag: '🇧🇫', status: 'development', region: 'west', description: 'Sahel region healthcare strengthening' },
    { code: 'ml', name: 'Mali', flag: '🇲🇱', status: 'development', region: 'west', description: 'Regional healthcare coordination' },
    { code: 'ne', name: 'Niger', flag: '🇳🇪', status: 'development', region: 'west', description: 'Cross-border healthcare mobility' },
    { code: 'gn', name: 'Guinea', flag: '🇬🇳', status: 'development', region: 'west', description: 'Mining sector healthcare services' },
    { code: 'sl', name: 'Sierra Leone', flag: '🇸🇱', status: 'development', region: 'west', description: 'Post-conflict healthcare rebuilding' },
    { code: 'lr', name: 'Liberia', flag: '🇱🇷', status: 'development', region: 'west', description: 'Healthcare system strengthening' },
    { code: 'gw', name: 'Guinea-Bissau', flag: '🇬🇼', status: 'development', region: 'west', description: 'Small state healthcare optimization' },
    { code: 'cv', name: 'Cabo Verde', flag: '🇨🇻', status: 'development', region: 'west', description: 'Island nation healthcare connectivity' },
    { code: 'gm', name: 'Gambia', flag: '🇬🇲', status: 'development', region: 'west', description: 'Regional healthcare integration' },
    { code: 'tg', name: 'Togo', flag: '🇹🇬', status: 'development', region: 'west', description: 'Coastal West Africa expansion' },
    { code: 'bj', name: 'Benin', flag: '🇧🇯', status: 'development', region: 'west', description: 'Francophone healthcare modernization' },
    { code: 'mr', name: 'Mauritania', flag: '🇲🇷', status: 'development', region: 'west', description: 'Sahara-Sahel healthcare bridge' },

    // East Africa
    { code: 'rw', name: 'Rwanda', flag: '🇷🇼', status: 'development', region: 'east', description: 'Digital health innovation leader' },
    { code: 'ug', name: 'Uganda', flag: '🇺🇬', status: 'development', region: 'east', description: 'East African Community integration' },
    { code: 'ke', name: 'Kenya', flag: '🇰🇪', status: 'development', region: 'east', description: 'East Africa hub with medical board engagement' },
    { code: 'tz', name: 'Tanzania', flag: '🇹🇿', status: 'development', region: 'east', description: 'Largest East African market' },
    { code: 'et', name: 'Ethiopia', flag: '🇪🇹', status: 'development', region: 'east', description: 'Horn of Africa healthcare hub' },
    { code: 'bi', name: 'Burundi', flag: '🇧🇮', status: 'development', region: 'east', description: 'Great Lakes region healthcare' },
    { code: 'so', name: 'Somalia', flag: '🇸🇴', status: 'development', region: 'east', description: 'Healthcare system rebuilding' },
    { code: 'dj', name: 'Djibouti', flag: '🇩🇯', status: 'development', region: 'east', description: 'Strategic Horn of Africa position' },
    { code: 'er', name: 'Eritrea', flag: '🇪🇷', status: 'development', region: 'east', description: 'Red Sea healthcare corridor' },
    { code: 'ss', name: 'South Sudan', flag: '🇸🇸', status: 'development', region: 'east', description: 'New nation healthcare foundation' },
    { code: 'mg', name: 'Madagascar', flag: '🇲🇬', status: 'development', region: 'east', description: 'Island healthcare innovation' },
    { code: 'mu', name: 'Mauritius', flag: '🇲🇺', status: 'development', region: 'east', description: 'Medical tourism excellence' },
    { code: 'sc', name: 'Seychelles', flag: '🇸🇨', status: 'development', region: 'east', description: 'Luxury healthcare services' },
    { code: 'km', name: 'Comoros', flag: '🇰🇲', status: 'development', region: 'east', description: 'Indian Ocean healthcare hub' },

    // Southern Africa
    { code: 'za', name: 'South Africa', flag: '🇿🇦', status: 'development', region: 'southern', description: 'Advanced healthcare system with Department of Health collaboration' },
    { code: 'na', name: 'Namibia', flag: '🇳🇦', status: 'development', region: 'southern', description: 'Desert nation healthcare innovation' },
    { code: 'bw', name: 'Botswana', flag: '🇧🇼', status: 'development', region: 'southern', description: 'Diamond economy healthcare excellence' },
    { code: 'zw', name: 'Zimbabwe', flag: '🇿🇼', status: 'development', region: 'southern', description: 'Regional healthcare restoration' },
    { code: 'zm', name: 'Zambia', flag: '🇿🇲', status: 'development', region: 'southern', description: 'Copper belt healthcare services' },
    { code: 'mw', name: 'Malawi', flag: '🇲🇼', status: 'development', region: 'southern', description: 'Warm heart healthcare transformation' },
    { code: 'mz', name: 'Mozambique', flag: '🇲🇿', status: 'development', region: 'southern', description: 'Indian Ocean healthcare corridor' },
    { code: 'ao', name: 'Angola', flag: '🇦🇴', status: 'development', region: 'southern', description: 'Oil economy healthcare modernization' },
    { code: 'sz', name: 'Eswatini', flag: '🇸🇿', status: 'development', region: 'southern', description: 'Kingdom healthcare modernization' },
    { code: 'ls', name: 'Lesotho', flag: '🇱🇸', status: 'development', region: 'southern', description: 'Mountain kingdom healthcare' },

    // Central Africa
    { code: 'cd', name: 'DR Congo', flag: '🇨🇩', status: 'development', region: 'central', description: 'Largest Central African market' },
    { code: 'cm', name: 'Cameroon', flag: '🇨🇲', status: 'development', region: 'central', description: 'Bilingual healthcare system' },
    { code: 'cf', name: 'Central African Republic', flag: '🇨🇫', status: 'development', region: 'central', description: 'Healthcare infrastructure development' },
    { code: 'td', name: 'Chad', flag: '🇹🇩', status: 'development', region: 'central', description: 'Sahel healthcare strengthening' },
    { code: 'cg', name: 'Republic of Congo', flag: '🇨🇬', status: 'development', region: 'central', description: 'Oil sector healthcare services' },
    { code: 'ga', name: 'Gabon', flag: '🇬🇦', status: 'development', region: 'central', description: 'Equatorial healthcare excellence' },
    { code: 'gq', name: 'Equatorial Guinea', flag: '🇬🇶', status: 'development', region: 'central', description: 'Small state healthcare optimization' },
    { code: 'st', name: 'São Tomé and Príncipe', flag: '🇸🇹', status: 'development', region: 'central', description: 'Island healthcare connectivity' },

    // North Africa
    { code: 'eg', name: 'Egypt', flag: '🇪🇬', status: 'development', region: 'north', description: 'North Africa gateway with medical syndicate partnership' },
    { code: 'ma', name: 'Morocco', flag: '🇲🇦', status: 'development', region: 'north', description: 'Maghreb region healthcare innovation' },
    { code: 'tn', name: 'Tunisia', flag: '🇹🇳', status: 'development', region: 'north', description: 'Maghreb healthcare innovation' },
    { code: 'dz', name: 'Algeria', flag: '🇩🇿', status: 'development', region: 'north', description: 'Largest African healthcare market' },
    { code: 'ly', name: 'Libya', flag: '🇱🇾', status: 'development', region: 'north', description: 'Mediterranean healthcare rebuilding' },
    { code: 'sd', name: 'Sudan', flag: '🇸🇩', status: 'development', region: 'north', description: 'Nile corridor healthcare services' },

    // GCC Diaspora Pilot
    { code: 'ae', name: 'UAE Diaspora Hub', flag: '🇦🇪', status: 'development', region: 'gcc', description: 'Exploratory - African healthcare professionals in Middle East' }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getFilteredCountries(): Country[] {
    return this.countries.filter(country => {
      const regionMatch = this.selectedRegion === 'all' || country.region === this.selectedRegion;
      const statusMatch = this.selectedStatus === 'all' || country.status === this.selectedStatus;
      const searchMatch = this.searchQuery === '' || 
        country.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      return regionMatch && statusMatch && searchMatch;
    });
  }

  // Helpers to avoid arrow functions/filters in template
  getFilteredCountriesByRegion(regionValue: string): Country[] {
    return this.getFilteredCountries().filter(c => c.region === regionValue);
  }

  countCountriesInRegion(regionValue: string): number {
    return this.getFilteredCountriesByRegion(regionValue).length;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'live':
        return 'bg-green-500 text-white animate-pulse';
      case 'pilot':
        return 'bg-blue-500 text-white animate-pulse';
      case 'development':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'live':
        return 'ri-check-circle-line';
      case 'pilot':
        return 'ri-play-circle-line';
      case 'development':
        return 'ri-settings-line';
      default:
        return 'ri-time-line';
    }
  }

  getCountsByStatus(): { live: number, pilot: number, development: number } {
    return {
      live: this.countries.filter(c => c.status === 'live').length,
      pilot: this.countries.filter(c => c.status === 'pilot').length,
      development: this.countries.filter(c => c.status === 'development').length
    };
  }

  getCountsByRegion(): { [key: string]: number } {
    const counts: { [key: string]: number } = {};
    this.countries.forEach(country => {
      counts[country.region] = (counts[country.region] || 0) + 1;
    });
    return counts;
  }

  navigateToCountry(countryCode: string): void {
    // For now, show coming soon message for development countries
    const country = this.countries.find(c => c.code === countryCode);
    if (country?.status === 'development') {
      this.showComingSoonMessage(country.name);
    } else {
      // Navigate to country-specific platform
      window.open(`/${countryCode}`, '_blank');
    }
  }

  showComingSoonMessage(countryName: string): void {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg bg-blue-100 text-blue-800 border border-blue-200 transition-all duration-300 transform translate-x-full';
    
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <i class="ri-information-line"></i>
        ${countryName} Medical Registry launching soon!
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.remove('translate-x-full'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  }
}