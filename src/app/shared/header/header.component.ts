import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from 'side-components';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DirectivesModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  showMenu = false;

  toggle() {
    this.showMenu = !this.showMenu;
  }
}
