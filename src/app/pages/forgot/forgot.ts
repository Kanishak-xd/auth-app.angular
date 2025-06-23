import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot.html',
})
export class Forgot {
  email: string = '';
  message: string = '';
  error: string = '';

  constructor(private auth: Auth, private router: Router) { }

  async onSubmit() {
    try {
      await sendPasswordResetEmail(this.auth, this.email);
      this.message = 'Password reset email sent! Check your inbox.';
      this.error = '';
    } catch (err: any) {
      this.error = err.message;
      this.message = '';
      console.error('Reset error:', err);
    }
  }
}
