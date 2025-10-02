import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../shared/footer/footer.component";
import { HeaderComponent } from "../shared/header/header.component";

@Component({
  selector: 'app-regulatory-platform',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './regulatory-platform.component.html',
  styleUrl: './regulatory-platform.component.css'
})
export class RegulatoryPlatformComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}