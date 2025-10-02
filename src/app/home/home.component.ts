import { Component } from '@angular/core';
import { CarouselComponent } from '../shared/carousel/carousel.component';// Adjust path as needed
import { HeaderComponent } from '../shared/header/header.component'; // If not already imported
import { FooterComponent } from '../shared/footer/footer.component'; // If not already imported

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    HeaderComponent,
    FooterComponent
    // Add other components as needed
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  // Method for QR verification functionality
  handleQrVerification(): void {
    // TODO: Implement QR code scanning logic
    console.log('QR verification clicked');
    // You can add navigation to QR scanner page or open modal
    // Example: this.router.navigate(['/qr-scanner']);
  }

  // Method for search by name functionality
  handleSearchByName(): void {
    // TODO: Implement search by name logic
    console.log('Search by name clicked');
    // You can add navigation to search page or open search modal
    // Example: this.router.navigate(['/search']);
  }

  // Method for reading more about news articles
  readMore(event: Event, title: string): void {
    event.preventDefault(); // Prevent default anchor behavior
    // TODO: Implement read more functionality
    console.log('Read more clicked for:', title);
    // You can navigate to detailed article page or open modal
    // Example: this.router.navigate(['/news', this.slugify(title)]);
  }

  // Method for viewing all updates
  viewAllUpdates(): void {
    // TODO: Implement view all updates functionality
    console.log('View all updates clicked');
    // You can navigate to news/updates page
    // Example: this.router.navigate(['/news']);
  }

  // Helper method to create URL-friendly slugs (optional)
  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
}
