import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  isOpen = false;

  constructor() {
    document.addEventListener('toggle-sidebar', () => {
      this.isOpen = !this.isOpen;
    });
  }

  closeSidebar() {
    this.isOpen = false;
  }
}
