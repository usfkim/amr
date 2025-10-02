import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-country-platforms',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './country-platforms.component.html',
  styleUrl: './country-platforms.component.css'
})
export class CountryPlatformsComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}