import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
})
export class Login {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private auth: Auth, private router: Router) { }

  async onSubmit() {
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.router.navigate(['/profile']);
    } catch (err: any) {
      this.error = err.message;
      console.error('Login error:', err);
    }
  }
}
