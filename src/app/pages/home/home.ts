import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
})
export class Home {
  private auth = inject(Auth);
  private router = inject(Router);

  userEmail: string | null = this.auth.currentUser?.email ?? null;
  username: string | null = this.auth.currentUser?.displayName ?? null;

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}
