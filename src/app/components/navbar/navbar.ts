import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  @Input() profilePicUrl: string | null = null;

  toggleSidebar() {
    document.dispatchEvent(new CustomEvent('toggle-sidebar'));
  }
}
