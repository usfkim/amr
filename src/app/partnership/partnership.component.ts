import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-partnership',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './partnership.component.html',
  styleUrl: './partnership.component.css'
})
export class PartnershipComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}