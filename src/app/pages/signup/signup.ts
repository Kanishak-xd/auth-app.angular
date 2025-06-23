import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
})
export class Signup {
  username: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private auth: Auth, private router: Router) { }

  async onSubmit() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );

      // Set display name (username)
      await updateProfile(userCredential.user, {
        displayName: this.username,
      });

      // Navigate to home
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.error = err.message;
      console.error('Signup error:', err);
    }
  }
}

