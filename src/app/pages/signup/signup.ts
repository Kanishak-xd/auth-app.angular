import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.html',
})
export class Signup {
  firstName: string = '';
  lastName: string = '';
  dob: string = '';
  mobile: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) { }

  async onSubmit() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );

      const user = userCredential.user;

      // set display name
      await updateProfile(user, {
        displayName: `${this.firstName} ${this.lastName}`,
      });

      // set firestore schema
      await setDoc(doc(this.firestore, 'users', user.uid), {
        uid: user.uid,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        fullName: `${this.firstName} ${this.lastName}`,
        dob: this.dob || '',
        mobile: this.mobile || '',
        profilePicUrl: '',
        status: 'active',
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // go to profile
      this.router.navigate(['/profile']);
    } catch (err: any) {
      this.error = err.message;
      console.error('Signup error:', err);
    }
  }
}
