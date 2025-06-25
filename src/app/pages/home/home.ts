import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
})
export class Home {
  private auth = inject(Auth);
  private router = inject(Router);

  fullName = this.auth.currentUser?.displayName ?? 'Guest';

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}
