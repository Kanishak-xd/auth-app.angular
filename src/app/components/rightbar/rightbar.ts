import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Auth, signOut, sendPasswordResetEmail } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-rightbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rightbar.html',
})
export class Rightbar {
  isOpen = false;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  profilePicUrl: string = '';

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    document.addEventListener('toggle-rightbar', () => {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.loadUserData();
      }
    });

    // Update when profile picture is changed
    window.addEventListener('profile-pic-updated', () => {
      this.loadUserData();
    });

    window.addEventListener('user-logged-out', () => {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.profilePicUrl = '';
      this.isOpen = false;
    });
  }

  closeRightbar() {
    this.isOpen = false;
  }

  async loadUserData() {
    const user = this.auth.currentUser;
    if (!user) return;

    this.email = user.email || '';

    const userRef = doc(this.firestore, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      this.firstName = data['firstName'] || '';
      this.lastName = data['lastName'] || '';
      this.profilePicUrl = data['profilePicUrl'] || '';
    }
  }

  async logout() {
    await signOut(this.auth);
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.profilePicUrl = '';
    this.closeRightbar();
    this.router.navigate(['/login']);
  }

  async resetPassword() {
    const email = this.auth.currentUser?.email;
    if (!email) return;

    await sendPasswordResetEmail(this.auth, email);
    alert('Reset password email sent!');
  }
}
